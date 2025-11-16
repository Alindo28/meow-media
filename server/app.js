import express from "express"
import { config } from "dotenv"
config()
import cors from "cors"
import fs from "fs";
import accRouter from "./routes/account.routes.js"
import postRouter from "./routes/post.routes.js"
import chatRouter from "./routes/chat.routes.js"
import connectDB from "./connections/connection.mongodb.js"
import cookieParser from "cookie-parser"
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let PORT = process.env.PORT || 5000


let app = express()

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("JWT_KEY:", process.env.JWT_KEY);
console.log("MONGO_URI:", process.env.MONGO_URI);
const clientBuildPath = path.join(__dirname, "../client/dist");


app.use(express.json({ limit: '10mb' }));          // increase JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true })); // for form-data

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://meow-media.onrender.com" // production
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser())

app.use("/api/v1/account", accRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/chat", chatRouter)

if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  // Only serve index.html for valid routes
  app.get(/^(?!\/api).*/, (req, res) => {
    const indexPath = path.join(clientBuildPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("index.html not found");
    }
  });
} else {
  console.warn("React build folder not found, skipping static serving.");
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




// import express from "express";
// import { config } from "dotenv"
// config()
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const app = express();

// console.log(process.env.NODE_ENV)

// const clientBuildPath = path.join(__dirname, "../client/dist");

// if (fs.existsSync(clientBuildPath)) {
//   app.use(express.static(clientBuildPath));

//   // Only serve index.html for valid routes
//   app.get(/^(?!\/api).*/, (req, res) => {
//     const indexPath = path.join(clientBuildPath, "index.html");
//     if (fs.existsSync(indexPath)) {
//       res.sendFile(indexPath);
//     } else {
//       res.status(404).send("index.html not found");
//     }
//   });
// } else {
//   console.warn("React build folder not found, skipping static serving.");
// }

// app.listen(5000, () => console.log("listening"));
