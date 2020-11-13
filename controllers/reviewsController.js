"use strict";
const Reviews = require("../models/review");

module.exports = {
  indexView: (req, res) => {
    res.render("reviews/index");
  },
  new: (req, res) => {
    res.render("reviews/new");
  },
  create: (req, res, next) => {
    let reviewsParams = {
      name: req.body.name,
      email: req.body.email,
      reviewText: req.body.reviewText
    };
    Reviews.create(reviewsParams)
      .then(reviews => {
        res.locals.redirect = "/reviews";
        res.locals.reviews = reviews;
        next();
      })
      .catch(error => {
        console.log(`Error saving review: ${error.message}`);
        next(error);
      });
  },

  redirectView: (req, res, next) => {
    let redirectedPath = res.locals.redirect;
    if (redirectedPath !== undefined) {
      res.redirect(redirectedPath);
    } else {
      next();
    } 
  }
};
