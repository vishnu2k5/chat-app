import React from 'react'
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer"

const Login = () => {
  const [formData, setFormData] = useState({email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  return (
<div className="w-full flex items-center justify-center p-4 bg-slate-900">
  <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
    <BorderAnimatedContainer>
      <div className='w-full flex flex-col md:flex-row'>
        <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
        <div className='w-full max-w-md'>
          <div className='text-center mb-8'>
            <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Create Account</h2>
                  <p className="text-slate-400">Sign up for a new account</p>

          </div>


        </div>

        </div>

      </div>
    </BorderAnimatedContainer>
    

  </div>

</div>
  )
}

export default Login
