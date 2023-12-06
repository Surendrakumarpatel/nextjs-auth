"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {

    const [token, setToken] = useState<String>("");
    const [verified, setVerified] = useState<Boolean>(false);

    const verifyEmail = async () =>{
        try {
            const res = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        } catch (error:any) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        const tokenURL = window.location.search.split("=")[1];
        setToken(tokenURL);
    },[])

    useEffect(()=>{
        if(token.length > 0){
            verifyEmail();
        }
    },[token])

    return(
        <div>
            <h1>Verify your email before access to services</h1>
            <p className="bg-green-200 px-2 py-1 rounded-md">{token}</p>
            <button className="bg-gray-200 px-2 py-1 rounded-sm shadow-lg">Verify Email</button>
        </div>
    )
    
}