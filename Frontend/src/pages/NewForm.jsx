import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';
import LoadingOverlay from "../components/LoadingOverlay";
import "./ListingForm.css";

export default function NewForm(){

    const navigate = useNavigate();

    const[listing,setListing] = useState({
        title :"",
        description:"",
        image:"",
        price:"",
        country:"",
        location:"",
        propertyType: "",
        gender: "",
        college: "",
        amenities: []
     });

     const [loading, setLoading] = useState(false);

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

    function handlesubmit(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append("title",listing.title);
        formData.append("description",listing.description);
        formData.append("image",listing.image);
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

        axios.post(`${API_URL}/listings`, formData, { withCredentials: true })
        .then((res)=>{
            navigate('/listings');
            toast.success(res.data.message);
        }).catch((err)=>{
            toast.error(err.response?.data || 'Create failed');
            console.log(err);
        }).finally(()=>{
            setLoading(false);
        });
    }
    //hooks 
    useBootstrapValidation();


    return (
    <>
        <LoadingOverlay
            loading={loading}
            message="Creating Your Listing..."
        />

        <div className="listing-form-page">
            {/* Page Heading */}
            <div className="listing-form-header">
                <div className="form-header-icon">
                    <i className="fa-solid fa-house-circle-check"></i>
                </div>

                <div>
                    <h2>List your property</h2>
                    <p>
                        Help students discover a comfortable place near their college.
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
                            <p>Tell students about your property.</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Property title
                        </label>
                        <input
                            id="title"
                            name="title"
                            placeholder="e.g. Green View Student PG"
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
                            placeholder="Describe the property, rooms and nearby facilities..."
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
                            <p>Help students understand what accommodation you offer.</p>
                        </div>
                    </div>

                    <div className="row">
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


                    <div>
                        <label htmlFor="college" className="form-label">
                            Nearby college / university
                        </label>

                        <input
                            id="college"
                            name="college"
                            type="text"
                            className="form-control"
                            placeholder="e.g. IIIT Kalyani"
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
                            <p>Select the facilities available at this property.</p>
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
                            <p>Add the property's location and monthly rent.</p>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-md-5 mb-3">
                            <label htmlFor="price" className="form-label">
                                Monthly rent (₹)
                            </label>

                            <input
                                id="price"
                                name="price"
                                className="form-control"
                                placeholder="7500"
                                value={listing.price}
                                onChange={handlechange}
                                type="number"
                                required
                            />

                            <div className="invalid-feedback">
                                Please enter a valid price
                            </div>
                        </div>


                        <div className="col-md-7 mb-3">
                            <label htmlFor="country" className="form-label">
                                Country
                            </label>

                            <input
                                id="country"
                                name="country"
                                className="form-control"
                                placeholder="India"
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


                    <div>
                        <label htmlFor="location" className="form-label">
                            Property location
                        </label>

                        <input
                            id="location"
                            name="location"
                            className="form-control"
                            placeholder="e.g. Kalyani, West Bengal"
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


                {/* ================= IMAGE ================= */}

                <div className="form-section">

                    <div className="form-section-heading">
                        <i className="fa-solid fa-image"></i>

                        <div>
                            <h4>Property photo</h4>
                            <p>Upload a clear photo that represents the accommodation.</p>
                        </div>
                    </div>


                    <div>
                        <label htmlFor="image" className="form-label">
                            Upload image
                        </label>

                        <input
                            id="image"
                            name="image"
                            className="form-control"
                            accept="image/*"
                            type="file"
                            onChange={handlechange}
                            required
                        />

                        <div className="form-text">
                            Choose a clear image of the property or room.
                        </div>
                    </div>

                </div>


                {/* ================= SUBMIT ================= */}

                <div className="form-submit-area">

                    <p>
                        <i className="fa-solid fa-circle-info"></i>
                        Make sure the property information is accurate before publishing.
                    </p>

                    <button
                        className="publish-listing-btn"
                        disabled={loading}
                    >
                        <i className="fa-solid fa-plus"></i>
                        List Property
                    </button>

                </div>

            </form>

        </div>
    </>
);
};