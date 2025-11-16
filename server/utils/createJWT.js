import jwt from "jsonwebtoken";

export default function createJWT(userId, res) {
    console.log(userId);
    let token = jwt.sign({ id: userId.toString() }, process.env.JWT_KEY, { expiresIn: '7d' });

    res.cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    });

    return token;
}
