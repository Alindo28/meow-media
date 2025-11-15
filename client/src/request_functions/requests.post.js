import axios from "axios"

let reqDome = axios.create({baseURL: import.meta.env.MODE ===  "development" ? "http://localhost:5000/api/v1/posts" : "/api/v1/posts", withCredentials:true})

export async function getPosts(data) {
    let res = await reqDome.get("/",data)
    console.log(res)
    return res
}

export async function uploadPost(data) {
    console.log(data)
    let res = await reqDome.post("/",data)
    console.log(res)
    return res
}

export async function updatePost(updateType, data) {
    console.log(data)
    let res = await reqDome.patch(`/`,{updateType, data})
    console.log(res)
    return res
}

export async function deletePost(data) {
    let res = await reqDome.delete(`/`,{data})
    console.log(res)
    return res
}

export async function getPostsById(postId) {
    let res = await reqDome.get(`/${postId}`)
    console.log(res)
    return res
}