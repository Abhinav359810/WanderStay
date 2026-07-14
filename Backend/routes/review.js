const express = require("express");
const router = express.Router({mergeParams:true});
const ExpressError = require("../utils/ExpressError.js");
const Review  = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const {reviewSchema} = require("../utils/Schema.js");

    const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
    };

    // Reviews Routes
    //Post route
    router.post("/",validateReview, async (req,res)=>{
        let {id} = req.params;
        let listing = await Listing.findById(id);
        let newReview = new Review(req.body);

        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();

        res.json({
            message : "Added review!"
        });
    });

    //delete route review
    router.delete("/:reviewId", async (req,res)=>{
        let {id,reviewId} =  req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
        await Review.findByIdAndDelete(reviewId);

        res.json({
            message : "Review Deleted"
        })
    });

module.exports = router;