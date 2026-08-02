const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    propertyType: Joi.string().valid("PG", "Hostel", "Flat").required(),
    gender: Joi.string().valid("Boys", "Girls", "Co-ed").required(),
    college: Joi.string().required(),
    amenities: Joi.array()
        .items(
            Joi.string().valid(
                "WiFi",
                "Food",
                "Laundry",
                "AC",
                "Parking"
            )
        )
        .default([])
});


module.exports.reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
});