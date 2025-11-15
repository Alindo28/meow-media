import mongoose from "mongoose";
import commentSchema from "./model.comment.js";

let postSchema = new mongoose.Schema({
    creator: { type: String, required: true },
    creatorName: { type: String, required: true },
    creatorAvatar: { type: String, required: true },
    caption: { type: String },
    image: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    likes: { type: [String] },
    comments: {type: [commentSchema], default:[]}
});

export default mongoose.model("posts", postSchema);
