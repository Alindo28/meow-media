import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import accountModel from "../models/model.account.js"
import createJWT from "../utils/createJWT.js"
import cloudinary from "../connections/connection.cloudinary.js"

export async function logIn(req,res) {
    let {email,password} = req.body
    try {
        if(!email || !password){
            return res.status(400).json({msg: "All credentials must be provided."})
        }

        if(password.length < 6){return res.status(400).json({msg: "Password must be at least 6 characters long"})}

        let user = await accountModel.findOne({email: email})
        if(!user){return res.status(400).json({msg: "email does not exist"})}

        let passCheck = await bcrypt.compare(password,user.password)

        if(passCheck){
            let token = createJWT(user._id,res)
            return res.status(200).json({user})
        } else{
            return res.status(400).json({msg: "incorrect password"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}

export async function signUp(req,res) {
    let {name,email,password,avatar} = req.body
    try {
        if(!name || !email || !password){
            return res.status(400).json({msg: "All credentials must be provided."})
        }

        let user = await accountModel.findOne({email: email})
        if(user){return res.status(400).json({msg: "email already exists"})}

        if(password.length < 6){return res.status(400).json({msg: "Password must be at least 6 characters long"})}

        let encryptedPass = await bcrypt.hash(password,12)

        let urlForAvatar = "";
        if(avatar){let uploaded = await cloudinary.uploader.upload(avatar)
             urlForAvatar = uploaded.secure_url}

        let newUser = new accountModel({name,email,password:encryptedPass,avatar:urlForAvatar})

        if(newUser){
            let token = createJWT(newUser._id,res)
            await newUser.save()
            return res.status(200).json({user: newUser})
        } else{
            return res.status(400).json({msg: "invalid data provided"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}

export async function logOut(req,res) {
    try {
        res.cookie("token","",{maxAge:0})
        res.status(200).json({msg: "logout"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}

export async function updateProfile(req,res) {
    try {
        res.status(200).json({msg: "update"})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}

export async function checkAuth(req,res) {
    try {
        res.status(200).json({user: req.user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}