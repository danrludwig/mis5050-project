"use strict";

const { redirectView } = require("./controllers/inventoryController");

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
  methodOverride = require("method-override"),
  fileUpload = require("express-fileupload");

mongoose.connect(
  "mongodb+srv://chaseanderson:chasedatabase@cluster0.97xaw.mongodb.net/dealer_db?retryWrites=true&w=majority",
  { useNewUrlParser: true , useUnifiedTopology: true}
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
router.use(fileUpload());

router.get("/", homeController.index);

router.get("/login", loginController.indexView);
router.get("/login/admin", loginController.adminLogin);
router.get("/login/customer", loginController.customerLogin);

router.get("/reviews", reviewsController.index, reviewsController.indexView);
router.get("/reviews/new", reviewsController.new);
router.post("/reviews/create", reviewsController.create, redirectView);
router.get("/reviews/:id/edit", reviewsController.edit);
router.put("/reviews/:id/update", reviewsController.update, reviewsController.redirectView);
router.get("/reviews/:id", reviewsController.index, reviewsController.indexView);
router.delete("/reviews/:id/delete", reviewsController.delete, reviewsController.redirectView);



router.get("/inventory", inventoryController.indexView);
router.get("/inventory/vehicles", inventoryController.indexVehicles, inventoryController.viewVehicles);
router.get("/inventory/parts", inventoryController.indexParts, inventoryController.viewParts);
router.get("/inventory/new", inventoryController.new);
router.get("/inventory/new-parts", inventoryController.newParts);
router.post("/inventory/create-vehicle", inventoryController.createVehicle, inventoryController.redirectView);
router.post("/inventory/create-part", inventoryController.createPart, inventoryController.redirectView);
router.delete("/inventory/parts/:id/delete", inventoryController.deletePart, inventoryController.redirectView);
router.delete("/inventory/vehicles/:id/delete", inventoryController.deleteVehicle, inventoryController.redirectView);


router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
