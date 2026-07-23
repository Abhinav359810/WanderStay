const Listing = require("../Models/listing");
const ExpressError = require("../utils/ExpressError");
const {listingSchema,reviewSchema} = require("../utils/Schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new ExpressError(401, "Please login first.");
    }

    next();
};

module.exports.isOwner = async (req,res,next)=>{
    const {id} = req.params;

    const listing = await Listing.findById(id);
    if(!listing){
        throw new ExpressError(404 , "Listing not found");
    }

    if(!listing.owner.equals(req.user._id)){
        throw new ExpressError(403 , "You don't have permission to perform this action");
    }

    next();
}


module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
    };