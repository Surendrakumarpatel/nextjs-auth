import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username"],
        unique:true,
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date

});
// here mongoose.models.users --> if already created a models then simply use it, if not then create it

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;