"use strict";

const mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
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
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      password: {
        type: String
      },
      isAdmin: {
        type: Boolean,
        default: false
      }
    }
  );

userSchema.virtual("fullName").get(() => {
  return `${this.name.first} ${this.name.last}`;
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
  });

module.exports = mongoose.model("User", userSchema);