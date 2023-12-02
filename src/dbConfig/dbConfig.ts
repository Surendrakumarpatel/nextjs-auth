import mongoose from "mongoose";

export async function connect() {
    try {
        // !--> '!' means I will be always available (bcz of we are using typescript)
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log("MongoDB connected successfully!");
        })
        connection.on('error', (err)=>{
            console.log("MongoDB connection error: ", err); 
            process.exit(); 
        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}