import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcryptjs";


connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token, user: { newPassword }, user: { confirmPassword } } = reqBody;
        if (newPassword !== confirmPassword) {
            return NextResponse.json({ message: "password didn't match" }, { status: 200 });
        }
        const data = { token, newPassword, confirmPassword };
       
        let user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });
       
        if (!user) {
            return NextResponse.json({ message: "User not found!" }, { status: 200 });
        }
        const genSalt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(newPassword, genSalt);
        user.password = hasedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "password has been reset successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
