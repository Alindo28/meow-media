import React, { useState, useEffect } from "react";
import moment from "moment";
import useAccountStore from "../../stores/store.account";
import usePostStore from "../../stores/store.post";

const CommentCard = ({ props }) => {
  let data = props.item
  const [menuOpen, setMenuOpen] = useState(false);
  let {authUser} = useAccountStore()
  let {updatePostStore,isUpdatingPost} = usePostStore()

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  function deleteComment(e){
      e.preventDefault()
      setMenuOpen(!menuOpen)
      updatePostStore("delcomment",[props.postId, data._id])
  }

  return (
    <div className="flex h-auto p-[10px] pr-[6px] items-center rounded-[5px] w-full bg-base-200/70 gap-x-[10px] relative">
      <img className="h-12 w-12 rounded-full object-cover" src={data.creatorAvatar} alt="" />

      <div className="flex flex-col justify-between w-full">
        <div className="flex items-start justify-between h-[20px] mt-[-5px]">
          <div className="flex">
            <div className="text-[14px] w-[150px] text-left text-current/70">{data.creatorName}</div>
            <div className="text-[13px] w-[110px] text-right text-nowrap text-current/60">
              {moment(data.createdAt).fromNow()}
            </div>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className=" rounded-full p-1 text-[20px] mt-[-5px]"
          >
            <i className="icon-[pepicons-pencil--dots-y] hover:bg-current/60"></i>
          </button>
        </div>

        <div className="text-[16px] w-[255px] whitespace-pre-wrap break-words">
          {data.text}
        </div>

        {/* Menu Overlay */}
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
              
              <button onClick={deleteComment} className="hover:bg-gray-400/40 p-[10px] flex items-center gap-x-[2.5px]">
                <span className="icon-[mdi--delete-outline] text-[20px] text-red-700"></span>
                delete
              </button>}

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
