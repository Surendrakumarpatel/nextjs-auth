"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [disabled, setDisabled] = useState(true);
    const [loading, śetLoading] = useState(false);

    const onSubmit = async () => {
        if (disabled) {
            toast.error("button is disabled");
        } else {
            try {
                śetLoading(true);
                const res = await axios.post("/api/users/signup", user);
                router.push("/login");
                router.refresh();
                toast.success(res.data.message);
            } catch (error: any) {
                toast.error(error.response.data.message);
            } finally {
                śetLoading(false);
            }
        }
    }
    useEffect(() => {
        if (user.username.length > 0 && user.email.length && user.password.length) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [user])


    return (
        <div className="flex bg-[#669bbc] min-h-screen justify-center items-center">
            <div className="bg-white p-10 rounded-md shadow-sm shadow-black">
                <h1 className="font-bold">{`${loading ? "loading..." : "SIGNUP"} `}</h1>
                <div className="flex flex-col my-4">
                    <label>Username</label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="border-2 border-gray-500 outline-none rounded-md px-2 py-1" />
                </div>
                <div className="flex flex-col my-4">
                    <label>Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="border-2 border-gray-500 outline-none rounded-md px-2 py-1" />
                </div>
                <div className="flex flex-col my-4">
                    <label>Password</label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="border-2 border-gray-500 outline-none rounded-md px-2 py-1" />
                </div>
                <button onClick={onSubmit} className={`${disabled ? "bg-[#e3e3e3] cursor-not-allowed" : "bg-[#ff698f]"} w-full text-white font-medium rounded-md py-1 my-2`}>SIGNUP</button>
                <p className="text-center">OR</p>
                <div className="flex my-3 mx-auto w-[50%] items-center justify-between">
                    <FaGoogle size="24px" color="#c1121f" />
                    <FaFacebook size="24px" color="#669bbc" />
                    <FaLinkedin size="24px" color="#3a86ff" />
                </div>

                <p>Already have an account? <Link href="/login" className="font-bold">LOGIN</Link></p>


            </div>
        </div>
    )
}