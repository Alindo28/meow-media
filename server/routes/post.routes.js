import express from "express"
import { getPosts,uploadPost,deletePost,updatePost,getPostsById } from "../controllers/post.controllers.js"
import auth from "../middlewares/auth.js"

let router = express.Router()
router.route("/").get(auth, getPosts).post(auth, uploadPost)
router.route("/").get(auth, getPostsById).patch(auth, updatePost).delete(auth, deletePost)

export default router;