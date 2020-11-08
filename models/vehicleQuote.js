"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    User = require("./user"),
    vehicleQuoteSchema = new Schema(
        {
            userAccount: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            name: {
                first: {
                    type: String,
                    trim: true
                },
                last: {
                    type: String,
                    trim: true
                }
            },
            email: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            vehicle: {
                type: Schema.Types.ObjectId,
                ref: "vehicleInventory"
            },
            stockNumber: {
                type: String,
                required: true,
                unique: true
            }
        }
    );

vehicleQuoteSchema.pre("save", (next) => {
    if (this.userAccount === undefined) {
        User.findOne({
            email: this.email
        })
        .then(user => {
            this.userAccount = user;
            next();
        })
        .catch(error => {
            console.log(`Error in connecting user: ${error.message}`);
            next(error);
        })
    } else {
        next();
    }
});

vehicleQuoteSchema.pre("save", (next) => {
    if (this.stockNumber === undefined) {
        User.findOne({
            stockNumber: this.stockNumber
        })
        .then(vehicle => {
            this.vehicle = vehicle;
            next();
        })
        .catch(error => {
            console.log(`Error in connecting vehicle: ${error.message}`);
            next(error);
        })
    } else {
        next();
    }
});


module.exports = mongoose.model("vehicleQuote", this.vehicleQuoteSchema);