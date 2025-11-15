import React, { useState } from 'react'

const ChatBubble = ({ isOwn, info }) => {

    let [check, setCheck] = useState(false)

  if (isOwn) {
    return (
        <div className={`w-full flex flex-col items-end mb-2`}>
        <div onMouseEnter={() => {setCheck(true)}} onMouseLeave={() => setCheck(false)} className="max-w-[50%] min-h-[30px] p-3 bg-primary text-primary-content rounded-lg break-words whitespace-pre-wrap">
            {info.text}
        </div>
            {<div className={`text-[12px] text-base-content/50 ${check? 'visible' : 'invisible'}`}>sent {info.createdAt}</div>}
        </div>

      
    )
  } else {
    return (
<div className="flex items-center gap-4 w-full">
  <img
    className="w-[40px] h-[40px] rounded-full object-cover shrink-0 mt-[-20px]"
    src={info.rAvatar}
    alt=""
  />
  <div className='w-full'>
    <div
        onMouseEnter={() => {setCheck(true)}} onMouseLeave={() => setCheck(false)}
        className="bg-secondary text-secondary-content rounded-lg p-3 break-words whitespace-pre-wrap"
        style={{
        maxWidth: '60%', // don’t let it exceed 60% of the parent
        display: 'inline-block', // let it expand naturally to fit text
        width: 'auto', // don’t stretch full width
        wordBreak: 'break-word',
        }}
    >
        {info.text}
    </div>

    {<div className={`text-[12px] text-base-content/50 ${check? 'visible' : 'invisible'}`}>sent {info.createdAt}</div>}
  </div>

</div>



    )
  }
}

export default ChatBubble
