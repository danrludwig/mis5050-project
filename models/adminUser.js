"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose"),
  // Subscriber = require("./subscriber");

var adminUserSchema = new Schema(
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
    phoneNumber: {
      type: String,
      min: 1000000000,
      max: 19999999999
    },
    password: {
      type: String,
      required: true
    },
    // subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
    // courses: [{ type: Schema.Types.ObjectId, ref: "Course" }]
  },
  {
    timestamps: true
  }
);

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

// userSchema.pre("save", function(next) {
//   let user = this;
//   if (user.subscribedAccount === undefined) {
//     Subscriber.findOne({
//       email: user.email
//     })
//       .then(subscriber => {
//         user.subscribedAccount = subscriber;
//         next();
//       })
//       .catch(error => {
//         console.log(`Error in connecting subscriber: ${error.message}`);
//         next(error);
//       });
//   } else {
//     next();
//   }
// });

module.exports = mongoose.model("User", userSchema);
