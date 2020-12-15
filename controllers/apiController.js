const Vehicles = require("../models/vehicleInventory"),
    httpStatus = require("http-status-codes"),
    jsonwebtoken = require("jsonwebtoken"),
    axios = require("axios");

module.exports = {
    getVehicles: (req, res, next) => {
        Vehicles.find({})
        .then((vebicles) => {
            Vehicles.forEach(vehicle => {
                let imageName = style.imageUrl;
                style.imageUrl = "http://localhost:3000/inventory/vehicles/" + imageName;
            })
            res.json({
                status: httpStatus.OK,
                data: styles
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
            res.render("external-api", {data: result.data})
        } catch (error) {
            res.send("somethign went wrong");
        }
    }
}