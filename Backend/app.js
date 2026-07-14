    //server : The entry point that starts your Express server
    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const cors = require("cors");
    const ExpressError = require("./utils/ExpressError.js");

    const listings = require("./routes/listing.js");
    const reviews = require("./routes/review.js");

    const MONGO_URL = "mongodb://127.0.0.1:27017/WanderStay";

    //middlewares
    app.use(cors());
    app.use(express.json())
    // app.use(express.urlencoded({extended:true})); for ejs

    //routes
    app.use("/listings",listings);
    app.use("/listings/:id/reviews",reviews);

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