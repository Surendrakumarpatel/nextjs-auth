"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
 
export default function ForgotPassword() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [user, setUser] = useState({
        newPassword: "",
        confirmPassword: "",
    })
    const [disabled, setDisabled] = useState(true);
    const [loading, śetLoading] = useState(false);
  
    const onSubmit = async () => {
        try {
            śetLoading(true);
            const res = await axios.post("/api/users/forgotpassword", { user, token });
            toast.success(res.data.message); 
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            śetLoading(false);
        }
    }
    useEffect(() => {
        if (user.newPassword.length && user.confirmPassword.length) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
        const tokenUrl = window.location.search.split("=")[1];
        setToken(tokenUrl);
    }, [user])

    return (
        <div className="flex bg-[#669bbc] min-h-screen justify-center items-center">
            <div className="bg-white p-10 rounded-md shadow-sm shadow-black">
                <h1 className="font-bold">{`${loading ? "loading..." : "RESET PASSWORD"}`}</h1>
                <div className="flex flex-col my-4">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={user.newPassword}
                        onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                        className="border-2 border-gray-500 outline-none rounded-md px-2 py-1" />
                </div>
                <div className="flex flex-col my-4">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={user.confirmPassword}
                        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                        className="border-2 border-gray-500 outline-none rounded-md px-2 py-1" />
                </div>
                <button onClick={onSubmit} className={`${disabled ? "bg-[#e3e3e3] cursor-not-allowed" : "bg-[#ff698f]"} w-full text-white font-medium rounded-md py-1 my-2`}>SUBMIT</button>
            </div>
        </div>
    )
}