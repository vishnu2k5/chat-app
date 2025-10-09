import { create } from "zustand";


const useAuthStore = create((set, get) => ({
    authuser: { user: "vishnu", _di: 123 , age: 10 }
}));