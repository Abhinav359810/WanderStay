//Editform
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';
import LoadingOverlay from "../components/LoadingOverlay";

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
        axios.get(`http://localhost:8080/listings/${id}`)
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

        axios.put(`http://localhost:8080/listings/${id}`,formData,{withCredentials:true})
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
    
    return(
        <>
        <LoadingOverlay
            loading={loading}
            message="Editing your listing ..."        
        />
        <div className="row mt-3">
            <div className="col-8 offset-2">
        <h3>Edit your Listing </h3>
        <form onSubmit={handlesubmit} noValidate className="needs-validation">

            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input id="title" name="title" className="form-control"value={listing.title}onChange={handlechange} type="text" required/> 
            <div class="valid-feedback"> Title Looks good </div>
            </div>

            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
             <textarea id="description"name="description" className="form-control" value={listing.description}onChange={handlechange} required/> 
            <div className="invalid-feedback">Give a short description</div>
            </div>

             <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload New Image</label>
             <input id="image"name="image" className="form-control" onChange={handlechange} type="file" accept="image/*" />
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
        value={listing.college}
        onChange={handlechange}
        required
    />
</div>

{/* Amenties */}
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
            checked={listing.amenities.includes("Food")}
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
            checked={listing.amenities.includes("Laundry")}
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
            checked={listing.amenities.includes("AC")}
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
            checked={listing.amenities.includes("Parking")}
            onChange={handleAmenityChange}
        />

        <label className="ms-2">
            Parking
        </label>
    </div>
</div>
            {/* Rent */}
            <div className="row">
            <div className="mb-3 col-md-4">
            <label htmlFor="price" className="form-label">Monthly Rent (₹)</label>
            <input id="price"name="price" type="number" className="form-control"value={listing.price}onChange={handlechange}  required/>
            <div className="invalid-feedback">Price should be valid</div>
            </div>

            <div className="mb-3 col-md-8">
            <label htmlFor="country" className="form-label">Country</label>
             <input id="country" name="country" className="form-control"  value={listing.country}onChange={handlechange} type="text" required/>
            <div className="invalid-feedback">Country name should be valid</div>
            </div>
           </div>

            <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input id="location" name="location" className="form-control" value={listing.location} onChange={handlechange} type="text" required/>
            <div className="invalid-feedback">Location should be valid</div>
            </div>
            
            <button className="btn btn-dark mb-2 edit-btn" disabled={loading}>Edit</button>
        </form>
        </div>
    </div>
        </>
    );
}