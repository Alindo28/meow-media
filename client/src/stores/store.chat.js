import { create } from "zustand";
import toast from "react-hot-toast";
import { getMessagesR, getUsersR, sendMessageR } from "../request_functions/requests.chat";

let useChatStore = create((set, get) => ({

    users : [],
    messages : [],
    selectedUser : null,
    isLoadingUsers : false,
    isLoadingMessages: false,

    getUsers : async() => {
        set({isLoadingUsers: true})
        try {
            let users = await getUsersR()
            set({users : users.data.users})
        } catch (error) {
            toast.error(error)
        }
        finally{
            set({isLoadingUsers: false})
        }
        
    },

    getMessages : async(data) => {
        set({isLoadingMessages: true})
        try {
            let messages = await getMessagesR(data)
            set({messages : messages.data.messages})
            console.log(messages.data)
        } catch (error) {
            toast.error(error)
        }
        finally{
            set({isLoadingMessages: false})
        }
        
    },

    sendMessage: async(data) => {
        try {
            if(data.text.length > 20){
                throw new Error("Failed to send message [exceeded 200 letter limit]")
            }
            let message = await sendMessageR(data)
            let allMessages = get().messages
            set({messages: [...allMessages, message.data.newMessage]})
        } catch (error) {
            toast.error(error.message)
            return 1
        }
    },

    setSelectedUser : (selectedUser) => {
        set({selectedUser});
    }


})
)

export default useChatStore