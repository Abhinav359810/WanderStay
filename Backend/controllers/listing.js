const Listing = require("../Models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { cloudinary } = require("../cloudConfig");

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

module.exports.createListing = async (req, res) => {
    // 1. Build address
    const query = `${req.body.location}, ${req.body.country}`;
    // 2. Ask Nominatim
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        {
            headers: {
                "User-Agent": "CampusNest/1.0"
            }
        }
    );
    const data = await response.json();
    // 3. Create listing
    const listing = new Listing(req.body);
    // 4. Set owner
    listing.owner = req.user._id;
    // 5. Cloudinary image code
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = {
        url,
        filename
    };
    // 6. Store coordinates
    if (data.length > 0) {
        listing.geometry = {
            type: "Point",
            coordinates: [
                Number(data[0].lon),
                Number(data[0].lat)
            ]
        };
    }
    // 7. Save
    await listing.save();
    res.json({
        message: "Listing Created Successfully!"
    });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    // Build location query
    const query = `${req.body.location}, ${req.body.country}`;
    // Get new coordinates
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
        {
            headers: {
                "User-Agent": "CampusNest/1.0"
            }
        }
    );
    const data = await response.json();
    // Update normal listing fields
    let listing = await Listing.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    // Update coordinates
    if (data.length > 0) {
        listing.geometry = {
            type: "Point",
            coordinates: [
                Number(data[0].lon),
                Number(data[0].lat)
            ]
        };
    }
    // If new image uploaded
    if (req.file) {
        // Delete old image from Cloudinary
        await cloudinary.uploader.destroy(
            listing.image.filename
        );
        // Store new image
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = {
            url,
            filename
        };
    }
    // Save image/geometry changes
    await listing.save();

    res.json({
        message: "Listing Updated Successfully !!!"
    });
};

module.exports.deleteListing = async (req,res) =>{
        let {id} = req.params;
        let listing = await Listing.findById(id);
        await cloudinary.uploader.destroy(listing.image.filename);
        await Listing.findByIdAndDelete(id);
        res.json({
            message : "Listing deleted!"
        });
};

