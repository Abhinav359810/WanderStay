import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Home page
export default function Index(){

    const [list, setList] = useState([]);

    useEffect(()=>{
       axios.get("http://localhost:8080/listings")
       .then((res)=>{
        setList(res.data)
       }).catch((err)=>{
        console.log(err);
       })
    },[]);

    return(
        <>
        {/* //routing to new.jsx */}
        <Link to='/listings/new'>
            <button>Create New Listing</button>
        </Link>

        {/* home page */}
        <h3>All Listings</h3>
        <ul>
        {
        list.map((item)=>{
            return (
                <li key={item._id}>
                {/* To wrap up in anchor we have used template literals for now with curly braces {} and this <a href="http://localhost:8080/listings/{item._id} will not work because react will not replace item._id and in future we will use react router to do it efficiently but for now use template literals  */}
                {/* <a href = {`http://localhost:8080/listings/${item._id}`}>{item.title}</a> */}
                <Link to={`/listings/${item._id}`}>{item.title}</Link>
                </li>
            )
        })
        }
        </ul>
        </>
    )
}

//other 
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Index(){
//     const [list, setList] = useState([]);
//     useEffect(()=>{
//         async function getListings(){
//             try{
//               const res = await axios.get(
//                     "http://localhost:8080/listings"
//                 );
//                 setList(res.data);
//             }
//             catch(err){
//                 console.log(err);
//             }
//         }
//         getListings();
//     },[]);

//     return(
//         <>
//         <h3>All Listings</h3>
//         <ul>
//         {
//         list.map((item)=>{
//             return (
//                 <li key={item.id}>
//                     {item.title}
//                 </li>
//             )
//         })
//         }
//         </ul>
//         </>
//     )
// }