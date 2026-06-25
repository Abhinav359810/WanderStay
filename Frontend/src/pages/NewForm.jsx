import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        });
    }

    return(
        <>
        <h3> Create new Listing </h3>
        <form onSubmit={handlesubmit}>
            <input name="title" placeholder="Enter Title" value={listing.title}onChange={handlechange}  type="text"/> 
            <br/><br/>
            <textarea name="description" placeholder="Enter description" value={listing.description}onChange={handlechange}> </textarea>
            <br/><br/>
            <input name="image" placeholder="Enter image url"value={listing.image}onChange={handlechange} type="text"/>
            <br/><br/>
            <input name="price" placeholder="Enter price "value={listing.price}onChange={handlechange} type="number"/>
            <br/><br/>
            <input name="country" placeholder="Enter country " value={listing.country}onChange={handlechange} type="text"/>
            <br/><br/>
            <input name="location" placeholder="Enter location " value={listing.location} onChange={handlechange} type="text"/>
            <br/><br/>
            <button>Add</button>
        </form>
        </>
    );
};