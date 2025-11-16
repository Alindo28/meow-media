import jwt from "jsonwebtoken"
import modelAccount from "../models/model.account.js"

export default async function auth(req,res,next) {
    try {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({msg: "Unauthorized. No token provided"});

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        if(!decoded || !decoded.id)
            return res.status(401).json({msg: "Invalid token provided"});

        const user = await modelAccount.findById(decoded.id).select("-password");
        if(!user) return res.status(401).json({msg: "User not found"});

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Something went wrong. Please try again later"});
    }
}
