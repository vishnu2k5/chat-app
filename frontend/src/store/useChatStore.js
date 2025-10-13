import { create } from "zustand";
import {axiosInstance} from "../lib/axios"
import toast from "react-hot-toast";


export const userChatStore = create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUsersLoding:false,
    isMessagesLoading:false,
    isSoundEnabled :JSON.parse(localStorage.getItem("isSoundEnabled"))===true,


    toggleSound : ()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled),
        set({isSoundEnabled:!get().isSoundEnabled})
    },


    setActiveTab:(seletedTab)=>set({activeTab:seletedTab}),
    setSelectedUser:(selectedUser)=>set({selectedUser:selectedUser}),


    getAllContacts: async()=>{
        set({isUsersLoding:true})
        try {
        const res = await axiosInstance.get("/message/contacts")
        console.log(res.data)
        set({allContacts:res.data})
        } catch (error) {
           toast.error(error.response.data.message);            
        }finally{
            set({isUsersLoding:false})
        }
    },


    getMyChatPartners: async()=>{
        set({isUsersLoding:true})
        try {
        const res = await axiosInstance.get("/message/chats")
        console.log(res)
        set({chats:res.data})
        } catch (error) {
           toast.error(error.response.data.message);            
        }finally{
            set({isUsersLoding:false})
        }

    },


getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);

      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },   
  sendMessage: async(messageData)=>{
    const {selectedUser} = get();
    const {messages} = get();
    if(!selectedUser){
        return toast.error("No user selected")
    }
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)
      set({messages:[...messages,res.data]})
    } catch (error) {
      toast.error(error.response?.data?.message||"Failed to send message")
    }
  }, 

}))