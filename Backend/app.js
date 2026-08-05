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
    const {MongoStore} = require("connect-mongo");
    const passport = require("passport");
    const LocalStrategy =  require("passport-local");
    const User = require("./Models/user.js");
    const PORT = process.env.PORT || 8080;

    const listingRouter = require("./routes/listing.js");   
    const reviewRouter = require("./routes/review.js");
    const userRouter = require("./routes/user.js");

    const dbUrl = process.env.ATLASDB_URL;


    //creating store
    const store = MongoStore.create({
        mongoUrl : dbUrl,
        crypto:{
            secret:process.env.SESSION_SECRET,
        },
        touchAfter:24*3600,
    });

    store.on("error",(err)=>{
        console.log("ERROR in MONGO SESSIONS STORE",err);
    })

    //configuring Express Session
    const sessionOptions = {
        store,
        secret : process.env.SESSION_SECRET,
        resave : false,
        saveUninitialized : false,
        cookie: {
            expires : Date.now() + 1000 * 60 * 60 * 24 * 3,
            maxAge : 1000 * 60 * 60 * 24 * 3,
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        },
    };
    app.use(session(sessionOptions));

    //Configuring passport 
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    const allowedOrigins = [
    "http://localhost:5173",
    "https://campus-nest-three.vercel.app"
];
    app.use(cors({
        origin: allowedOrigins,
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
        await mongoose.connect(dbUrl);
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
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT} Port`);
    });