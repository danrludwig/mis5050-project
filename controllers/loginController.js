"use strict";
const User = require("../models/user"),
  passport = require("passport"),
  jsonWebToken = require("jsonwebtoken"),
  getUserParams = body => {
    return {
      name: {
        first: body.first,
        last: body.last
      },
      email: body.email,
      password: body.password,
    };
  };

module.exports = {
  getUserParams,
  indexView: (req, res) => {
    res.render("login/index");
  },
  adminLogin: (req, res) => {
    res.render("login/admin");
  },
  customerLogin: (req, res) => {
    res.render("login/customer");
  },
  validate: async (req, res, next) => {                                    
    await check("email").normalizeEmail({
      all_lowercase: true
      }).trim().run(req);                                                     
    await check("email", "Email is invalid").isEmail().run(req);                                   
    await check("password", "Password cannot be empty").notEmpty().run(req);    
  
    const error = validationResult(req);                     
      if (!error.isEmpty()) {
        let messages = error.array().map(e => e.msg);
        req.skip = true;                                             
        req.flash("error");                  
        next();
      } else {
        next();                                                      
      }
    
  },
  create: (req, res, next) => {
    if (req.skip) next();
    let newUser = new Users(getUserParams(req.body));
    Users.register(newUser, req.body.password, (error, user) => {
      if (user) {
        res.locals.redirect = "/user/login";
        next();
      } else {
        console.log("error", `Failed to create user account because: ${error.message}.`);
        res.locals.redirect = "/user/new";
        next();
      }
    });
  },
  login: (req, res) => {
    res.render("login/index");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/login/index",
    successRedirect: "/",
  }),
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  apiAuthenticate: (req, res, next) => {
    passport.authenticate("local", (errors, user) => {
      if (user) {
        let signedToken = jsonWebToken.sign({
            data: user._id,
            exp: new Date().setDate(new Date().getDate() + 1)
          },
          "secret_encoding_passphrase"
        );
        res.render("users/index");
      } else
        res.json({
          success: false,
          message: "Could not authenticate user."
        });
    })(req, res, next);
  },
};
