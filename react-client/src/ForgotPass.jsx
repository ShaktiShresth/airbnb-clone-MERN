import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

export default function ForgotPass() {
    const [email, setEmail] = useState('');

    function submitEmail(ev){
        try {
          ev.preventDefault();
            if(!email){
                toast.error("Please make sure to enter your email.", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
                  return;
            }
               axios.post('http://localhost:4000/forgot-password',  {email});
              toast.success("Please check your email.", {
                position: toast.POSITION.BOTTOM_RIGHT
                });
                setEmail("");
              // console.log(response, "userRegister");
        } catch (error) {
          console.log(error);
        }
    }

  return (
    <div className='bg-gray-100 flex flex-col justify-around items-center grow'>
      <form onSubmit={submitEmail}>
      <div className='w-96 flex flex-col justify-around gap-4 items-center'>
        <h1 className='text-4xl font-semibold'>Forgot Password</h1>
            <input onChange={(ev) => setEmail(ev.target.value)}
                    type="email" 
                    value={email}
                    placeholder='Enter email'/>
        <button onSubmit={submitEmail}
                className='bg-primaryColor w-full text-white p-2 rounded-2xl hover:bg-primaryHoverColor' 
                type='submit'>Submit</button>
            <div className='w-full flex justify-end items-center gap-1 hover:text-primaryHoverColor'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Link to={'/login'}>Go Back</Link>
            </div>
            <ToastContainer />
      </div>
      </form>
    </div>
  )
}
