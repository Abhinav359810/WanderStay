import { useEffect, useState } from "react";
import axios from "axios";
import { Link,  useSearchParams} from "react-router-dom";
import Card from "../components/Card";
import "./Index.css";

// Home page
export default function Index(){

    const [list, setList] = useState([]);
    const [searchParams] = useSearchParams();

    const search = searchParams.get("search") || "";


    useEffect(()=>{
       axios.get("http://localhost:8080/listings",{
       params:{
            search:search
       } 
    }).then((res)=>{
        setList(res.data)
       }).catch((err)=>{
        console.log(err);
       })
    },[search]);


    return(
        <>
        {/* home page */}
        <div className="index-heading">
            <div>
                <p>
                    Discover PGs, hostels and flats near your college.
                </p>
            </div>
        </div>
        {/* We have created a container div which will store all the cards and this container will control the rows and cols  */}
         
         {list.length === 0 ? (
            <div className="no-listings-found">
                <i className="fa-solid fa-magnifying-glass"></i>
                    <h4>No properties found</h4>
                    <p>
                    Try searching for a different college or location.
                    </p>
            </div>
        ) : (
         <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4">
        {
            list.map((item) => {
                return (
                    <Link
                        key={item._id}
                        className="listing-link"
                        to={`/listings/${item._id}`}
                    >
                        <Card
                            image={item.image?.url}
                            title={item.title}
                            price={item.price}
                            propertyType={item.propertyType}
                            gender={item.gender}
                            college={item.college}
                            location={item.location}
                            amenities={item.amenities}
                        />
                    </Link>
                );
            })
        }
        </div>
        )}
        </>
    );
}
