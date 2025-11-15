import jwt from "jsonwebtoken"
import modelAccount from "../models/model.account.js"

export default async function auth(req,res,next) {
    try {
        let token = req.cookies.token
        if(!token){return res.status(401).json({msg: "Unauthorized. No token provided"})}
        let decoded = jwt.verify(token,process.env.JWT_KEY)
        if(!decoded){return res.status(401).json({msg: "Invalid token provided"})}
        let user = await modelAccount.findById(decoded).select("-password")
        if(!user){return res.status(401).json({msg: "User not found"})}

        req.user = user
        next()

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Something went wrong. Please try again later"})
    }
}