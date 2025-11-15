import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Form, Link } from "react-router-dom";
import avatarImages  from "../assets/avatars.json"
import toast from "react-hot-toast";
import fileToBase64 from "../utils/fileToBase64";
import getImageBase64 from "../utils/imageToBase64";
import useAccountStore from "../stores/store.account";

const texts = [
  "Share your cutest meowments with the world! 😽",
  "Become part of the paw-some community! 😻",
  "Every cat has a story. Share yours! 😸",
  "It’s time to let your whiskers shine ✨",
];

const SignUpPage = () => {
  let [rText,setrText] = useState("")
  let [formData,setFormData] = useState({name:"",email:"",password:"",conPassword:""})
  let [passVisibility, setPassVisibility] = useState(false)
  let [avatar,setAvatar] = useState("avatar-1.png")
  let [changeAvatar,setChangeAvatar] = useState(false)

  let {signUpStore,isSigning} = useAccountStore()

  async function handleSignUp(event) {
    event.preventDefault()
    let formData = new FormData(event.target)

    if(formData.get("password") !== formData.get("conPassword")){
      return toast.error("Passwords must match")
    }

    let avatarImage = await getImageBase64(`../assets/avatars/${avatar}`)
    
    let data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: avatarImage
    }

    await signUpStore(data)
  }

  function toggleVisibility(){
    setPassVisibility(!passVisibility)
  }

  function toggleAvCh(params) {
    setChangeAvatar(!changeAvatar)
  }

  function avatarChangeFunc(newAvatar){
    setAvatar(newAvatar)
  }

  function handleChange(event) {
    let target = event.target.name
    setFormData(prev => {return {...prev, [target]: event.target.value}})
  }

  useEffect(() => {setrText(texts[Math.floor(Math.random() * texts.length)])}, [])

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Side: Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSignUp} className="flex flex-col w-full max-w-md gap-4 p-6 rounded-lg shadow-md bg-base-200">

          <div className="text-3xl flex justify-center items-end gap-x-3">Create an account <span className="icon-[noto-v1--grinning-cat-with-smiling-eyes] text-3xl"></span></div>

          <div className="flex flex-col items-center gap-y-3">
            <img className="w-[100px]" src={`../assets/avatars/${avatar}`} alt="" />
            <button type="button" onClick={toggleAvCh} className="btn border-none bg-info/60 text-gray-50 px-1.5 h-[30px] rounded-[6px]">Change Avatar<span className={`${changeAvatar ? "icon-[teenyicons--down-solid]":"icon-[teenyicons--left-solid]"} size-3.5 shrink-0`}></span></button>
            {changeAvatar && <div className="max-w-sm min-h-[150px] flex flex-wrap bg-primary/10 p-5 rounded-[8px] gap-3 justify-center items-center">{avatarImages.map(item => {
              let cn = `${item === avatar? "bg-info/20":""}cursor-pointer hover:bg-primary/20`
              return <button type="button" onClick={() => avatarChangeFunc(item)} key={item.split(".")[0].split("-")[1]} className={`${item === avatar? "p-2 bg-info/20":""} cursor-pointer ${item !== avatar && "hover:bg-primary/20"} transition-colors duration-300`}><img className={`w-[65px] object-contain ${item !== avatar && "hover:w-[80px] transition-all duration-300"}`} src={`../assets/avatars/${item}`}/></button>
            })}</div>}
          </div>

          <div className="input max-w-sm">
          <label className="label-text my-auto me-3 p-0" htmlFor="inlineLabelName">Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="grow" placeholder="Garfield" id="inlineLabelName" />
        </div>

        <div className="input max-w-sm">
          <label className="label-text my-auto me-3 p-0" htmlFor="inlineLabelEmail">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="grow" placeholder="garfield1234@gmail.com" id="inlineLabelEmail" />
        </div>

        <div className="input max-w-sm flex items-center">
            <label 
              className="label-text my-auto me-3 p-0" 
              htmlFor="inlineLabelPassword"
                      >
              Password:
            </label>

            <input 
              type={passVisibility ? "text" : "password"} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="grow h-10 pr-2" 
              id="inlineLabelPassword" 
            />

            <span onClick={toggleVisibility}
              className={`cursor-pointer ${passVisibility 
                ? "icon-[material-symbols--visibility-off]" 
                : "icon-[material-symbols--visibility]"} text-2xl flex items-center`}
            ></span>
        </div>


        <div className="input max-w-sm">
          <label className="label-text my-auto whitespace-nowrap me-3 p-0" htmlFor="inlineLabelConPassword">Confirm Password:</label>
          <input type="password" name="conPassword" value={formData.conPassword} onChange={handleChange} className="grow" placeholder="" id="inlineLabelConPassword" />
        </div>

          { !isSigning ? <button className="btn btn-primary waves waves-light max-w-sm">Join the Paw-ty!</button> : <button class="btn btn-disabled btn-primary">
            <span className="loading loading-spinner loading-sm"></span>
            <span>Just a sec...</span> </button>}
          <div className="text-center">Already part of the community? <span className="text-indigo-500"><Link to={"/login"}>Log-in</Link></span></div>
        </form>
      </div>

      {/* Right Side: Random Text */}
      <div className="flex-1 flex items-center justify-center p-4 text-center">
        <span className="text-6xl font-semibold text-neutral">{rText}</span>
      </div>
    </div>
  );
};

export default SignUpPage;
