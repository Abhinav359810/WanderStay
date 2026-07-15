import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "../components/Card";

// Home page
export default function Index(){

    const [list, setList] = useState([]);

    useEffect(()=>{
       axios.get("http://localhost:8080/listings",{withCredentials:true})
       .then((res)=>{
        setList(res.data)
       }).catch((err)=>{
        console.log(err);
       })
    },[]);

    return(
        <>
        {/* home page */}
        <h3 className="my-2">All Listings</h3>
        {/* We have created a container div which will store all the cards and this container will control the rows and cols  */}
         <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1">
        {
            list.map((item)=>{
            return(
                <Link className="listing-link" to={`/listings/${item._id}/`}>
                <Card key={item._id} image={item.image?.url} title = {item.title} price={item.price}/>
                </Link>
            )
        })
        }
        </div>
        </>
    )
}
