import mongoose from "mongoose";

export default async function connectDB(uri) {
    try {
        let connection = await mongoose.connect(uri)
        console.log("Successfully connected to database...")
    } catch (error) {
        console.log(error)
    }
}