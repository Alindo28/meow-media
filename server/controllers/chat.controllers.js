import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import modelAccount from "../models/model.account.js"
import messageModel from "../models/model.message.js"
import createJWT from "../utils/createJWT.js"
import cloudinary from "../connections/connection.cloudinary.js"

export async function getUsers(req, res) {
  let userId = req.user._id
  try {
    let users = await modelAccount.find().select("-password"); // posts is now an array
    users = users.filter(item => {
      return item._id.toString() !== userId.toString()
    })

    if (!users) {
      return res.status(400).json({ msg: "Failed to get data from API. Try again later" });
    }

    res.status(200).json({ users});
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function getMessages(req,res) {
    
    try {
        let receiverId = req.params.receiverId
        let loggedUserId = req.user._id

        let messages = await messageModel.find({$or:
            [{sender: loggedUserId, receiver: receiverId}, {sender: receiverId, receiver: loggedUserId}]
        })

        res.status(200).json({messages})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Something went wrong"})
    }
}

export async function sendMessage(req,res) {
    
    try {
        let {text, image, receiverId} = req.body.data
        let loggedUserId = req.user._id
        let imageUrl;
        if(image){
          let upldUrl = await cloudinary.uploader.upload(image)
          imageUrl = upldUrl.secure_url
        }

        let newMessage = new messageModel({
          text: text,
          image: imageUrl,
          receiver: receiverId,
          sender: loggedUserId
        })
        await newMessage.save()

        res.status(200).json({newMessage})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Something went wrong"})
    }
}