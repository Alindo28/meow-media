import React, { useEffect } from 'react'
import useChatStore from '../stores/store.chat'
import SidebarCard from '../components/skeletons/SidebarCard'
import ChatCont from '../components/ChatCont'


const ChatPage = () => {
  const {
    users,
    getUsers,
    isLoadingUsers,
    selectedUser,
    setSelectedUser
  } = useChatStore()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <div className="flex min-h-screen mt-[-20px]">
      {/* Contacts sidebar */}
      <div className="bg-primary/20 flex-1 flex flex-col">
        <div className="flex text-[25px] justify-center items-center p-[10px] gap-x-[5px]">
          <span className="icon-[fluent--people-32-filled] text-[30px]"></span>
          Contacts
        </div>

        <div className="flex justify-center bg-gray-400/25 py-[3px] items-center gap-x-2">
          <label htmlFor="showAU" className="cursor-pointer select-none flex items-center gap-x-2">
            Show only active users
            <input
              id="showAU"
              type="checkbox"
              className="w-[15px] h-[15px] rounded-full cursor-pointer appearance-none border-1 border-gray-600/50 bg-white checked:bg-green-400"
            />
          </label>
        </div>



        <div className="flex-1 flex flex-col items-center h-full overflow-y-auto p-2">
          {isLoadingUsers ? (
            <div className="mt-[50px] icon-[line-md--loading-loop] text-5xl animate-spin"></div>
          ) : (
            users.map((item) => {
              const isSelected = selectedUser?._id === item._id
              return (
                <button
                className='w-full'
                  key={item._id}
                  onClick={() => setSelectedUser(item)}
                  >
                  <SidebarCard data={{...item, isSelected}}></SidebarCard>
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className='bg-primary/10 flex-[3]'>

        {selectedUser ? (

          <ChatCont />

        ) : (
          <div className="flex justify-center h-full items-center text-gray-500">Select a user to start chatting</div>
        )}

        </div>
    </div>
  )
}

export default ChatPage
