const express = require("express");
const User = require("../Models/user");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const router = express.Router();

//Signup Post Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        await User.register(newUser, password);
        res.json({
            message: "Welcome to WanderStay"
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
    passport.authenticate("local"), (req, res) => {
    res.json({
        message : "Welcome Back to WanderStay!"
    });
});

module.exports = router;