import express from "express"
import { config } from "dotenv"
import cors from "cors"
import accRouter from "./routes/account.routes.js"
import postRouter from "./routes/post.routes.js"
import chatRouter from "./routes/chat.routes.js"
import connectDB from "./connections/connection.mongodb.js"
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config()

let PORT = process.env.PORT || 5000


let app = express()


app.use(express.json({ limit: '10mb' }));          // increase JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // for form-data

app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "https://meow-media.onrender.com" : "http://localhost:5173",
  credentials: true
}))

app.use(cookieParser())

app.use("/api/v1/account", accRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/chat", chatRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
}

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, () => {console.log(`Server is listening to port ${PORT}`)})
    } catch (error) {
        console.log(error)
    }
}
start()