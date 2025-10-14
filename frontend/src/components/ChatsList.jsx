import React from 'react'
import { userChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useEffect } from "react";
import NoChatsFound  from './NoChatsFound';

const ChatsList = () => {
  const {chats,setSelectedUser, isUsersLoading,getMyChatPartners } = userChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if(chats.length === 0)return <NoChatsFound/>
  return (
   <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
          
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
              <div className="size-12 rounded-full">
                {/* {console.log(chat)} */}
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullname} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.fullname}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ChatsList
