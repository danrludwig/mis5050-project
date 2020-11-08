"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  vehicleInventorySchema = new Schema(
    {
        stockNumber: {
            type: String,
            required: true,
            unique: true
        },
        year: {
            type: String,
            required: true
        },
        make: {
            type: String,
            required: true 
        },
        model: {
            type: String, 
            required: true 
        },
        price: {
            type: Number,
            required: true
        },
        condition: {
            type: String, 
            required: true
        }, 
        isSold: {
            type: Boolean,
            required: true
        }
    }
  );


module.exports = mongoose.model("vehicleInventory", vehicleInventorySchema);