import mongoose from "mongoose";

let accSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: {type: Date, default: new Date()},
    avatar: {type:String, default:""}
})

export default mongoose.model("users",accSchema)