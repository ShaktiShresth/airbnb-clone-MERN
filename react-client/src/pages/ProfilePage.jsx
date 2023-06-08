import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import Spinner from "../components/Spinner";

export default function ProfilePage() {
  const [redirectHomePage, setRedirectHomePage] = useState(null);
  const {ready, user, setUser} = useContext(UserContext);
  const [loader, setLoader] = useState(false);

  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = "profile";
  }

  const logout = async() => {
    setLoader(true)
    setTimeout(async() => {
      await axios.post('/logout');
      setRedirectHomePage('/');
      setUser(null);
      setLoader(false)
    }, 500);
  }

  if(!ready){
    return <div className="flex justify-center items-center min-h-screen">
      Loading...
    </div>;
  }

  if(ready && !user && !redirectHomePage){
    return <Navigate to={'/login'} />
  }

  if(redirectHomePage){
    return <Navigate to={redirectHomePage}/>
  }

  return (
    <div className="px-4 py-4 lg:px-20 ">
      <AccountNav/>
      {
        subpage === "profile" && (
          <div className="py-10 md:py-20 flex flex-col items-center justify-center mx-auto mt-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.9} stroke="currentColor" className="w-44 h-44 -mt-4 md:w-60 md:h-60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="underline text-sm md:text-base">You are logged in as</p>
            <span className="font-bold text-sm md:text-base">{user.name}</span>
            <p>(<span className="font-bold text-sm md:text-base">{user.email}</span>)</p>
            <button onClick={logout} className="py-2 w-40 rounded-full bg-primaryColor text-white mt-4 transition delay-100 ease-in hover:bg-black text-sm md:text-base">
              Logout
            </button>
          </div>
        )
      }
      {
        subpage === "places" && (<PlacesPage />)
      }
      <div className="flex justify-center">
        { loader && <Spinner/> }
      </div>
    </div>
  )
}
