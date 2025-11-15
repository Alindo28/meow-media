import React from 'react'
import usePostStore from '../stores/store.post'
import { useEffect, useState } from 'react'
import { PostCard } from '../components/skeletons/PostCard'
import MakePost from '../components/MakePost'
import LoadingLogo from '../components/loadingLogo'
import BackToTop from "../components/BackToTop";

const HomePage = () => {
  let {allPosts, getPostsStore, isGettingPosts} = usePostStore()
  let [makingPost,setMakingPost] = useState()

  useEffect(() => {getPostsStore()},[getPostsStore])

  function toggleMakingPost(params) {
    setMakingPost(!makingPost)
  }

  if (isGettingPosts) {
    return (
      <LoadingLogo />
    );
  }


  return (
    <div className='flex w-full min-h-screen relative mb-[100px]'>

      <div className='flex flex-col w-[70%] h-full '>

        <div className='p-4 border-b-2 border-current/50 text-2xl w-full text-center'>Meowments Around You</div>

       <div className='flex justify-center mb-5'><button onClick={toggleMakingPost} className={`btn rounded-t-none ${makingPost? 'bg-error/50' : 'bg-primary/50'} text-white/90 rounded-[5px] border-none max-w-[300px] min-w-[150px]`}>{!makingPost? "Make a Post" : "Close"}</button></div> 

      {makingPost? <MakePost></MakePost> :

      <div className='w-full flex flex-col items-center gap-y-10'>{allPosts.map(item => {
         return (<div key={item._id} className='w-full max-w-[400px]'>
            <PostCard data={{...item,setMakingPost}} />
          </div>)
         })}
         </div>}

      </div>
      {/*  */}

      <div className='top-16 fixed right-0 rounded-0 flex items-center w-[30%] h-[100%] overflow-hidden bg-gray-600/10 [box-shadow:-4px_0_2px_-2px_rgba(66,66,66,0.225)]'>
      <div className='relative w-full h-12 px-[6px] py-[4px] bg-red-700/20'>
      <div className='absolute top-0.5 text-3xl text-nowrap animate-[leftToRight_5s_linear_2s_infinite]'>
        Under Development...</div>
        </div>
        </div>

         <div className="z-99"><BackToTop></BackToTop></div>
    </div>
  )
}

export default HomePage