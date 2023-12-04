import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
 
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if(emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 360000,
                }
            )
        }else if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken:hashedToken,
                    verifyTokenExpiry:Date.now()+360000,
                }
            )
        }
        
 
    } catch (error: any) {
        throw new Error(error.messsage);
    }
}
 