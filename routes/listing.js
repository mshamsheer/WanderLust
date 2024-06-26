const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

// multer
const multer  = require('multer')
const{storage}=require("../cloudConfig.js")
const upload = multer({ storage })
// require controllers
const listingsController = require("../controllers/listings.js");


// INDEX ROUTE & // Create Route
router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(
    isLoggedIn,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingsController.createListing)
  );
 

//New Route
router.get("/new", isLoggedIn, listingsController.renderNewForm);

//Show Route //Update Route //Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingsController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingsController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.destroyListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.rendeEditForm)
);

module.exports = router;
