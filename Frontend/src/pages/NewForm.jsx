import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';
import LoadingOverlay from "../components/LoadingOverlay";

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

        axios.post("http://localhost:8080/listings", formData, { withCredentials: true })
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

    return(
        <>
        <LoadingOverlay
            loading={loading}
            message="Creating Your Listing..."
        />
        <div className="row mt-3">
            <div className="col-8 offset-2">
        <h3> Create new Listing </h3>
        <form onSubmit={handlesubmit} noValidate className="needs-validation" encType="multipart/form-data"> 

            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input id="title" name="title" placeholder="Add a catchy title" className="form-control"value={listing.title}onChange={handlechange} type="text" required/> 
             <div className="valid-feedback"> Title Looks good </div>
            </div>

            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
             <textarea id="description"name="description" className="form-control" value={listing.description}onChange={handlechange} required /> 
            <div className="invalid-feedback">Give a short description</div>
            </div>

             <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload Image</label>
             <input id="image"name="image" className="form-control" placeholder="Enter image Url" accept="image/*" type="file" onChange={handlechange} required/>
            </div>

    {/* Property Type */}
    <div className="mb-3">
        <label htmlFor="propertyType" className="form-label">
            Property Type
        </label>

        <select
            id="propertyType"
            name="propertyType"
            className="form-select"
            value={listing.propertyType}
            onChange={handlechange}
            required
        >
        <option value="">Select Property Type</option>
        <option value="PG">PG</option>
        <option value="Hostel">Hostel</option>
        <option value="Flat">Flat</option>
        </select>
        <div className="invalid-feedback">Please select a property type</div>
    </div>

    {/* Gender Type */}
    <div className="mb-3">
    <label htmlFor="gender" className="form-label">
        Accommodation For
    </label>

    <select
        id="gender"
        name="gender"
        className="form-select"
        value={listing.gender}
        onChange={handlechange}
        required
    >
        <option value="">Select</option>
        <option value="Boys">Boys</option>
        <option value="Girls">Girls</option>
        <option value="Co-ed">Co-ed</option>
    </select>

    <div className="invalid-feedback">
        Please select an option
    </div>
</div>

{/* Nearby College */}
<div className="mb-3">

    <label htmlFor="college" className="form-label">
        Nearby College / University
    </label>

    <input
        id="college"
        name="college"
        type="text"
        className="form-control"
        placeholder="e.g. Jadavpur University"
        value={listing.college}
        onChange={handlechange}
        required
    />

    <div className="invalid-feedback">
        Please enter a nearby college
    </div>
</div>

{/* Ameneties */}
<div className="mb-3">
    <label className="form-label">
        Amenities
    </label>

    <div>
        <input
            type="checkbox"
            value="WiFi"
            checked={listing.amenities.includes("WiFi")}
            onChange={handleAmenityChange}
        />
        <label className="ms-2">
            WiFi
        </label>
    </div>

    <div>
        <input
            type="checkbox"
            value="Food"
            onChange={handleAmenityChange}
        />
        <label className="ms-2">
            Food
        </label>
    </div>

    <div>
        <input
            type="checkbox"
            value="Laundry"
            onChange={handleAmenityChange}
        />
        <label className="ms-2">
            Laundry
        </label>
    </div>

    <div>
        <input
            type="checkbox"
            value="AC"
            onChange={handleAmenityChange}
        />
        <label className="ms-2">
            AC
        </label>
    </div>

    <div>
        <input
            type="checkbox"
            value="Parking"
            onChange={handleAmenityChange}
        />
        <label className="ms-2">
            Parking
        </label>
    </div>
</div>
        {/* Price */}
            <div className="row">
            <div className="mb-3 col-md-4">
            <label htmlFor="price" className="form-label">Monthly Rent (₹)</label>
            <input id="price"name="price" className="form-control"placeholder="1500"  value={listing.price}onChange={handlechange} type="number" required />
            <div className="invalid-feedback">Please enter a valid Price</div>
            </div>

            <div className="mb-3 col-md-8">
            <label htmlFor="country" className="form-label">Country</label>
             <input id="country" name="country" className="form-control" placeholder="India" value={listing.country}onChange={handlechange} type="text" required/>
            <div className="invalid-feedback">Country name should be valid</div>
            </div>
           </div>

            <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input id="location" name="location" className="form-control" placeholder="Kolkata,Mumbai" value={listing.location} onChange={handlechange} type="text" required/>
            <div className="invalid-feedback">Location should be valid</div>
            </div>
            
            <button className="btn btn-dark mb-2 add-btn" disabled={loading}>Add</button>
        </form>
        </div>
    </div>
        </>
    );
};