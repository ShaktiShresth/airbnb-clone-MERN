import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../UserContext"
import { toast } from "react-toastify";

export default function Header() {
    const {user} = useContext(UserContext);

  return (
    <div className="px-4 pb-4 pt-4 border-b-2 sticky lg:px-20">
        <header className="flex justify-between">
            <Link to={'/'} className="flex items-center gap-1 text-primaryColor">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                <span className="font-extrabold text-2xl tracking-tighter block">airbnb</span>
            </Link>

            <div className="hidden sm:flex gap-3 border border-gray-200 rounded-full py-3 px-4 shadow-md shadow-gray-200 hover:shadow-gray-300 transition ease-in-out delay-50 cursor-pointer">
                <div className="font-bold text-sm truncate sm:text-base">Anywhere</div>
                <div className="border-l border-gray-300"></div>
                <div className="font-bold text-sm truncate sm:text-base">Any week</div>
                <div className="border-l border-gray-300"></div>
                <div className="text-gray-500 text-sm font-light truncate sm:text-base">Add guests</div>
                <button className="bg-primaryColor text-white p-1 rounded-full w-8 relative -mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 m-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </button>
            </div>

            <div className="flex items-center">
                <div className="hidden absolute right-60 cursor-pointer xl:flex items-center">
                    <div className="py-2 px-3 font-semibold text-bold hover:bg-gray-100 rounded-full tracking-tighter">Airbnb your home</div>
                    <div className="py-2 px-3 hover:bg-gray-100 hover:rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                    </div>
                </div>

                <Link onClick={()=>{
                    {
                        if(!user){
                            toast.error("You must login first to use Airbnb.", {
                                position: toast.POSITION.BOTTOM_RIGHT
                              })
                        }
                    }
                }} to={user? '/account' : '/login'} className="flex items-center gap-2 border border-gray-200 rounded-full py-2 px-2 hover:shadow-md shadow-gray-300 transition ease-in-out delay-50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div className="bg-gray-500 text-white rounded-full border-2 border-gray-500 overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="block font-semibold">
                        {!!user && (
                            <div>
                                {user.name.split(' ')[0]}
                            </div>
                        )}
                    </div>
                </Link>
            </div>
        </header>
  </div>
  )
}
