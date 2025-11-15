import express from "express"
import { getUsers, getMessages, sendMessage} from "../controllers/chat.controllers.js"
import auth from "../middlewares/auth.js"

let router = express.Router()
router.route("/").get(auth, getUsers)
router.route("/messages/:receiverId").get(auth,getMessages)
router.route("/messages").post(auth,sendMessage)

export default router;