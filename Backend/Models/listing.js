
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
//created schema 
const listingSchema = new Schema({
    
        title : {
            type : String,
            required : true
        },
        description : String,
        image : { // url
            type : Object,
            default :"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set : (v) => v === ""? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        },
        price : Number,
        location : String,
        country : String,
        reviews : [
            {
                type : Schema.Types.ObjectId,
                ref : "Review",
            }
        ],
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User",
        },
});

//mongoose post middleware to delete all the reviews after deleting a listing
listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}})
    }
})

//creating model = collection = Listing
const Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing;