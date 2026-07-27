const express = require("express");
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const { isLoggedIn,isOwner,validateListing } = require("../middleware/auth.js");
const listingController = require("../controllers/listing.js"); 

//index,create routes
router
    .route("/")
    .get(listingController.index)
    .post(isLoggedIn ,upload.single("image"),validateListing, listingController.createListing);

//show,update,delete routes
router
    .route("/:id")
    .get(listingController.showListing)
    .put(isLoggedIn,isOwner,upload.single("image"),validateListing,listingController.updateListing)
    .delete(isLoggedIn,isOwner,listingController.deleteListing);

module.exports = router;