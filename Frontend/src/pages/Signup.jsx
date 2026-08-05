import axios from "axios";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
import API_URL from "../config/api";

export default function Signup(){

    const[user , setUser] = useState({
        username : "",
        email : "",
        password : ""
    });
    const { setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    function handlechange(event){
        setUser((prevUser)=>{
            return {...prevUser, [event.target.name] : event.target.value}
        });
    }

    function handlesubmit(event){
        event.preventDefault();
        axios.post(`${API_URL}/signup`,user,{withCredentials:true}).
        then((res)=>{
            toast.success(res.data.message);
            setIsLoggedIn(true);
            navigate('/listings');
        }).catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        })
    };

    useBootstrapValidation();

    return (
    <div className="login-page">
        <div className="login-card">
            {/* Header */}
            <div className="login-header">
                <div className="login-icon">
                    <i className="fa-solid fa-house-chimney"></i>
                </div>
                <h2>Create your account</h2>
                <p>
                    Join CampusNest and find your next student home.
                </p>
            </div>
            <form
                onSubmit={handlesubmit}
                noValidate
                className="needs-validation"
            >
                {/* Username */}
                <div className="mb-3">
                    <label
                        htmlFor="username"
                        className="form-label login-label"
                    >
                        Username
                    </label>
                    <div className="login-input-group">
                        <i className="fa-regular fa-user"></i>
                        <input
                            name="username"
                            id="username"
                            type="text"
                            className="form-control"
                            placeholder="Choose a username"
                            value={user.username}
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <div className="invalid-feedback">
                        Please choose a username
                    </div>
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label
                        htmlFor="email"
                        className="form-label login-label"
                    >
                        Email
                    </label>
                    <div className="login-input-group">
                        <i className="fa-regular fa-envelope"></i>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <div className="invalid-feedback">
                        Please enter a valid email
                    </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="form-label login-label"
                    >
                        Password
                    </label>
                    <div className="login-input-group">
                        <i className="fa-solid fa-lock"></i>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={user.password}
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <div className="invalid-feedback">
                        Please enter a password
                    </div>
                </div>
                {/* Signup Button */}
                <button className="login-btn">
                    <i className="fa-solid fa-user-plus"></i>
                    Create account
                </button>
            </form>
            {/* Login Link */}
            <div className="login-footer">
                <p>
                    Already have an account?
                    <Link to="/login"> Log in</Link>
                </p>
            </div>
        </div>
    </div>
);
    // return(
    //     <div className="row mt-3">
    //         <h1 className="col-6 offset-3">SignUp on CampusNest</h1>
    //         <div className="col-6 offset-3">
    //             <form onSubmit={handlesubmit} noValidate className="needs-validation">
    //                 {/* Username */}
    //                 <div className="mb-3">
    //                     <label htmlFor="username" className="form-label">Username</label>
    //                     <input
    //                         name = "username"
    //                         id = "username"
    //                         type="text"
    //                         className="form-control"
    //                         value={user.username}
    //                         onChange={handlechange}
    //                         required
    //                     />
    //                 <div className="valid-feedback">Looks good!</div>
    //                 </div>
    //                 {/* Email */}
    //                 <div className="mb-3">
    //                      <label htmlFor="email" className="form-label">Email</label>
    //                      <input
    //                         name = "email"
    //                         id = "email"
    //                         type="email"
    //                         className="form-control"
    //                         value={user.email}
    //                         onChange={handlechange}
    //                         required
    //                     />
    //                 </div>
    //                 {/* Password */}
    //                 <div className="mb-3">
    //                      <label htmlFor="password" className="form-label">Password</label>
    //                      <input
    //                         name = "password"
    //                         id = "password"
    //                         type="password"
    //                         className="form-control"
    //                         value={user.password}
    //                         onChange={handlechange}
    //                         required
    //                     />
    //                 </div>
    //                 <button className="btn btn-success">SignUp</button>
    //             </form>
    //         </div>
    //     </div>
    // )
};