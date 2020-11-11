"use strict";

const VehicleInventory = require("../models/vehicleInventory"),
  PartsInventory = require("../models/partsInventory"),
  httpStatus = require("http-status-codes");
// const User = require("../models/inventory");


module.exports = {
  indexView: (req, res) => {
    res.render("inventory/index");
  },
  viewParts: (req, res) => {
    res.render("inventory/parts");
  },
  viewVehicles: (req, res) => {
    res.render("inventory/vehicles");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
  new: (req, res) => {
    res.render("inventory/new");
  },
  newParts: (req, res) => {
    res.render("inventory/new-parts");
  },

  createVehicle: (req, res, next) => {
    let inventoryParams = {
      stockNumber: req.body.stockNumber,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      condition: req.body.condition,
      isSold: req.body.isSold
    };
    VehicleInventory.create(vehicleInventoryParams)
      .then(vehicleInventory => {
        res.locals.redirect = "/inventory";
        res.locals.vehicleInventory = vehicleInventory;
        next();
      })
      .catch(error => {
        console.log(`Error saving new inventory: ${error.message}`);
        next(error);
      });
  },
  createPart: (req, res, next) => {
    let inventoryPartParams = {
      partNumber: req.body.partNumber,
      partName: req.body.partName,
      price: req.body.price,
      quantity: req.body.quantity
    };
    PartsInventory.create(inventoryParams)
      .then(partsInventory => {
        res.locals.redirect = "/inventory";
        res.locals.partsInventory = partsInventory;
        next();
      })
      .catch(error => {
        console.log(`Error saving new inventory: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
