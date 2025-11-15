import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import postModel from "../models/model.post.js"
import createJWT from "../utils/createJWT.js"
import cloudinary from "../connections/connection.cloudinary.js"

export async function getPosts(req, res) {
  try {
    let posts = await postModel.find(); // posts is now an array
    if (!posts) {
      return res.status(400).json({ msg: "Failed to get data from API. Try again later" });
    }

    // Sort newest first
    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.status(200).json({ posts: sortedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
}


export async function uploadPost(req,res) {
    let creator = req.user._id
    let {name, avatar, caption, image} = req.body
    console.log(name,avatar)
    try {
        if(!caption && !image){
            return res.status(400).json({msg: "Something must be provided."})
        }

        if(caption.length > 1000){return res.status(400).json({msg: "Cannot exceed 1000 letters"})}

        let url;
        if(image){
            let upload = await cloudinary.uploader.upload(image)
            url = upload.secure_url
        }

        let post = new postModel({creator, creatorName:name, creatorAvatar:avatar, caption, image: url})

        if(post){
            await post.save()
            return res.status(200).json({post})
        } else{
            return res.status(400).json({msg: "Failed to post"})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}

export async function deletePost(req,res) {
    try {
        let id = req.body.id
        if(!id){return res.status(400).json({msg: 'No id provided'})}

        await postModel.findByIdAndDelete(id)
        res.status(200).json({msg: "Successfully deleted post"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}

export async function updatePost(req,res) {
    let user = req.user
    try {
        console.log(req.body)
        let {updateType,data} = req.body

        if(updateType === "like"){
            let [postId,likeStatus] = data

            if (likeStatus) {
            // Add userId to likes array
            await postModel.findByIdAndUpdate(postId, { $addToSet: { likes: user._id } });
            } else {
                // Remove userId from likes array
                await postModel.findByIdAndUpdate(postId, { $pull: { likes: user._id } });
            }
        }

        if(updateType === "comment"){
            let [postId,comment] = data
            console.log(postId,comment)


            // Add userId to comments array
            let updpost = await postModel.findByIdAndUpdate(postId, { $push: { comments: {
                creator: user._id,
                creatorName: user.name,
                creatorAvatar: user.avatar,
                text: comment
            } } }, {new: true});

            res.status(200).json({updpost})
        }

        if (updateType === "delcomment") {
            let [postId, commentId] = data;

            let updpost = await postModel.findOneAndUpdate(
                { _id: postId },
                { $pull: { comments: { _id: commentId, creator: user._id } } },
                { new: true }
            );

            res.status(200).json({ updpost });
        }

        if (updateType === "thepost") {
            let {postId, newData} = data;
            console.log(data)

            let updpost = await postModel.findOneAndUpdate(
                { _id: postId },
                { $set: newData },
                { new: true }
            );

            res.status(200).json({ updpost });
        }


        res.status(200).json({msg: "update " + updateType})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}


export async function getPostsById(req,res) {
    try {
        res.status(200).json({user: req.user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    }
}