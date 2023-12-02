import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log("Our Body: ",reqBody);
        const { username, email, password } = reqBody;
        // validation
        if (!username || !email || !password) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 })
        }
        //checks is user already exist or not
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "User already exist!" }, { status: 400 })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        await User.create({
            username,
            email,
            password: hashedPassword
        }) 
        return NextResponse.json({
            message: "Account created successfully!",
            success: true, 
        },{status:200})

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
