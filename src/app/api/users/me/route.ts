import { getDataFromToken } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
 
export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password -isAdmin");
        if (!user)
            return NextResponse.json({ message: "User not found" }, { status: 400 })

        return NextResponse.json({
            success: true,
            user
        })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 })
    }
}
 