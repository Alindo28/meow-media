import {create} from "zustand"
import { checkAuth,signup,login,logout,updateProfile } from "../request_functions/requests.account.js"
import toast from "react-hot-toast"

let useAccountStore = create((set,get) => ({
    authUser: null,
    isLoging: false,
    isSigning: false,
    isLogingOut: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuthStore: async()=> {
        try {
            let res = await checkAuth()
            set({authUser:res.data.user})
        } catch (error) {
            console.log(error)
            set({authUser:null})
        } finally{
            set({isCheckingAuth: false})
        }
    },

    signUpStore: async(data)=> {
        set({isSigning: true})
        try {
            let res = await signup(data)
            console.log(res.data.user)
            set({authUser:res.data.user})
            toast.success("Successfully created account")
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.msg)
        } finally{
            set({isSigning: false})
        }
    },

    logInStore: async(data)=> {
        set({isLoging: true})
        try {
            let res = await login(data)
            console.log(res.data.user)
            set({authUser:res.data.user})
            toast.success("Successfully logged in")
        } catch (error) {
            console.log(error.response.data)
            toast.error(error.response.data.msg)
        } finally{
            set({isLoging: false})
        }
    },

    logOutStore: async(data)=> {
        set({isLogingOut: true})
        try {
            let res = await logout()
            set({authUser:null})
            toast.success("Successfully logged out")
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally{
            set({isLogingOut: false})
        }
    }
}))

export default useAccountStore