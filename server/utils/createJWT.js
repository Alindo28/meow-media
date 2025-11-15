import jwt from "jsonwebtoken"

export default function createJWT(userId,res){
    console.log(userId)
    let token = jwt.sign(userId.toString(),process.env.JWT_KEY)
    res.cookie("token",token,{
        maxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "production"
    })

    return token
}