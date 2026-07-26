const express = require("express");
const router = express.Router();
const { isLoggedIn,isOwner,validateListing } = require("../middleware/auth.js");
const listingController = require("../controllers/listing.js"); 

//index route 
router.get("/", listingController.index);

//show route
router.get("/:id", listingController.showListing);

//create route
router.post('/', isLoggedIn ,validateListing, listingController.createListing);

//update route
router.put('/:id',isLoggedIn,isOwner,validateListing,listingController.updateListing);

//Delete Route
router.delete("/:id",isLoggedIn,isOwner,listingController.deleteListing);

module.exports = router;