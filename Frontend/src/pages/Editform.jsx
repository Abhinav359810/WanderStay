//Editform
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';

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
        location:""
     });

    useEffect(()=>{
        axios.get(`http://localhost:8080/listings/${id}`)
        .then((res)=>{
            // setListing(res.data);
             const { title, description, image, price, country, location } = res.data;
            setListing({
                title,
                description,
                image,
                price,
                country,
                location
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
        });
    }

    function handlechange(event){
        const {name,value,files,type} = event.target;
        setListing((prevlist)=>({
            ...prevlist,
            [name] : type === "file" ? files[0] : value,
        }));
    }
    //hooks
    useBootstrapValidation();
    
    return(
        <>
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

            <div className="row">
            <div className="mb-3 col-md-4">
            <label htmlFor="price" className="form-label">Price</label>
            <input id="price"name="price" className="form-control"value={listing.price}onChange={handlechange}  required/>
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
            
            <button className="btn btn-dark mb-2 edit-btn">Edit</button>
        </form>
        </div>
    </div>
        </>
    );
}