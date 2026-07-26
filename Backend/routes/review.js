const express = require("express");
const router = express.Router({mergeParams:true});
const { isLoggedIn,validateReview,isReviewAuthor } = require("../middleware/auth.js");
const reviewController = require("../controllers/review.js");
    
//Post route
router.post("/",isLoggedIn,validateReview,reviewController.createReview); 

//delete route review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,reviewController.destroyReview);

module.exports = router;