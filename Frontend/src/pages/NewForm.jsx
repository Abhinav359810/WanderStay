import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";

export default function NewForm(){

    const navigate = useNavigate();

    const[listing,setListing] = useState({
        title :"",
        description:"",
        image:"",
        price:"",
        country:"",
        location:""
     });


    function handlechange(event){
        setListing((prevlist)=>{
            return {...prevlist, [event.target.name] : event.target.value}
        });
    }

    function handlesubmit(event){
        event.preventDefault();
        axios.post("http://localhost:8080/listings",listing)
        .then(()=>{
            navigate('/listings');
        }).catch((err)=>{
            console.log(err);
        });
    }
    //hooks 
    useBootstrapValidation();

    return(
        <>
        <div className="row mt-3">
            <div className="col-8 offset-2">
        <h3> Create new Listing </h3>
        <form onSubmit={handlesubmit} noValidate className="needs-validation"> 

            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input id="title" name="title" placeholder="Add a catchy title" className="form-control"value={listing.title}onChange={handlechange} type="text" required/> 
             <div class="valid-feedback"> Title Looks good </div>
            </div>

            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
             <textarea id="description"name="description" className="form-control" value={listing.description}onChange={handlechange} required /> 
            <div className="invalid-feedback">Give a short description</div>
            </div>

             <div className="mb-3">
            <label htmlFor="image" className="form-label">Image Link</label>
             <input id="image"name="image" className="form-control" placeholder="Enter image Url" value={listing.image}onChange={handlechange} type="text"/>
            </div>

            <div className="row">
            <div className="mb-3 col-md-4">
            <label htmlFor="price" className="form-label">Price</label>
            <input id="price"name="price" className="form-control"placeholder="1500"value={listing.price}onChange={handlechange} required/>
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
            
            <button className="btn btn-dark mb-2 add-btn">Add</button>
        </form>
        </div>
    </div>
        </>
    );
};