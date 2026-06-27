import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(){
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
        <Link className="nav-link" to="/listings/new">Add new Listings </Link>
      </div>
    </div>
  </div>
</nav>
</>
    );
}