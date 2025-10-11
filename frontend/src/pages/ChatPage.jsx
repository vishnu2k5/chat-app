import React from 'react'

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useAuthStore } from "../store/useAuthStore";
import { userChatStore}  from "../store/useChatStore"
import ProfileHeader from "../components/ProfileHeader"
import ActiveTabSwitch from "../components/ActiveTabSwitch"
import ChatsList from '../components/ChatsList';
import ConstactList from '../components/ConstactList';
import ChatContainer from '../components/ChatContainer';
import ChatHome from '../components/ChatHome';

const ChatPage = () => {
  const { logout} = useAuthStore()
  const {activeTab,allContacts,chats,selectedUser,isUsersLoding,isMessagesLoding,isSoundEnabled,messages} = userChatStore()
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
        <ProfileHeader/>
        <ActiveTabSwitch/>

        <div className='flex-1 overflow-y-auto p-4 space-y-2'>
          {activeTab==="chats"? <ChatsList/>:<ConstactList/>}
        </div>
        </div>
        {/* RIGHT SIDE */}
        
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
        {selectedUser?<ChatContainer/>:<ChatHome/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage
