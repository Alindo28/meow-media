import express from "express"
import { config } from "dotenv"
import cors from "cors"
import accRouter from "./routes/account.routes.js"
import postRouter from "./routes/post.routes.js"
import chatRouter from "./routes/chat.routes.js"
import connectDB from "./connections/connection.mongodb.js"
import cookieParser from "cookie-parser"
import path from "path";

let PORT = process.env.PORT || 5000
let __dirname = path.resolve()

let app = express()
config()

app.use(express.json({ limit: '10mb' }));          // increase JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // for form-data

app.use(cors({
  origin: "http://localhost:5173", // your React app
  credentials: true // ✅ allow cookies
}))

app.use(cookieParser())

app.use("/api/v1/account", accRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/chat", chatRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*",(req,res) => {
        res.sendFile(path.join(__dirname, "../client","dist","index.html"))
    })
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