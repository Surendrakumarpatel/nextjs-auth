"use client";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
  const getProfile = () => {
    router.push("/profile");
  }

  return (
    <main className="flex bg-[#669bbc] min-h-screen py-10 ">
      <div className='flex md:justify-between justify-end bg-white w-[80%] h-[10%] mx-auto p-4 rounded-lg shadow-lg'>
        <div className='flex-none md:block hidden'>
          <h1 className='font-bold text-lg'>NextAuth</h1>
        </div>
        <div className='flex flex-none justify-between items-center'>
          <div className=' md:block hidden'>
            <ul className='flex font-medium flex-1 w-72 mx-20 items-center justify-between'>
              <li className='cursor-pointer'>Home</li>
              <li className='cursor-pointer'>About</li>
              <li className='cursor-pointer'>Courses</li>
              <li className='cursor-pointer'>Contact</li>
            </ul>
          </div>
          <div className='flex'>
            <div onClick={getProfile} className='flex items-center'>
              <FaArrowAltCircleDown size={"20px"} className="cursor-pointer" />
              <h1 className='md:mr-10 ml-2 mr-2 font-bold cursor-pointer'>Patel</h1>
            </div>
            <div className='mx-auto w-full'>
              <button onClick={logoutHandler} className='bg-[#ff698f] hover:bg-[#ff5c84] px-4 py-1 rounded-full text-white border-none outline-none'>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
