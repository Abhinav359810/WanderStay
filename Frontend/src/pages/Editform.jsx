//Editform
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';
import LoadingOverlay from "../components/LoadingOverlay";
import "./ListingForm.css";
import API_URL from "../config/api";

export default function Editform(){

    const navigate = useNavigate();
    // Get ID from React Router URL
    const {id} = useParams();
    const[listing,setListing] = useState({
        title :"",
        description:"",
        image:{
            url : "",
            filename : ""
        },
        price:"",
        country:"",
        location:"",
        propertyType: "",
        gender: "",
        college: "",
        amenities: []   
     });

     const [loading, setLoading] = useState(false);

    useEffect(()=>{
        axios.get(`${API_URL}/listings/${id}`)
        .then((res)=>{
            // setListing(res.data);
             const { title, description, image, price, country, location,propertyType,gender,college,amenities } = res.data;
            setListing({
                title,
                description,
                image,
                price,
                country,
                location,
                propertyType,
                gender,
                college,
                amenities: amenities || []
            });
        }).catch((err)=>{
            console.log(err);
        })
    },[id]);

    function handlesubmit(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append("title",listing.title);
        formData.append("description",listing.description);
        formData.append("price",listing.price);
        formData.append("country",listing.country);
        formData.append("location",listing.location);

        formData.append("propertyType", listing.propertyType);
        formData.append("gender", listing.gender);
        formData.append("college", listing.college);

        listing.amenities.forEach((amenity) => {
        formData.append("amenities", amenity);
        });
        setLoading(true);

        if (listing.image instanceof File) {
           formData.append("image", listing.image);
        }

        axios.put(`${API_URL}/listings/${id}`,formData,{withCredentials:true})
        .then((res)=>{
            navigate('/listings');
            toast.success(res.data.message);
        }).catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        }).finally(()=>{
            setLoading(false);
        });
    }

    function handlechange(event){
        const {name,value,files,type} = event.target;
        setListing((prevlist)=>({
            ...prevlist,
            [name] : type === "file" ? files[0] : value,
        }));
    }

    function handleAmenityChange(event) {
    const { value, checked } = event.target;

    setListing((prevlist) => {

        if (checked) {
            return {
                ...prevlist,
                amenities: [
                    ...prevlist.amenities,
                    value
                ]
            };
        }

        return {
            ...prevlist,
            amenities: prevlist.amenities.filter(
                (item) => item !== value
            )
        };
    });
}

    //hooks
    useBootstrapValidation();

return (
    <>
        <LoadingOverlay
            loading={loading}
            message="Updating Your Listing..."
        />
        <div className="listing-form-page">
            {/* Page Heading */}
            <div className="listing-form-header">
                <div className="form-header-icon">
                    <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div>
                    <h2>Edit your property</h2>
                    <p>
                        Update your property information and keep your listing accurate.
                    </p>
                </div>
            </div>
            <form
                onSubmit={handlesubmit}
                noValidate
                className="needs-validation listing-form"
                encType="multipart/form-data"
            >
                {/* ================= BASIC INFORMATION ================= */}
                <div className="form-section">
                    <div className="form-section-heading">
                        <i className="fa-solid fa-file-lines"></i>
                        <div>
                            <h4>Basic information</h4>
                            <p>Update the main details students see about your property.</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Property title
                        </label>
                        <input
                            id="title"
                            name="title"
                            className="form-control"
                            value={listing.title}
                            onChange={handlechange}
                            type="text"
                            required
                        />
                        <div className="valid-feedback">
                            Title looks good
                        </div>
                    </div>

                    <div>

                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-control listing-description-input"
                            value={listing.description}
                            onChange={handlechange}
                            required
                        />

                        <div className="invalid-feedback">
                            Please add a short description
                        </div>
                    </div>
                </div>

                {/* ================= PROPERTY DETAILS ================= */}
                <div className="form-section">
                    <div className="form-section-heading">
                        <i className="fa-solid fa-building"></i>
                        <div>
                            <h4>Property details</h4>
                            <p>Update the accommodation information for students.</p>
                        </div>
                    </div>
                    <div className="row">
                        {/* Property Type */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="propertyType" className="form-label">
                                Property type
                            </label>
                            <select
                                id="propertyType"
                                name="propertyType"
                                className="form-select"
                                value={listing.propertyType}
                                onChange={handlechange}
                                required
                            >
                                <option value="">Select property type</option>
                                <option value="PG">PG</option>
                                <option value="Hostel">Hostel</option>
                                <option value="Flat">Flat</option>
                            </select>

                            <div className="invalid-feedback">
                                Please select a property type
                            </div>

                        </div>

                        {/* Gender */}
                        <div className="col-md-6 mb-3">

                            <label htmlFor="gender" className="form-label">
                                Accommodation for
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                className="form-select"
                                value={listing.gender}
                                onChange={handlechange}
                                required
                            >
                                <option value="">Select accommodation</option>
                                <option value="Boys">Boys</option>
                                <option value="Girls">Girls</option>
                                <option value="Co-ed">Co-ed</option>
                            </select>

                            <div className="invalid-feedback">
                                Please select an option
                            </div>
                        </div>
                    </div>

                    {/* College */}
                    <div>
                        <label htmlFor="college" className="form-label">
                            Nearby college / university
                        </label>
                        <input
                            id="college"
                            name="college"
                            type="text"
                            className="form-control"
                            value={listing.college}
                            onChange={handlechange}
                            required
                        />
                        <div className="invalid-feedback">
                            Please enter a nearby college
                        </div>
                    </div>
                </div>

                {/* ================= AMENITIES ================= */}
                <div className="form-section">
                    <div className="form-section-heading">
                        <i className="fa-solid fa-list-check"></i>
                        <div>
                            <h4>Amenities</h4>
                            <p>Select the facilities currently available at this property.</p>
                        </div>
                    </div>

                    <div className="amenities-selector">
                        <label className="amenity-option">
                            <input
                                type="checkbox"
                                value="WiFi"
                                checked={listing.amenities.includes("WiFi")}
                                onChange={handleAmenityChange}
                            />
                            <i className="fa-solid fa-wifi"></i>
                            <span>WiFi</span>
                        </label>

                        <label className="amenity-option">
                            <input
                                type="checkbox"
                                value="Food"
                                checked={listing.amenities.includes("Food")}
                                onChange={handleAmenityChange}
                            />

                            <i className="fa-solid fa-utensils"></i>
                            <span>Food</span>
                        </label>

                        <label className="amenity-option">
                            <input
                                type="checkbox"
                                value="Laundry"
                                checked={listing.amenities.includes("Laundry")}
                                onChange={handleAmenityChange}
                            />

                            <i className="fa-solid fa-shirt"></i>
                            <span>Laundry</span>
                        </label>

                        <label className="amenity-option">
                            <input
                                type="checkbox"
                                value="AC"
                                checked={listing.amenities.includes("AC")}
                                onChange={handleAmenityChange}
                            />

                            <i className="fa-solid fa-snowflake"></i>
                            <span>AC</span>
                        </label>

                        <label className="amenity-option">
                            <input
                                type="checkbox"
                                value="Parking"
                                checked={listing.amenities.includes("Parking")}
                                onChange={handleAmenityChange}
                            />

                            <i className="fa-solid fa-square-parking"></i>
                            <span>Parking</span>
                        </label>
                    </div>
                </div>

                {/* ================= LOCATION & RENT ================= */}
                <div className="form-section">
                    <div className="form-section-heading">
                        <i className="fa-solid fa-location-dot"></i>
                        <div>
                            <h4>Location & rent</h4>
                            <p>Keep the property's location and monthly rent up to date.</p>
                        </div>
                    </div>

                    <div className="row">
                        {/* Rent */}
                        <div className="col-md-5 mb-3">
                            <label htmlFor="price" className="form-label">
                                Monthly rent (₹)
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                className="form-control"
                                value={listing.price}
                                onChange={handlechange}
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter a valid price
                            </div>
                        </div>

                        {/* Country */}
                        <div className="col-md-7 mb-3">
                            <label htmlFor="country" className="form-label">
                                Country
                            </label>
                            <input
                                id="country"
                                name="country"
                                className="form-control"
                                value={listing.country}
                                onChange={handlechange}
                                type="text"
                                required
                            />
                            <div className="invalid-feedback">
                                Please enter a valid country
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="form-label">
                            Property location
                        </label>
                        <input
                            id="location"
                            name="location"
                            className="form-control"
                            value={listing.location}
                            onChange={handlechange}
                            type="text"
                            required
                        />
                        <div className="invalid-feedback">
                            Please enter the property location
                        </div>
                    </div>
                </div>


                {/* ================= PROPERTY PHOTO ================= */}
                <div className="form-section">
                    <div className="form-section-heading">
                        <i className="fa-solid fa-image"></i>
                        <div>
                            <h4>Property photo</h4>
                            <p>Keep your current photo or upload a new one.</p>
                        </div>
                    </div>

                    {/* Current Image */}
                    {listing.image?.url && !(listing.image instanceof File) && (
                        <div className="current-property-image">
                            <p>Current photo</p>
                            <img
                                src={listing.image.url}
                                alt="Current property"
                            />
                        </div>
                    )}

                    <div>
                        <label htmlFor="image" className="form-label">
                            Upload new image
                        </label>
                        <input
                            id="image"
                            name="image"
                            className="form-control"
                            onChange={handlechange}
                            type="file"
                            accept="image/*"
                        />
                        <div className="form-text">
                            Leave this empty if you want to keep the current image.
                        </div>
                    </div>
                </div>

                {/* ================= SUBMIT ================= */}
                <div className="form-submit-area">
                    <p>
                        <i className="fa-solid fa-circle-info"></i>
                        Review your changes before updating the property.
                    </p>
                    <button
                        className="publish-listing-btn"
                        disabled={loading}
                    >
                        <i className="fa-solid fa-check"></i>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </>
);
}