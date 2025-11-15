import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import usePostStore from "../../stores/store.post";
import useAccountStore from "../../stores/store.account";
import CommentCard from "./CommentCard";
import { useNavigate } from 'react-router-dom'

export const PostCard = (props) => {
  const data = props.data;
  let {authUser} = useAccountStore()

  const [liked, setLiked] = useState(data.likes.includes(authUser._id));
  const firstClickDone = useRef(false);
  const timeoutRef = useRef(null);
  let {updatePostStore,deletePostStore,isUpdatingPost} = usePostStore()

  let [commenting, setCommenting] = useState(false)
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  
  function handleInput(e) {
    const ta = textareaRef.current;
    ta.style.height = "auto"; // reset height
    ta.style.height = ta.scrollHeight + "px"; // expand to fit content
    setComment(e.target.value);
  }

  const likedFunc = () => setLiked((prev) => !prev);

  useEffect(() => {
    if (!firstClickDone.current && !liked) return; // skip initial render

    // clear any previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // determine debounce time
    const delay = firstClickDone.current ? 3000 : 1;

    timeoutRef.current = setTimeout(() => {
      updatePostStore("like", [data._id, liked])
      console.log("Send like to server:", liked);

      firstClickDone.current = true;
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [liked]);

  function submitComment(e){
      e.preventDefault()
      updatePostStore("comment",[data._id, comment])
      setComment("")
  }

  function deletePost(e){
      e.preventDefault()
      setMenuOpen(false)
      deletePostStore({id: data._id})
  }

  function editPost(e){
      e.preventDefault()
      setMenuOpen(false)
      console.log(data)
      localStorage.setItem("editPost",JSON.stringify({caption: data.caption, image: data.image, postId:data._id}))
      data.setMakingPost(true)
  }

  return (
    <div className="mt-[30px] flex flex-col min-w-[200px] max-w-[400px] bg-secondary/20 rounded-[5px] overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-3 bg-base-200 relative">
        <div>
          <img className="object-contain h-[40px]" src={data.creatorAvatar} alt="" />
        </div>
        <div className="flex-1 text-[18px]">{data.creatorName}</div>
        <div>{moment(data.createdAt).fromNow()}</div>
        
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className=" rounded-full text-[25px] flex items-center mr-[-5px]"
          >
            <i className="icon-[pepicons-pop--dots-y] text-current/60 hover:bg-current/40"></i>
          </button>

          {menuOpen && (
          <>
            {/* background dim */}
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-black/30 z-40"
            ></div>

            {/* menu box */}
            <div className="absolute right-0 top-[35px] bg-gray-50 text-gray-700 rounded-[4px] shadow-lg z-50 flex items-center justify-center">
              {authUser._id != data.creator? 
              <button onClick={() => setMenuOpen(!menuOpen)} className="hover:bg-gray-400/40 p-[10px]">
                Report
              </button> : 
              
              <div className="flex flex-col items-center text-[18px] w-[150px]">

                <button onClick={deletePost} className="hover:bg-gray-400/40 border-b-1 border-current/50 py-[10px] w-full px-[10px] flex items-center gap-x-[2.5px] justify-between">
                Delete
                <span className="icon-[ic--baseline-delete] text-[25px] text-red-700"></span>
                </button>

                <button onClick={editPost} className="hover:bg-gray-400/40 py-[10px] w-full px-[10px] flex items-center gap-x-[2.5px] justify-between">
                Edit
                <span className="icon-[mage--edit-fill] text-[25px] text-cyan-700"></span>
                </button>

              </div>
              
              
              }

            </div>
          </>
        )}

      </div>

      <div className="p-2 pt-4 px-1 min-h-[100px] border-b-1 border-current/30">
        <div className="pb-5 px-2">{data.caption}</div>
        {data.image && (
          <img
            src={data.image}
            className="pt-2 max-h-96 object-cover w-full border-t-1 border-current/30"
          />
        )}
      </div>

      <div className="flex p-4 px-6 bg-base-200/10 items-center justify-between">
        <div className="flex items-center text-[20px] gap-x-[5px]">
          {data.likes.length}
          <span
            onClick={likedFunc}
            className={`text-[25px] cursor-pointer ${
              liked ? "icon-[icon-park-solid--like]" : "icon-[icon-park-outline--like]"
            }`}
          ></span>
        </div>
        <div onClick={() => {setCommenting(!commenting)}} className="cursor-pointer flex items-center text-[15px] gap-x-[5px]">
          <span className={`mt-[3px] text-[25px] icon-[material-symbols-light--comment-rounded]`}></span>
          Comments
        </div>
      </div>


      {commenting &&
       <div className="flex flex-col gap-y-[10px]">
        <form onSubmit={submitComment} className="bg-base-200/40 m-2 p-3 rounded-[5px] flex items-center gap-2">
        <img className="h-10 w-10 rounded-full" src={authUser.avatar} alt="" />
        
        <textarea
        ref={textareaRef}
        value={comment}
        onChange={handleInput}
        rows={1} // initial height
        placeholder="Write a comment..."
        style={{verticalAlign: "center"}}
        className="flex-1 h-10 border-2 rounded-md border-current/10 p-2 resize-none overflow-hidden"
        ></textarea>

        <button className="btn btn-primary w-10 h-10 rounded-full flex items-center justify-center p-0">
            <span className="mr-[-5px] icon-[material-symbols-light--send-rounded] text-[30px] leading-none"></span>
        </button>
        </form>

        <div className="flex flex-col m-2 p-3 gap-y-[20px]">

          {data.comments.length ? data.comments.map(item => {
            return <CommentCard key={item._id} props={{item, postId: data._id}}></CommentCard>
          }) : <div className="">No comments yet</div>}

        </div>

      </div>}

      {/* {console.log(data)} */}

    </div>
  );
};
