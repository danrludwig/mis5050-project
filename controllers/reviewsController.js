"use strict";
const Reviews = require("../models/review");


module.exports = {
  index: (req,res, next) => {
    Reviews.find({})
    .then(reviews => {
      res.locals.reviews = reviews;
      next();
    })
    .catch(error => {
      console.log(`Error fetching reviews: ${error.message}`);
      next(error);
    });
  },
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
  },
  delete: (req, res, next) => {
    let reviewId = req.params.id;
    Reviews.findByIdAndRemove(reviewId)
      .then(() => {
        res.locals.redirect = "/reviews";
        next();
      })
      .catch(error => {
        console.log(`Error deleting review by ID: ${error.message}`);
        next();
      });
  },
  edit: (req, res, next) => {
    let reviewId = req.params.id;
    Reviews.findById(reviewId)
      .then(review => {
        res.render("reviews/edit", {
          review: review
        });
      })
      .catch(error => {
        console.log(`Error fetching review by ID: ${error.message}`);
        next(error);
      });
  },
  update: (req, res, next) => {
    let reviewId = req.params.id,
      reviewParams = {
        name: req.body.name,
        email: req.body.email,
        reviewText: req.body.reviewText
      };

    Reviews.findByIdAndUpdate(reviewId, {
      $set: reviewParams
    })
      .then(review => {
        res.locals.redirect = `/reviews/${reviewId}`;
        res.locals.review = review;
        next();
      })
      .catch(error => {
        console.log(`Error updating review by ID: ${error.message}`);
        next(error);
      });
  },

};
