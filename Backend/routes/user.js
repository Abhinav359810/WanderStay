const express = require("express");
const User = require("../Models/user");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const router = express.Router();

//Checking User logged in or not for authorization
router.get("/current-user", (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }

    res.status(401).send("Not Logged In");
});

//Signup Post Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        //After signup -> Login 
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            res.json({
            message: "Welcome to WanderStay"
        });
        });
    } catch (err) {
        // res.status(409).json({
        //     message : err.message
        // });
        throw new ExpressError(409,err.message);
    }
});


//Login Post Route
router.post(
    "/login", 
    (req,res,next)=>{
        passport.authenticate("local",(err,user,info)=>{
            if(err){
                return next(err);
            }

            if(!user){
                return next(new ExpressError(401, info.message));
            }

            req.logIn(user,(err)=>{
                if(err) return next(err);

                return res.json({
                    message : "Welcome Back to Wander Stay!"
                });
            });
        })(req,res,next);
    }
);

//logout
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        };
    res.json({
        message : "Logged Out"
    });
    });
});

module.exports = router;