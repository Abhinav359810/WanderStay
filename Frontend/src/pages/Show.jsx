import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import { Rating } from "react-simple-star-rating";
import ListingMap from "../components/ListingMap";
import "./Show.css";
import API_URL from "../config/api";

export default function Show(){
    const [listing, setListing] = useState({
    title: "",
    description: "",
    image: {
    url: "",
    filename: ""
    },
    price: "",
    location: "",
    country: "",

    propertyType: "",
    gender: "",
    college: "",
    amenities: [],
    
    geometry: {
        type: "",
        coordinates: []
    },
    reviews: [],
     owner: null,
    });

    const[review,setReview] = useState({
        rating:1,
        comment:""
    });

   // Get ID from React Router URL
    const {id} = useParams();
    const { isLoggedIn,user } = useAuth();
    const navigate = useNavigate();

   //Fetch data from Express API using the ID
    function fetchListing() {
    axios.get(`${API_URL}/listings/${id}`)
        .then((res) => {
            setListing({...res.data});
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.response.data);
        });
    }

    useEffect(() => {
        fetchListing();
    }, [id]);

    // Handling Listing Delete 
    function handleDelete(){
        axios.delete(`${API_URL}/listings/${listing._id}`, { withCredentials: true })
        .then((res)=>{
            navigate('/listings');
            toast.success(res.data.message);
        }).catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        });
    }

    // Handle change review
    function handlechange(event){
        setReview((prevreview)=>{
            return {...prevreview, [event.target.name] : event.target.value}
        });
    }

    //handle Rating
    const handleRating = (rate) =>{
        setReview((prev)=>({
            ...prev,
            rating : rate,
        }));
    };

    // Handling Submit Review
    function handleReview(event){
        event.preventDefault();
        axios.post(`${API_URL}/listings/${id}/reviews`,review,{withCredentials:true}).
        then((res)=>{
            // navigate(`/listings/${id}`);
            toast.success(res.data.message);
            fetchListing();
        }).catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        })
    };

    //Handling review deleted 
    function handleReviewDelete(reviewId){
        axios.delete(`${API_URL}/listings/${id}/reviews/${reviewId}`, { withCredentials: true }).
        then((res)=>{
            toast.success(res.data.message);
            // navigate(`/listings/${id}`);
            fetchListing();
        }).catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        })
    };

    const averageRating = listing.reviews.length > 0
    ? listing.reviews.reduce((sum, review) => {
        return sum + review.rating;
      }, 0) / listing.reviews.length
    : 0;

    // For client side validation
    useBootstrapValidation();

   return (
    <div className="container show-page mt-4">

        {/* Property Header */}
        <div className="show-header mb-3">
            <h2 className="fw-bold mb-2">
                {listing.title}
            </h2>
            <div className="show-location">
                <span>
                    {listing.location}, {listing.country}
                </span>
                {listing.college && (
                    <>
                        <span className="mx-2">•</span>
                        <span>
                            Near {listing.college}
                        </span>
                    </>
                )}
            </div>
        </div>

        {/* Property Image */}
        <div className="show-hero mb-4">
            <img
                src={listing.image?.url}
                alt={listing.title}
                className="show-hero-img"
            />
        </div>
    
    {/* Main Property Content */}
    <div className="row mt-5">

    {/* LEFT SIDE */}
    <div className="col-lg-8 pe-lg-5">

        {/* Property Summary */}
<section className="property-summary">
    <div className="property-heading">
        <div>
            <h3>
                {listing.propertyType} near {listing.college}
            </h3>
            <p>
                A student accommodation in {listing.location}
            </p>
        </div>
    </div>
    {/* Quick Highlights */}
    <div className="property-highlights">
        <div className="highlight-item">
            <div className="highlight-icon">
                 <i className="fa-solid fa-building"></i>
            </div>
            <div>
                <span>Property Type</span>
                <strong>{listing.propertyType}</strong>
            </div>
        </div>

        <div className="highlight-item">
            <div className="highlight-icon">
                <i className="fa-solid fa-users"></i>
            </div>
            <div>
                <span>Accommodation</span>
                <strong>{listing.gender}</strong>
            </div>
        </div>
        <div className="highlight-item">
            <div className="highlight-icon">
                <i className="fa-solid fa-graduation-cap"></i>
            </div>

            <div>
                <span>Nearby College</span>
                <strong>{listing.college}</strong>
            </div>
        </div>
    </div>
</section>

        <hr className="my-4" />

        {/* Owner */}
<section className="owner-section">
    <div className="owner-avatar">
        {listing.owner?.username
            ?.charAt(0)
            .toUpperCase() || "U"}
    </div>
    <div>
        <h5>
            Listed by {listing.owner?.username || "Unknown"}
        </h5>
        <p>
             <i className="fa-solid fa-circle-check me-1"></i>
            Property lister on CampusNest
        </p>
    </div>
</section>

      <hr className="my-4" />

        {/* Description */}
<section className="description-section">
    <div className="section-heading">
        <div className="section-icon">
            <i className="fa-regular fa-file-lines"></i>
        </div>
        <div>
            <h4>About this accommodation</h4>
            <p>
                Everything you need to know about this property
            </p>
        </div>
    </div>

    <div className="description-content">
        <p>
            {listing.description}
        </p>
    </div>
</section>

{/* Amenities */}
<hr className="my-4" />
<section className="amenities-section">
    <div className="section-heading">
        <div className="section-icon">
            <i className="fa-solid fa-list-check"></i>
        </div>
        <div>
            <h4>What this place offers</h4>
            <p>Facilities available at this accommodation</p>
        </div>
    </div>
    {listing.amenities.length > 0 ? (
        <div className="amenities-grid">
            {listing.amenities.map((amenity) => (
                <div className="amenity-item" key={amenity}>
                <i className={
                    amenity === "WiFi"
                        ? "fa-solid fa-wifi"
                        : amenity === "Food"
                        ? "fa-solid fa-utensils"
                        : amenity === "Laundry"
                        ? "fa-solid fa-shirt"
                        : amenity === "AC"
                        ? "fa-regular fa-snowflake"
                        : amenity === "Parking"
                        ? "fa-solid fa-square-parking"
                        : "fa-solid fa-circle-check"
                }></i>
                <span>
                    {amenity === "AC"
                        ? "Air Conditioning"
                        : amenity}
                </span>
            </div>
            ))}
        </div>
    ) : (
        <p className="text-muted">
            No amenities have been added for this property.
        </p>
    )}
</section>

{/* Maps */}
<hr className="my-4" />
<section className="location-section">
    <div className="section-heading">
        <div className="section-icon">
            <i className="fa-solid fa-location-dot"></i>
        </div>
        <div>
            <h4>Where you'll stay</h4>
            <p>
                {listing.location}, {listing.country}
            </p>
        </div>
    </div>
    {listing.geometry?.coordinates?.length === 2 && (
        <div className="show-map-container">
            <ListingMap listing={listing} />
        </div>
    )}
</section>
</div>

    {/* RIGHT SIDE */}
    <div className="col-lg-4">
        <div className="campusnest-side-card">
            <div className="mb-4">
                <span className="rent-price">
                    ₹{listing.price?.toLocaleString("en-IN")}
                </span>
                <span className="rent-period">
                    {" "}/ month
                </span>
            </div>

            <div className="side-property-info">
                <div className="side-info-row">
                    <span>Property Type</span>
                    <strong>{listing.propertyType}</strong>
                </div>
                <div className="side-info-row">
                    <span>Accommodation For</span>
                    <strong>{listing.gender}</strong>
                </div>
                <div className="side-info-row">
                    <span>Nearby College</span>
                    <strong>{listing.college}</strong>
                </div>
            </div>


            <button className="contact-owner-btn">
                Contact Owner
            </button>

            {/* Owner Controls */}
            {user && user?._id === listing.owner?._id && (
                <div className="owner-actions">
                    <Link
                        to={`/listings/${listing._id}/edit`}
                        className="owner-edit-btn"
                    >
                        Edit Listing
                    </Link>
                    <button
                        className="owner-delete-btn"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    </div>
</div>

{/* Reviews Section Full width */}
<section className="reviews-section">
    <hr className="my-5" />
    <div className="reviews-heading">
        <div>
            <h3>Student Reviews</h3>
            <p>
                Experiences shared by students
            </p>
        </div>
        {listing.reviews.length > 0 && (
            <div className="review-summary">
                <i className="fa-solid fa-star"></i>
                <strong>
                    {averageRating.toFixed(1)}
                </strong>
                <span>
                    · {listing.reviews.length} reviews
                </span>
            </div>
        )}
    </div>

{/* Leave Review Form */}
{isLoggedIn && (
    <div className="leave-review">
        <div className="leave-review-header">
            <div className="section-icon">
                <i className="fa-regular fa-pen-to-square"></i>
            </div>
            <div>
                <h4>Share your experience</h4>
                <p>
                    Help other students make a better decision
                </p>
            </div>
        </div>
        <form
            onSubmit={handleReview}
            noValidate
            className="needs-validation"
        >
            <div className="mb-3">
                <label className="form-label">
                    Your rating
                </label>
                <div>
                    <Rating
                        onClick={handleRating}
                        initialValue={review.rating}
                        allowFraction={false}
                        size={25}
                    />
                </div>
            </div>
            <div className="mb-3">
                <label
                    htmlFor="comment"
                    className="form-label"
                >
                    Your review
                </label>
                <textarea
                    name="comment"
                    id="comment"
                    rows="4"
                    value={review.comment}
                    onChange={handlechange}
                    className="form-control review-textarea"
                    placeholder="Share your experience with this accommodation..."
                    required
                />
                <div className="invalid-feedback">
                    Please add a review.
                </div>
            </div>
            <button className="submit-review-btn">
                Submit Review
            </button>
        </form>
    </div>
)}

{/* Reviews card */}
<div className="reviews-grid">
    {listing.reviews.map((review) => (
        <div
            className="review-card"
            key={review._id}
        >
            {/* Reviewer */}
            <div className="review-user">
                <div className="review-avatar">
                    {review.author?.username
                        ?.charAt(0)
                        .toUpperCase() || "U"}
                </div>
                <div>
                    <h6>
                        {review.author?.username || "User"}
                    </h6>
                    <span>
                        Student review
                    </span>
                </div>
            </div>
            {/* Rating */}
            <div className="review-stars">
                <Rating
                    initialValue={review.rating}
                    readonly={true}
                    allowFraction={false}
                    size={18}
                />
            </div>
            {/* Comment */}
            <p className="review-comment">
                {review.comment}
            </p>
            {/* Delete */}
            {user?._id === review.author?._id && (
                <button
                    onClick={() =>
                        handleReviewDelete(review._id)
                    }
                    className="review-delete-btn"
                >
                    <i className="fa-regular fa-trash-can me-2"></i>
                    Delete
                </button>
            )}
        </div>
    ))}
</div>

{/* No reviews Handle */}
{listing.reviews.length === 0 && (
    <div className="no-reviews">
        <i className="fa-regular fa-comment-dots"></i>
        <h5>No reviews yet</h5>
        <p>
            Be the first student to share your experience.
        </p>
    </div>
)}
</section>
</div>
);
};