import axios from "axios"

let reqDome = axios.create({baseURL: import.meta.env.MODE ===  "development" ? "http://localhost:5000/api/v1/account" : "/api/v1/account", withCredentials:true})

export async function login(data) {
    let res = await reqDome.post("/log-in",data)
    console.log(res)
    return res
}

export async function signup(data) {
    let res = await reqDome.post("/sign-up",data)
    console.log(res)
    return res

}

export async function logout() {
    let res = await reqDome.post("/log-out")
    console.log(res)
    return res
}

export async function updateProfile() {
    let res = await reqDome.post("/update-profile")
    console.log(res)
    return res
}

export async function checkAuth() {
        let res = await reqDome.get("/check-auth")
        console.log(res)
        return res  
}