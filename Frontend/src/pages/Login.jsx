import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';
import { useAuth } from "../context/AuthContext";
import "./Auth.css";
import API_URL from "../config/api";

export default function Login(){

    const[user , setUser] = useState({
        username : "",
        password : ""
    });
    const {isLoggedIn , setIsLoggedIn} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from||'/listings';

    function handlechange(event){
        setUser((prevUser)=>{
            return {...prevUser, [event.target.name] : event.target.value}
        });
    }

    function handlesubmit(event){
        event.preventDefault();
        axios.post(`${API_URL}/login`,user,{withCredentials:true}).
        then((res)=>{
            toast.success(res.data.message);
            setIsLoggedIn(true);
            navigate(from);
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
                <h2>Welcome back</h2>
                <p>
                    Log in to continue exploring student homes.
                </p>
            </div>
            {/* Form */}
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
                            placeholder="Enter your username"
                            value={user.username}
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <div className="invalid-feedback">
                        Please enter your username
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
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={handlechange}
                            required
                        />
                    </div>

                    <div className="invalid-feedback">
                        Please enter your password
                    </div>
                </div>
                {/* Login Button */}
                <button className="login-btn">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    Log in
                </button>
            </form>

            {/* Bottom */}
            <div className="login-footer">
                <p>
                    New to CampusNest?
                    <Link to="/signup"> Create an account</Link>
                </p>
            </div>
        </div>
    </div>
);
};