import mongoose from "mongoose";

let commentSchema = new mongoose.Schema({
    creator: { type: String, required: true },
    creatorName: { type: String, required: true },
    creatorAvatar: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: [String] },
});

export default commentSchema