const express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError.js");
const Review  = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const {reviewSchema} = require("../utils/Schema.js");
const { isLoggedIn,validateReview,isReviewAuthor } = require("../middleware/auth.js");

    // Reviews Routes
    //Post route
    router.post("/",isLoggedIn,validateReview, async (req,res)=>{
        let {id} = req.params;
        let listing = await Listing.findById(id);
        let newReview = new Review(req.body);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();

        res.json({
            message : "your review has been added!"
        });
    });

    //delete route review
    router.delete("/:reviewId",isLoggedIn,isReviewAuthor, async (req,res)=>{
        let {id,reviewId} =  req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
        await Review.findByIdAndDelete(reviewId);

        res.json({
            message : "Review Deleted"
        })
    });

module.exports = router;