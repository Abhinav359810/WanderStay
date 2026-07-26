const Review  = require("../Models/review.js");
const Listing = require("../Models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.createReview = async (req,res)=>{
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
};

module.exports.destroyReview =  async (req,res)=>{
        let {id,reviewId} =  req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
        await Review.findByIdAndDelete(reviewId);

        res.json({
            message : "Review Deleted"
        })
};