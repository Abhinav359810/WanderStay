const User = require("../Models/user");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");

module.exports.currentUser =  (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }

    res.status(401).send("Not Logged In");
};

module.exports.signup = async (req, res) => {
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
            message: "Welcome to CampusNest"
        });
        });
    } catch (err) {
        // res.status(409).json({
        //     message : err.message
        // });
        throw new ExpressError(409,err.message);
    }
};

module.exports.login = (req,res,next)=>{
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
};

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        };
    res.json({
        message : "Logged Out"
    });
    });
};