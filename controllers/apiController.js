const Vehicles = require("../models/vehicleInventory"),
    httpStatus = require("http-status-codes"),
    jsonwebtoken = require("jsonwebtoken"),
    axios = require("axios");

module.exports = {
    getVehicles: (req, res, next) => {
        Vehicles.find({})
        .then((vehicles) => {
            vehicles.forEach(vehicle => {
                let imageName = vehicle.imageUrl;
                vehicle.imageUrl = "http://localhost:3000/inventory/vehicles/" + imageName;
            })
            res.json({
                status: httpStatus.OK,
                data: vehicles.data
            })
        })
        .catch((error) => {
            console.log(error.message);
        })
    },

    getToken: (req, res, next) => {
        let jsonToken = jsonwebtoken.sign(
            {
                exp: new Date().setDate(new Date().getDate() + 1)
            },
            "secret_encoding_passphrase"
        );
        res.json({
            success: true,
            token: jsonToken
        });
    },

    catFacts: async (req, res, next) => {
        try {
            let result = await axios.get("https://cat-fact.herokuapp.com/facts");
            res.json({
                status: httpStatus.OK,
                data: result.data
            })
            // res.render("external-api", {data: result.data})
        } catch (error) {
            res.send("something went wrong");
        }
    }
}