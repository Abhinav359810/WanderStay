    //server : The entry point that starts your Express server
    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const Listing = require("./Models/listing.js");
    const cors = require("cors");
    const ExpressError = require("./utils/ExpressError.js");
    const {listingSchema,reviewSchema} = require("./utils/Schema.js");
    const Review  = require("./Models/review.js");


    const MONGO_URL = "mongodb://127.0.0.1:27017/WanderStay";

    //middlewares
    app.use(cors());
    app.use(express.json())
 // app.use(express.urlencoded({extended:true})); for ejs

    const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};

    const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }
    next();
};


    //root route
    app.get("/",(req,res)=>{
        res.send("You contacted root");
    });

    //index route 
    app.get("/listings",async (req,res)=>{
        const allListings = await Listing.find({});
        res.json(allListings);
    });

    //show route
    app.get("/listings/:id",async (req,res)=>{
        let {id} = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        res.json(listing);
    });

    //create route
    app.post('/listings',validateListing, async (req,res)=>{
        // const listingData = {
        //         ...req.body.listing,
        //             image: {
        //                 filename: "listingimage",
        //                 url: req.body.listing.image
        //             }
        //         };
        const listing = new Listing(req.body);
        await listing.save();
        res.json({
            message:"Listing Created Successfully!"
        });
        // we have to send back some response then only axios will get response and then method execute and then only
        // use navigate will work 
    });

    //update route
    app.put('/listings/:id',validateListing, async (req,res)=>{
        let {id} = req.params;
        await Listing.findByIdAndUpdate(id,req.body);
        res.json({
            message:"Listing Updated Successfully !!!"
        });
    })

    //Delete Route
    app.delete("/listings/:id", async (req,res) =>{
        let {id} = req.params;
        await Listing.findByIdAndDelete(id);
        res.json({
            message : "Listing deleted!"
        });
    });

    // Reviews Routes
    //Post route
    app.post("/listings/:id/reviews",validateReview, async (req,res)=>{
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
    app.delete("/listings/:id/reviews/:reviewId", async (req,res)=>{
        let {id,reviewId} =  req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
        await Review.findByIdAndDelete(reviewId);

        res.json({
            message : "Review Deleted"
        })
    });

    //checking if connected to db
    main().then(()=>{
        console.log("Succesfully Conneced to Database ");
    }).catch((err)=>{
        console.log(err);
    });

    //connecting to database
    async function main(){
        await mongoose.connect(MONGO_URL);
    }

   //404 Error 
    app.all("/*splat",(req,res,next)=>{
        next(new ExpressError(404,"Page Not Found!"));
    }); 

    //custom error handler middleware
    app.use((err,req,res,next)=>{
        let {statusCode = 500, message="Something went wrong!"} = err;
        res.status(statusCode).send(message);
    });

    // server is listening
    app.listen(8080,()=>{
        console.log("Server is running on 8080 Port");
    });




