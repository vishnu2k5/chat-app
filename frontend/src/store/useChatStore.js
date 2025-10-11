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
    isMessagesLoding:false,
    isSoundEnabled :localStorage.getItem("isSoundEnabled")===true,


    toggleSound : ()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled),
        set({isSoundEnabled:!get().isSoundEnabled})
    },


    setActiveTab:(seletedTab)=>set({activeTab:seletedTab}),
    setSelectedUser:(selectedUser)=>set({selectedUser:selectedUser}),


    getAllcontacts: async()=>{
        set({isUsersLoding:true})
        try {
        const res = await axiosInstance.get("/message/contacts")
        set({allContacts:res.data})
        } catch (error) {
           toast.error(error.response.data.message);            
        }finally{
            set({isUsersLoding:false})
        }
    },


    getAllChatPartners: async()=>{
        set({isUsersLoding:true})
        try {
        const res = await axiosInstance.get("/message/chats")
        set({chats:res.data})
        } catch (error) {
           toast.error(error.response.data.message);            
        }finally{
            set({isUsersLoding:false})
        }

    },



}))