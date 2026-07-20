import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({children}){
    const[isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/current-user",{withCredentials:true}).
        then(()=>{
            setIsLoggedIn(true);
        }).catch(()=>{
            setIsLoggedIn(false);
        })
    },[]);

    return(
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}

