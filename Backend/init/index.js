const mongoose =  require("mongoose");
const initdata = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderStay";

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    mongoose.connect(MONGO_URL);
}

//creating function to initialise the database
const initDatabase = async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({
        ...obj,
        owner : "6a5e20a3ee4331a4c77accf6",

    }));
    await Listing.insertMany(initdata.data);
    await console.log("Initialised the database completed ");
}

//invoking the function 
initDatabase();

