import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log(reqBody);
        const { email, password } = reqBody;
        const user = await User.findOne({ email });
        if (!user)
            return NextResponse.json({ message: "User doesn't exist!" }, { status: 400 });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch)
            return NextResponse.json({ message: "Invalid password" }, { status: 400 });

        const tokenData = { id: user._id };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });


        const response = NextResponse.json({
            message: `Welcome back ${user.username}`,
            success: true
        }, { status: 200 });

        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
} 