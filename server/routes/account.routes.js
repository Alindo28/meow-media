import express from "express"
import { logIn,signUp,logOut,updateProfile,checkAuth } from "../controllers/account.controllers.js"
import auth from "../middlewares/auth.js"

let router = express.Router()
router.route("/log-in").post(logIn)
router.route("/sign-up").post(signUp)
router.route("/log-out").post(logOut)
router.route("/update-profile").patch(auth, updateProfile)
router.route("/check-auth").get(auth, checkAuth)

export default router;