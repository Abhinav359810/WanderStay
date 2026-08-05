import { useEffect, useState } from "react";
import axios from "axios";
import { Link,  useSearchParams} from "react-router-dom";
import Card from "../components/Card";
import "./Index.css";
import API_URL from "../config/api";

// Home page
export default function Index(){

    const [list, setList] = useState([]);
    const [searchParams,setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const propertyType = searchParams.get("propertyType") || "";
    const gender = searchParams.get("gender") || "";
    const amenity = searchParams.get("amenity") || "";

    useEffect(()=>{
       axios.get(`${API_URL}/listings`,{
       params:{
            search:search,
            propertyType: propertyType,
            gender: gender,
            amenity: amenity
       } 
    }).then((res)=>{
        setList(res.data)
       }).catch((err)=>{
        console.log(err);
       })
    },[search,propertyType,gender, amenity]);

    function handlePropertyType(event) {

    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
        params.set("propertyType", value);
    } else {
        params.delete("propertyType");
    }
    setSearchParams(params);
}

function handleGender(event) {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
        params.set("gender", value);
    } else {
        params.delete("gender");
    }
   setSearchParams(params);
}

function handleAmenity(event) {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
        params.set("amenity", value);
    } else {
        params.delete("amenity");
    }
    setSearchParams(params);
}

function clearFilters() {
    const params = new URLSearchParams(searchParams);
    params.delete("propertyType");
    params.delete("gender");
    params.delete("amenity");
    setSearchParams(params);
}


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

        {/* Filters  */}
        <div className="filters-bar">

            {/* Property */}
            <div className="filter-control">
            <i className="fa-solid fa-house"></i>
            <select
            value={propertyType}
            onChange={handlePropertyType}
            >
            <option value="">All Properties</option>
            <option value="PG">PG</option>
            <option value="Hostel">Hostel</option>
            <option value="Flat">Flat</option>
            </select>
            </div>

            {/* Gender Filter */}
            <div className="filter-control">
                <i className="fa-solid fa-venus-mars"></i>
                <select
                    value={gender}
                    onChange={handleGender}
                >
                <option value="">Any Accommodation</option>
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
                </select>
            </div>

            {/* Amenity */}
            <div className="filter-control">
            <i className="fa-solid fa-wifi"></i>
            <select
                value={amenity}
                onChange={handleAmenity}
            >
            <option value="">Any Amenity</option>
            <option value="WiFi">WiFi</option>
            <option value="Food">Food</option>
            <option value="Laundry">Laundry</option>
            <option value="AC">AC</option>
            <option value="Parking">Parking</option>
            </select>
        </div>
        
        {(propertyType || gender || amenity) && (
        <button
            className="clear-filters-btn"
            onClick={clearFilters}
        >
            <i className="fa-solid fa-xmark"></i>
            Clear filters
        </button>
        )}

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
