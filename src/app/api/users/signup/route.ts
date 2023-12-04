import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
         
        //checks is user already exist or not
        let user = await User.findOne({ email });
         
        if (user) {
            return NextResponse.json({ message: "User already exist!"}, { status: 200 })
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        // Verifying user
        
        await sendEmail({ email, emailType: "VERIFY", userId: user._id });
 
        return NextResponse.json({
            message: "Account created successfully!",
            success: true,
        }, { status: 200 })

    } catch (error: any) { 
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
