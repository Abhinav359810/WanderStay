import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';

export default function Show(){
    const [listing, setListing] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    country: "",
    reviews: []
    });

    const[review,setReview] = useState({
        rating:1,
        comment:""
    });

   // Get ID from React Router URL
    const {id} = useParams();

    const navigate = useNavigate();

   //Fetch data from Express API using the ID
    function fetchListing() {
    axios.get(`http://localhost:8080/listings/${id}`)
        .then((res) => {
            setListing(res.data);
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
        axios.delete(`http://localhost:8080/listings/${listing._id}`)
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

    // Handling Submit Review
    function handleReview(event){
        event.preventDefault();
        axios.post(`http://localhost:8080/listings/${id}/reviews`,review).
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
        axios.delete(`http://localhost:8080/listings/${id}/reviews/${reviewId}`).
        then((res)=>{
            toast.success(res.data.message);
            // navigate(`/listings/${id}`);
            fetchListing();
        }).catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        })
    };

    // For client side validation
    useBootstrapValidation();

    return(
        <div className="row mt-3">
            {/* Heading */}
            <div className="col-8 offset-3">
                 <h3>{listing.title}</h3>
            </div>
            {/* Card Image */}
            <div className="card col-6 offset-3 show-card listing-card">
                <img src={listing.image?.url} className="card-img-top show-img" alt="listing Image"/>
            {/* Card details  */}
            <div className="card-body">
                <p className="card-text">
                    {listing.description}<br/>
                    {`\u20B9`}{listing.price?.toLocaleString("en-IN")}<br/>
                    {listing.location}<br/>
                    {listing.country}
                </p>
                <div className="btns">
                    <Link to={`/listings/${listing._id}/edit`}>
                        <button className="btn btn-dark edit-btn">Edit</button>
                    </Link>
                    <button className="btn btn-dark" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            </div>      
        {/* Reviews Section */} 
        <div className="col-8 offset-3 mb-3">
            <hr />
            <h4>Leave a Review</h4>
            <form onSubmit={handleReview} noValidate className="needs-validation"> 
                 {/* Rating Slider */}
                <div className="mb-3 mt-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <input type="range" min="1" max="5" id="rating" name="rating" className="form-range" value={review.rating} onChange={handlechange} required/>
                </div>

                {/* Comments  */}
                <div className="mb-3 mt-3">
                <label htmlFor="comment" className="form-label">Comments</label>
                <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="5"
                    value={review.comment}
                    onChange={handlechange}
                    className="form-control"
                    required
                ></textarea>
                 <div className="invalid-feedback">Please add some comments </div>
                </div>

                <button  className="btn btn-outline-dark">Submit</button>
            </form>
            <hr/>
        {/* All reviews section */}
        <p><b>All Reviews</b></p>
        <div className="row">
        {
            listing.reviews.map((review) => (
            <div className="card col-5 ms-3 mb-3" key={review._id}>
               <div className="card-body">
                <h5 className="card-title">User</h5>
                 <p className="card-text">{review.rating} stars</p>
                 <p className="card-text">{review.comment}</p>
               </div>
                    <button key={review._id} onClick={()=>handleReviewDelete(review._id)}className="btn btn-sm btn-dark mt-2 mb-2 align-self-start" style={{ width: "fit-content", padding: "0.25rem 0.75rem" }}>Delete</button>
            </div>
            ))
        }
        </div>
        </div>
    </div>
    );
};