import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api";

const AuthContext = createContext();

export default function AuthProvider({children}){
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[user,setUser] = useState(null);

    useEffect(()=>{
        axios.get(`${API_URL}/current-user`,{withCredentials:true}).
        then((res)=>{
            setIsLoggedIn(true);
            setUser(res.data);
        }).catch(()=>{
            setIsLoggedIn(false);
            setUser(null);
        })
    },[]);

    return(
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,user,setUser}}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}

