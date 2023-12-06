import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try { 
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 360000,
                }
            )
        } else if (emailType === "VERIFY") {

            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 360000,
                }
            )
        } 
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            }

        }) 
        const emailOptions = {
            from: "asurendrakumarpatel@gmail.com",
            to: email,
            subject: emailType === "RESET" ? "Reset your password" : "Verify your email",
            html: `<p>Click <a href =${process.env.DOMAIN}/${emailType === "RESET" ? "forgotpassword" : "verifyemail"}?token=${hashedToken}>here</a>
            to ${emailType === "RESET" ? "Reset your password" : "Verify email"}
            </p>`

        }
        const mailResponse = await transporter.sendMail(emailOptions);
       
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.messsage);
    }
}
