import {create} from "zustand"
import {getPosts,uploadPost,updatePost,deletePost,getPostsById} from "../request_functions/requests.post.js"
import toast from "react-hot-toast"

let usePostStore = create((set,get) => ({
    allPosts: [],
    isPosting: false,
    isGettingPosts: false,
    isUpdatingPost: false,

    getPostsStore: async()=> {
        set({isGettingPosts: true})
        try {
            let res = await getPosts()
            set({allPosts: res.data.posts})
        } catch (error) {
            console.log(error)
        } finally{
        set({isGettingPosts: false})}
    },

    uploadPostStore: async(data)=> {
        console.log(data)
        set({isPosting: true})
        try {
            let res = await uploadPost(data)
            let cAllPosts = get().allPosts
            set({allPosts: [res.data.post, ...cAllPosts]})
            toast.success("Post successful")
        } catch (error) {
            console.log(error)
            toast.error("Post failed")
        } finally{
        set({isPosting: false})}
    },

    updatePostStore: async (updateType, data) => {
    set({ isUpdatingPost: true });

        try {
        const res = await updatePost(updateType, data);
        const { allPosts } = get();

        // Handle ADD COMMENT
        if(updateType != "like"){
            const updatedPost = res.data.updpost;

        // Replace the old post with the new one that includes the new comment
        set({
            allPosts: allPosts.map(post =>
            post._id === updatedPost._id ? updatedPost : post
            ),
        });

        // Handle DELETE COMMENT
        if (updateType === "delcomment") {
        toast.success("Successfully removed comment");
        }

        if(updateType == "thepost"){
            toast.success("Successfully updated post");
        }
        }
        

    } catch (error) {
        console.error(error);
    } finally {
        set({ isUpdatingPost: false });
    }
},


    deletePostStore: async(data)=> {
        set({isUpdatingPost: true})
        let {allPosts} = get()
        try {
            let res = await deletePost(data)

            set({
                allPosts: allPosts.filter(item => {
                    return item._id != data.id
                })
            })

            toast.success("Successfully deleted the post")
        } catch (error) {
            console.log(error)
            toast.error("Could not delete the post")
        } finally{
        set({isPosting: false})}
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
    },

    getPostsByIdStore: async()=> {
        set({isGettingPosts: true})
        try {
            let res = await getPosts()
            set({allPosts: res.data.posts})
        } catch (error) {
            console.log(error)
        } finally{
        set({isGettingPosts: false})}
    },
}))

export default usePostStore