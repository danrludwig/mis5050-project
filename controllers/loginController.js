"use strict";


module.exports = {
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
};
