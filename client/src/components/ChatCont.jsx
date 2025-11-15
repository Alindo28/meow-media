import React from 'react'
import { useEffect, useState } from 'react'
import useChatStore from '../stores/store.chat'
import LoadingLogo from './LoadingLogo'
import MessageBox from './MessageBox'
import useAccountStore from '../stores/store.account'
import ChatBubble from './skeletons/ChatBubble'
import moment from "moment"

const ChatCont = () => {
    const {
        getMessages,
        isLoadingMessages,
        selectedUser,
        messages
    } = useChatStore()
    let {authUser} = useAccountStore()

    useEffect(() => {
        getMessages(selectedUser._id)
    },[selectedUser, getMessages])

    if(isLoadingMessages){
        return <div><LoadingLogo size={100} textV={false} /></div>
        }

  return (
    <div className='flex flex-col relative h-full'>
        <div
      className={`flex bg-base-300/10 items-center w-full gap-3 p-[12px] border-base-100/60 border-b-4`}
    >
      <img
        className="h-[50px] w-[50px] rounded-full object-cover"
        src={selectedUser.avatar ? selectedUser.avatar : null}
      />
      <div className="text-[20px] font-medium">{selectedUser.name || 'Unnamed user'}</div>
    </div>

        {/* Messages */}
      <div className="flex flex-col flex-1 overflow-y-auto p-3 gap-5 pb-[100px]">
        {messages && messages.length > 0 ? (
          messages.map((item) => {
            const isOwn = item.sender === authUser._id
            const isReceiver = item.receiver === selectedUser._id || item.sender === selectedUser._id

            if (!isReceiver) return null

            return (
              <div key={item._id} className={`w-full flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                {isOwn ? (
                  <ChatBubble isOwn={isOwn} info={{ text: item.text, createdAt: moment(item.createdAt).fromNow() }} />
                ) : (
                  <ChatBubble isOwn={isOwn} info={{ text: item.text, createdAt: moment(item.createdAt).fromNow(), rAvatar: selectedUser.avatar }} />
                )}
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-400 mt-5">
            No messages yet. Start chatting!
          </div>
        )}
      </div>
        
        <MessageBox></MessageBox>
    </div>
  )
}

export default ChatCont