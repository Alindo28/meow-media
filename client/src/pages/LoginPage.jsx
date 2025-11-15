import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useAccountStore from "../stores/store.account";

const texts = [
  "Welcome back, cool cat 😻",
  "The catverse missed you 😿",
  "Your whisker squad is waiting for you 😸",
  "Back for more meowment? 😼",
];

const LoginPage = () => {
  let [rText,setrText] = useState("")
  let [formData,setFormData] = useState({email:"",password:""})
  let [passVisibility, setPassVisibility] = useState(false)


  let {logInStore,isLogging} = useAccountStore()

  async function handleLogin(event) {
    event.preventDefault()
    let formData = new FormData(event.target)
    
    let data = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    await logInStore(data)
  }

  function toggleVisibility(){
    setPassVisibility(!passVisibility)
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
        <form onSubmit={handleLogin} className="flex flex-col w-full max-w-md gap-4 p-6 bg-bg-secondary rounded-lg shadow-md bg-base-200">

          <div className="text-3xl flex justify-center items-end gap-x-3">Welcome back! <span className="icon-[noto--kissing-cat] text-3xl"></span></div>

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


          { !isLogging ? <button className="btn btn-primary waves waves-light max-w-sm">Log in</button> : <button class="btn btn-disabled btn-primary">
            <span className="loading loading-spinner loading-sm"></span>
            <span>Just a sec...</span> </button>}
          <div className="text-center">Don't have an account? <span className="text-indigo-500"><Link to={"/signup"}>Sign-up</Link></span></div>
        </form>
      </div>

      {/* Right Side: Random Text */}
      <div className="flex-1 flex items-center justify-center p-4 text-center">
        <span className="text-6xl font-semibold text-text-primary">{rText}</span>
      </div>
    </div>
  );
};

export default LoginPage;
