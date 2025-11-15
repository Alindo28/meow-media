import axios from "axios"

let reqDome = axios.create({baseURL: import.meta.env.MODE ===  "development" ? "http://localhost:5000/api/v1/chat" : "/api/v1/chat", withCredentials:true})

export async function getUsersR() {
    let res = await reqDome.get("/")
    console.log(res)
    return res
}

export async function getMessagesR(data) {
    let res = await reqDome.get(`/messages/${data}`)
    console.log(res)
    return res
}

export async function sendMessageR(data) {
    console.log(data)
    let res = await reqDome.post("/messages",{data})
    console.log(res)
    return res
}