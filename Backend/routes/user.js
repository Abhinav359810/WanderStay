const express = require("express");
const User = require("../Models/user");
const router = express.Router();
const userController = require("../controllers/user");

//Checking User logged in or not for authorization
router.get("/current-user", userController.currentUser);

//Signup Post Route
router.post("/signup", userController.signup);

//Login Post Route
router.post("/login", userController.login);
    
//logout
router.get("/logout",userController.logout);

module.exports = router;