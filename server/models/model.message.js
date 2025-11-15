import mongoose from "mongoose";

let messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    text: { type: String, maxlength: 200 },
    image: { type: String, default: "" },
}, {timestamps:true});

export default mongoose.model("messages", messageSchema);
