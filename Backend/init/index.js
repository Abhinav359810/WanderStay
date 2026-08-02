const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js");
const User = require("../Models/user.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/CampusNest";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

// ==========================================
// Initialize CampusNest Database
// ==========================================

const initDatabase = async () => {
    // Delete previous seed data
    await Listing.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    console.log("Old data deleted");
    // ==========================================
    // 1. CREATE DEMO USERS
    // ==========================================
// Demo accounts used only for database seeding.
// These are not real user credentials.
    const usersData = [
        {
            username: "campusnest_host",
            email: "host@campusnest.demo"
        },
        {
            username: "riya",
            email: "riya@campusnest.demo"
        },
        {
            username: "arjun",
            email: "arjun@campusnest.demo"
        },
        {
            username: "sneha",
            email: "sneha@campusnest.demo"
        },
        {
            username: "rahul",
            email: "rahul@campusnest.demo"
        },
        {
            username: "ananya",
            email: "ananya@campusnest.demo"
        },
        {
            username: "rohan",
            email: "rohan@campusnest.demo"
        },
        {
            username: "ishita",
            email: "ishita@campusnest.demo"
        },
        {
            username: "aditya",
            email: "aditya@campusnest.demo"
        }
    ];


    const createdUsers = [];
    for (let userData of usersData) {
        const newUser = new User({
            username: userData.username,
            email: userData.email
        });
        const registeredUser = await User.register(
            newUser,
            "demo123"
        );
        createdUsers.push(registeredUser);
    }
    console.log("Demo users created");
    // First user will own the seeded listings
    const owner = createdUsers[0];
    // Remaining users will write reviews
    const reviewUsers = createdUsers.slice(1);
    // ==========================================
    // 2. CREATE LISTINGS
    // ==========================================
    for (let i = 0; i < initdata.data.length; i++) {
        const data = initdata.data[i];
        /*
            data contains:

            title
            description
            image
            price
            location
            ...
            seedReviews

            But seedReviews does NOT belong
            inside Listing schema.

            So we separate it.
        */

        const {
            seedReviews,
            ...listingData
        } = data;

        // Create listing
        const listing = new Listing({
            ...listingData,
            owner: owner._id,
            reviews: []
        });
        // ==========================================
        // 3. CREATE REVIEWS FOR THIS LISTING
        // ==========================================
        for (let j = 0; j < seedReviews.length; j++) {
            const reviewData = seedReviews[j];
            // Rotate review authors
            const authorIndex =
                (i + j) % reviewUsers.length;
            const review = new Review({
                rating: reviewData.rating,
                comment: reviewData.comment,
                author:
                    reviewUsers[authorIndex]._id
            });
            // Save review in reviews collection
            await review.save();
            // Store Review ObjectId inside Listing
            listing.reviews.push(review._id);
        }
        // ==========================================
        // 4. SAVE LISTING
        // ==========================================
        await listing.save();
    }

    console.log("Listings and reviews created");
    console.log("CampusNest database initialized successfully");
    // Close MongoDB connection
    await mongoose.connection.close();
};
// Run seed function
initDatabase();