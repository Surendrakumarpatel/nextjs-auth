import Link from "next/link";

export default function notFound() {
    return (
        <div>
            <h1>Not Found</h1>
            <p>Couldn't found requested resource.</p>
            <button className="border-none bg-green-400 rounded-md text-white px-4 py-1"><Link href={"/"}>Return Home</Link></button>
        </div>
    )
}