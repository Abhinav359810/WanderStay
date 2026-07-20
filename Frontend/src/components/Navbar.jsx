import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/AuthContext";


export default function Navbar(){

  const navigate = useNavigate();
  
  const {isLoggedIn,setIsLoggedIn} = useAuth();

  function handleNewListing(){
    if(!isLoggedIn){
      toast.error("Please Login First !");
      navigate("/login",{
        state:{from : "/listings/new"}
      });
      return;
    }
    navigate("/listings/new");
  }

  function handlelogout(){
    axios.get("http://localhost:8080/logout",{withCredentials:true}).
    then((res)=>{
      toast.success(res.data.message);
      setIsLoggedIn(false);
      navigate('/listings');
    }).catch(()=>{
      setIsLoggedIn(false);
      navigate('/listings');
    })
  };
    return(
        <>
        <nav className="navbar navbar-expand-md bg-body-light border-bottom sticky-top">
        <div className="container-fluid">
        <Link className="navbar-brand" to="/"><i className="fa-solid fa-house"></i></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
        <span className="navbar-toggler-icon"></span>
     </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/listings">All Listings</Link>
        <button onClick={handleNewListing} className="nav-link btn btn-link">
            Add new Listings
        </button>
      </div>

      {/* Auth control */}
       <div className="navbar-nav ms-auto">
        {
          !isLoggedIn?
          <>
            <Link className="nav-link" to="/signup">Sign Up</Link>
            <Link className="nav-link" to="/login">Log in</Link>
          </>
          :
            <button onClick={handlelogout} className="nav-link btn btn-link">Logout</button>
        }
      </div>
    </div>
  </div>
</nav>
</>
    );
}