import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBootstrapValidation from "../hooks/useBootstrapValidation";
import toast from 'react-hot-toast';

export default function Signup(){

    const[user , setUser] = useState({
        username : "",
        email : "",
        password : ""
    });

    const navigate = useNavigate();

    function handlechange(event){
        setUser((prevUser)=>{
            return {...prevUser, [event.target.name] : event.target.value}
        });
    }

    function handlesubmit(event){
        event.preventDefault();
        axios.post("http://localhost:8080/signup",user).
        then((res)=>{
            toast.success(res.data.message);
            navigate('/listings');
        }).catch((err)=>{
            toast.error(err.response.data);
            console.log(err);
        })
    };

    useBootstrapValidation();

    return(
        <div className="row mt-3">
            <h1 className="col-6 offset-3">SignUp on WanderStay</h1>
            <div className="col-6 offset-3">
                <form onSubmit={handlesubmit} noValidate className="needs-validation">
                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            name = "username"
                            id = "username"
                            type="text"
                            className="form-control"
                            value={user.username}
                            onChange={handlechange}
                            required
                        />
                    <div className="valid-feedback">Looks good!</div>
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                         <label htmlFor="email" className="form-label">Email</label>
                         <input
                            name = "email"
                            id = "email"
                            type="email"
                            className="form-control"
                            value={user.email}
                            onChange={handlechange}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                         <label htmlFor="password" className="form-label">Password</label>
                         <input
                            name = "password"
                            id = "password"
                            type="password"
                            className="form-control"
                            value={user.password}
                            onChange={handlechange}
                            required
                        />
                    </div>
                    <button className="btn btn-success">SignUp</button>
                </form>
            </div>
        </div>
    )
};