import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
connect();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        console.log(reqBody);
        const { token } = reqBody;
        const user = await User.findOne(
            {
                verifyToken: token,
                verifyTokenExpiry: { $gt: Date.now() }
            }
        )
        if(!user){
            return NextResponse.json({message:"User not found"}, {status:400});
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message:"Email verify successfull",
            success:true
        })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
