"use strict";

const mongoose = require("mongoose"),
 { Schema } = mongoose,
 partsInventorySchema = new Schema({
    partNumber: {
        type: String,
        require: true
    },
    partName: {
        type: String,
        require: true,
    },
    price: {
        type: Number
    },
    numberAvailable: {
        type: Number
    }
 });

 module.exports = mongoose.model("partsInventory", partsInventorySchema);
