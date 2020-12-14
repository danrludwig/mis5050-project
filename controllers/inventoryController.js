"use strict";

const partsInventory = require("../models/partsInventory");
const vehicleInventory = require("../models/vehicleInventory");
const VehicleInventory = require("../models/vehicleInventory"),
  PartsInventory = require("../models/partsInventory");


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
  
  indexVehicles: (req, res, next) => {
    VehicleInventory.find({})
    .then(vehicles => {
      res.locals.vehicles = vehicles;
      next();
    })
    .catch(error => {
      console.log(`Error fetching vehicles: ${error.message}`);
      next(error);
    })
  },

  indexParts: (req, res, next) => {
    PartsInventory.find({})
    .then(parts => {
      res.locals.parts = parts;
      next();
    })
    .catch(error => {
      console.log(`Error fetching vehicles: ${error.message}`);
      next(error);
    })
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
    if (req.body.isSold == "on") {
      req.body.isSold = true;
    } else {
      req.body.isSold = false;
    }
    let inventoryParams = {
      stockNumber: req.body.stockNumber,
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      price: req.body.price,
      condition: req.body.condition,
      isSold: req.body.isSold,
      imageUrl: req.files.picture.name
    };
    VehicleInventory.create(inventoryParams)
      .then(vehicleInventory => {
        res.locals.redirect = "/inventory";
        res.locals.vehicleInventory = vehicleInventory;
        let picture = req.files.picture;
        picture.mv((__dirname + "/../public/images/" + picture.name), function(error) {
          if (error) {
            return res.status(500).send(error);
          }
        });
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
    PartsInventory.create(inventoryPartParams)
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

  deletePart: (req, res, next) => {
    let partsId = req.params.id;
    partsInventory.findByIdAndRemove(partsId)
    .then(() => {
      res.locals.redirect = "/inventory";
      next();
    })
    .catch(error => {
      console.log(`Error deleting part by id: ${error.message}`);
      next();
    })
  },

  deleteVehicle: (req, res, next) => {
    let vehicleId = req.params.id;
    vehicleInventory.findByIdAndRemove(vehicleId)
    .then(() => {
      res.locals.redirect = "/inventory";
      next();
    })
    .catch(error => {
      console.log(`Error deleting vehicle by id: ${error.message}`);
      next();
    })
  }
};
