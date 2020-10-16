"use strict";

const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = express.Router(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  inventoryController = require("./controllers/inventoryController"),
  reviewsController = require("./controllers/reviewsController"),
  loginController = require("./controllers/loginController"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override");

mongoose.connect(
  "mongodb+srv://chaseanderson:Ca12131994!@cluster0.97xaw.mongodb.net/dealer_db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

router.use(layouts);
router.use(express.static("public"));

router.use(
  express.urlencoded({
    extended: false
  })
);
router.use(express.json());

router.get("/", homeController.index);

router.get("/login", loginController.indexView);

router.get("/reviews", reviewsController.indexView);

router.get("/inventory", inventoryController.indexView);

router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
