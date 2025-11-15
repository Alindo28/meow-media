import React, { useEffect, useRef, useState } from 'react'
import useChatStore from '../stores/store.chat'

const MessageBox = () => {
    let {selectedUser, sendMessage} = useChatStore()
  const [style, setStyle] = useState({})
  const ref = useRef(null)
  let [text, setText] = useState("")

  useEffect(() => {
    const updatePosition = () => {
      // Find the parent container (ChatCont)
      const parent = ref.current?.parentElement
      if (parent) {
        const rect = parent.getBoundingClientRect()
        setStyle({
          position: 'fixed',
          bottom: 0,
          left: rect.left,
          width: rect.width,
        })
      }
    }

    // Run once + on resize
    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  async function sendMessageBut(event) {
    event.preventDefault()

    if(!text.trim()){
        return;
    }
    
    let data = {text, image: "", receiverId: selectedUser._id}

    let errStatus = await sendMessage(data)

    console.log(errStatus)
    setText("")
  }

  function handleChange(event) {
    let name = event.target.name
    setText(event.target.value)
  }

  return (
    <div className="bg-base-200 brightness-105 p-2 shadow-lg border-base-300 flex items-center sticky bottom-0">
    <form onSubmit={sendMessageBut} className="flex items-center w-full">
        <input
        value={text}
        onChange={handleChange}
        name="text"
        placeholder="Type your message here"
        style={{ backgroundColor: 'transparent !important' }}
        className="min-w-[40px] text-[18px] text-base-content w-full ml-2 p-2 border-2 rounded-[5px] border-base-content/25 focus:outline-none focus:ring-0 focus:border-base-content/40"
        />

        <div className="ml-2">
        <button className="cursor-pointer p-[10px] rounded-full hover:bg-base-content/30 flex items-center justify-center">
            <span className="icon-[bx--send] text-[30px]"></span>
        </button>
        </div>
    </form>
    </div>

  )
}

export default MessageBox
