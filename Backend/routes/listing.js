const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing.js");
const {listingSchema} = require("../utils/Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn,isOwner,validateListing } = require("../middleware/auth.js");

    //index route 
    router.get("/",async (req,res)=>{
        const allListings = await Listing.find({});
        res.json(allListings);
    });

    //show route
    router.get("/:id",async (req,res)=>{
        let {id} = req.params;
        const listing = await Listing.findById(id).populate("reviews").populate("owner");
        if(!listing){
            throw new ExpressError(400,"Listing Does not Exists");
            // res.status(400).json("Listing Does not exits");
        }
        res.json(listing);
    });

    //create route
    router.post('/', isLoggedIn ,validateListing, async (req,res)=>{
        // const listingData = {
        //         ...req.body.listing,
        //             image: {
        //                 filename: "listingimage",
        //                 url: req.body.listing.image
        //             }
        //         };
        const listing = new Listing(req.body);
        listing.owner = req.user._id;
        await listing.save();
        res.json({
            message:"Listing Created Successfully!"
        });
    });

    //update route
    router.put('/:id',isLoggedIn,isOwner,validateListing, async (req,res)=>{
        let {id} = req.params;
        await Listing.findByIdAndUpdate(id,req.body);
        res.json({
            message:"Listing Updated Successfully !!!"
        });
    })

    //Delete Route
    router.delete("/:id",isLoggedIn,isOwner, async (req,res) =>{
        let {id} = req.params;
        await Listing.findByIdAndDelete(id);
        res.json({
            message : "Listing deleted!"
        });
    });

module.exports = router;