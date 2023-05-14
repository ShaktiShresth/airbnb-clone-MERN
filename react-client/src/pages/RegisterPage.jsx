import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function RegisterPage() {
  // states
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // form submit function
  const registerUser = async (ev) =>{
    ev.preventDefault();
    try {
        // input empty?
        if (!name || !email || !password){
          toast.warning("Please fill in all the fields to signup.", {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          return;
        }
        // data to api
        const response = await axios.post('/register', {
        name,
        email,
        password,
      });
        // const res = await response.json();
        // console.log(response.status);
        if (response.status === 200){
          setName("");
          setEmail("");
          setPassword("");
          toast.success("You are now signed up. Please login to continue!", {
              position: toast.POSITION.BOTTOM_RIGHT
          });
        }
    } catch (error) {
      toast.error('Sign up failed ! User already exists.', {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  return (
      <div className="mt-4 flex justify-around items-center grow">
        <div className="-mt-32">
          <h1 className="text-center text-4xl font-semibold">Welcome to Airbnb</h1>
          <p className="text-center max-w-md mx-auto my-2">Discover places to stay and unique experiences around the world.</p>
          <form className="max-w-md mt-3" onSubmit={registerUser} >
                <input type="text" 
                            placeholder="Enter your username" 
                            value={name}
                            onChange={ev=>setName(ev.target.value)}/>
                <input type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" 
                            placeholder="Enter your password" 
                            value={password}
                            onChange={ev=>setPassword(ev.target.value)} />
                <button className="bg-primaryColor w-full text-white p-2 rounded-2xl hover:bg-primaryHoverColor">Sign up to continue</button>
              <ToastContainer />
              <div className="flex items-center text-gray-500 text-center py-2 before:w-full before:h-onePxHeight before:bg-grayColor before:mr-4 after:w-full after:h-onePxHeight after:bg-grayColor after:ml-4">or</div>
              <div className=" text-gray-400 text-center">Already a member? <Link to={'/login'} className="underline text-black hover:text-primaryHoverColor">Login</Link></div>
          </form>
        </div>
    </div>
  )
}
