"use client"
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; 

export default function UserProfile() { 
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    
    useEffect(()=>{
        const getMyProfile = async () =>{
            try {
                const res = await axios.get("/api/users/me");
                console.log(res); 
                setUser(res.data.user);
            } catch (error:any) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        getMyProfile();
    },[])
     
    return (
        <div>
            <h1>Normal Profile Page</h1> 
            <p>Email: <span className="font-bold ml-2">{user && user.email}</span></p>
            <p>Username: <span className="font-bold ml-2">{user && user.username}</span></p>
        </div>
    )
}