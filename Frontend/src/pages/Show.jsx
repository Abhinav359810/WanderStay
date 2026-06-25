import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Show(){
    const [listing,setListing] = useState({});

   // Get ID from React Router URL
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
        //Fetch data from Express API using the ID
        axios.get(`http://localhost:8080/listings/${id}`)
        .then((res)=>{
            setListing(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[id]);

    function handleDelete(){
        axios.delete(`http://localhost:8080/listings/${listing._id}`)
        .then(()=>{
            navigate('/listings');
        });
    }

    return(
        <>
        <h3> Listing Details : </h3>
       <ul>
            <li>{listing.title}</li>
            <li>{listing.description}</li>
            <li>{`\u20B9`}{listing.price?.toLocaleString("en-IN")}</li>
            <li>{listing.location}</li>
            <li>{listing.country}</li>
       </ul>
       <br/>
       <Link to={`/listings/${listing._id}/edit`}>
            <button>Edit this listing</button>
       </Link>
        <br/><br/>
        <button onClick={handleDelete}>Delete this Listing</button>
        </>
    );
};