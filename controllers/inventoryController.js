"use strict";

// const User = require("../models/inventory");


module.exports = {
  indexView: (req, res) => {
    res.render("inventory/index");
  },

  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath !== undefined) res.redirect(redirectPath);
    else next();
  },
};
