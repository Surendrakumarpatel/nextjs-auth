"use client"
import Link from "next/link";
import { useState } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const onSubmit = () => {
        console.log(user);
    }

    return (
        <div className="flex bg-[#669bbc] min-h-screen justify-center items-center">
            <div className="bg-white p-10 rounded-md shadow-sm shadow-black">
                <h1 className="font-bold">LOGIN</h1>
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
                <button onClick={onSubmit} className="bg-[#ff698f] w-full text-white font-medium rounded-md py-1 my-2">LOGIN</button>
                <p className="text-center">OR</p>
                <div className="flex my-3 mx-auto w-[50%] items-center justify-between">
                    <FaGoogle className="cursor-pointer" size="24px" color="#c1121f" />
                    <FaFacebook className="cursor-pointer" size="24px" color="#669bbc" />
                    <FaLinkedin className="cursor-pointer" size="24px" color="#3a86ff" />
                </div>

                <p>Don't have account? <Link href="/signup" className="font-bold">SIGNUP</Link></p>


            </div>
        </div>
    )
}
