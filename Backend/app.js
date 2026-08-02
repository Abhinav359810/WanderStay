    if(process.env.NODE_ENV != "production"){
        require("dotenv").config();
    }

    //server : The entry point that starts your Express server
    const express = require("express");
    const app = express();
    const mongoose = require("mongoose");
    const cors = require("cors");
    const ExpressError = require("./utils/ExpressError.js");
    const session = require("express-session");
    const passport = require("passport");
    const LocalStrategy =  require("passport-local");
    const User = require("./Models/user.js");

    const listingRouter = require("./routes/listing.js");
    const reviewRouter = require("./routes/review.js");
    const userRouter = require("./routes/user.js");

    const MONGO_URL = "mongodb://127.0.0.1:27017/CampusNest";

    //configuring Express Session
    const sessionOptions = {
        secret : "23097423DE2JDCNSFDJWEDWEMFWEFOPWMEFOWEFPWOMEFPWOEMF",
        resave : false,
        saveUninitialized : true,
        cookie: {
            expires : Date.now() + 1000 * 60 * 60 * 24 * 3,
            maxAge : 1000 * 60 * 60 * 24 * 3,
            httpOnly : true
        },
    };
    app.use(session(sessionOptions));

    //Configuring passport 
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
    
    app.use(express.json())
    // app.use(express.urlencoded({extended:true})); for ejs

    //routes
    app.use("/listings",listingRouter);
    app.use("/listings/:id/reviews",reviewRouter);
    app.use("/",userRouter);

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