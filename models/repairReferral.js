"use strict";

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    User = require("./user"),
    repairReferralSchema = new Schema(
        {
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
            userAccount: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
            },
            issue: {
                type: String
            }
        }
    )

repairReferralSchema.pre("save", (next) => {
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

module.exports = mongoose.model("repairReferral", repairReferralSchema);