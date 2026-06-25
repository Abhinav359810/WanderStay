//Editform
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Editform(){

    const navigate = useNavigate();
    // Get ID from React Router URL
    const {id} = useParams();
    const[listing,setListing] = useState({
        title :"",
        description:"",
        image:"",
        price:"",
        country:"",
        location:""
     });

    useEffect(()=>{
        axios.get(`http://localhost:8080/listings/${id}`)
        .then((res)=>{
            setListing(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    },[id]);

    function handlesubmit(event){
        event.preventDefault();
        axios.put(`http://localhost:8080/listings/${id}`,listing)
        .then(()=>{
            navigate('/listings');
        });
    }

     function handlechange(event){
        setListing((prevlist)=>{
            return {...prevlist, [event.target.name] : event.target.value}
        });
    }
    
    return(
        <>
        <h3> Edit the Listing </h3>
        <form onSubmit={handlesubmit}>
            <input name="title" placeholder="Enter Title" value={listing.title}onChange={handlechange}  type="text"/> 
            <br/><br/>
            <textarea name="description" placeholder="Enter description" value={listing.description}onChange={handlechange}> </textarea>
            <br/><br/>
            <input name="image" placeholder="Enter image url"value={listing.image.url}onChange={handlechange} type="text"/>
            <br/><br/>
            <input name="price" placeholder="Enter price "value={listing.price}onChange={handlechange} type="number"/>
            <br/><br/>
            <input name="country" placeholder="Enter country " value={listing.country}onChange={handlechange} type="text"/>
            <br/><br/>
            <input name="location" placeholder="Enter location " value={listing.location} onChange={handlechange} type="text"/>
            <br/><br/>
            <button>Edit</button>
        </form>
        </>
    );
}