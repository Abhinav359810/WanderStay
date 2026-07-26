const Listing = require("../Models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req,res)=>{
        const allListings = await Listing.find({});
        res.json(allListings);
};

module.exports.showListing = async (req,res)=>{
        let {id} = req.params;
       const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
    .populate("owner");
        if(!listing){
            throw new ExpressError(400,"Listing Does not Exists");
            // res.status(400).json("Listing Does not exits");
        }
        res.json(listing);
};

module.exports.createListing = async (req,res)=>{
        let url = req.file.path;
        let filename = req.file.filename;
        const listing = new Listing(req.body);
        listing.owner = req.user._id;
        listing.image = {url,filename};
        await listing.save();
        res.json({
            message:"Listing Created Successfully!"
        });
};

module.exports.updateListing = async (req,res)=>{
        let {id} = req.params;
        await Listing.findByIdAndUpdate(id,req.body);
        res.json({
            message:"Listing Updated Successfully !!!"
        });
};

module.exports.deleteListing = async (req,res) =>{
        let {id} = req.params;
        await Listing.findByIdAndDelete(id);
        res.json({
            message : "Listing deleted!"
        });
};

