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
        <div className="row mt-3">
            {/* Heading */}
            <div className="col-8 offset-3">
                 <h3>{listing.title}</h3>
            </div>
            {/* Card Image */}
            <div className="card col-6 offset-3 show-card">
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
        </div>
    );
};