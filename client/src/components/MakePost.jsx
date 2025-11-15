import React from "react";
import { useState, useEffect } from "react";
import usePostStore from "../stores/store.post";
import useAccountStore from "../stores/store.account";
import fileToBase64 from "../utils/fileToBase64";
import urlToBase64 from "../utils/urlToBase64";

const MakePost = () => {
    let {authUser} = useAccountStore()
    let {isPosting, uploadPostStore, updatePostStore} = usePostStore()
    let [formData,setFormData] = useState({caption:"",image:null,postId:null})
    let [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
      let data = JSON.parse(localStorage.getItem("editPost"))
      if(data){
        setFormData(data)
        setIsUpdating(true)
        localStorage.removeItem("editPost")
    }
    }, [])    

    function handleChange(event) {
        let name = event.target.name;
        if (event.target.type === "file") {
        const file = event.target.files[0];
        if (file) {
        setFormData(prev => ({
        ...prev,
        [name]: {
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size
        }
      }));
    }
  } else {
    setFormData(prev => ({ ...prev, [name]: event.target.value }));
  }
}   

    async function submitPost(e) {
  e.preventDefault();

  let image64 = "";

  console.log(formData)
    if (formData.image) {
      if (formData.image.file instanceof File || formData.image.file instanceof Blob) {
        // Pass the actual File object
        image64 = await fileToBase64(formData.image.file);
      } else if (typeof formData.image === "string") {
        // It's a URL
        image64 = await urlToBase64(formData.image);
      }
    }


  if (!isUpdating) {
    uploadPostStore({
      name: authUser.name,
      avatar: authUser.avatar,
      caption: formData.caption,
      image: image64,
    });
  } else {
    console.log(image64)
    updatePostStore("thepost", {
      postId: formData.postId,
      newData: {caption: formData.caption,
      image: image64},
    });
  }

  setFormData({ caption: "", image: null });
}


  return (
    <div className="flex justify-center">
      <form onSubmit={submitPost} className="flex flex-col w-full max-w-md gap-6 p-6 rounded-lg shadow-md bg-base-200 ">
        {/* Header */}
        <div className="flex justify-center items-center text-lg font-bold">
          {isUpdating ? "Update" : "Make a"} Post
        </div>

        {/* Caption Input */}
        <textarea
          className="text-[17px] border rounded-[6px] py-2 px-3 w-full"
          name="caption"
          placeholder="Caption"
          id="caption"
          value={formData.caption}
          onChange={handleChange}
        ></textarea>

        {/* File Upload Box */}
        <div className="w-full max-w-md mx-auto p-0">
          {!formData.image && <label className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all border-gray-300 block">
            <input type="file" name="image" onChange={handleChange} className="hidden" />
            <p>Drag & drop an image, or click to browse</p>
          </label>}

          {/* Uploaded File Preview Example */}
          {formData.image && (
  <div className="mt-4 flex flex-col gap-4">
    <div className="flex items-center justify-between bg-base-200/20 p-3 rounded shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={formData.image.preview}
          alt="preview"
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <div className="font-semibold">{formData.image.name}</div>
          <div className="text-xs text-gray-500">
            {(formData.image.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <button
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, image: null }))}
          className="text-red-500 hover:text-red-700 text-lg font-bold"
        >
          ✕
            </button>
            <span className="text-green-600 text-sm mt-2">Uploaded ✅</span>
        </div>
        </div>
    </div>
    )}
        </div>

        {!isPosting? <button className="btn btn-primary ">{isUpdating? "Update":"Post"}</button> : <button className="btn btn-disabled btn-primary">
            <span className="loading loading-spinner loading-sm"></span>
            <span>{isUpdating? "Updating...":"Posting..."}</span> </button>}

      </form>
    </div>
  );
};

export default MakePost;
