import axios from "axios"
import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav";
import PlaceImage from "../components/PlaceImage";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import LoadingBar from 'react-top-loading-bar'

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [bookingsPerPage, setBookingsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [progress, setProgress] = useState(8);

    useEffect(()=>{
            axios.get('./bookings').then(response => {
                setBookings(response.data);
            });
            setProgress(100);
    }, []);

    const numOfTotalPages = Math.ceil(bookings.length / bookingsPerPage);
    const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

    const indexOfLastBooking = currentPage * bookingsPerPage; //6
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage; //3

    const visibleBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const inactiveClass = "px-4 py-2 mx-1 rounded-xl cursor-pointer hover:bg-primaryHoverColor transition delay-100 ease-in";
    const activeClass = `${inactiveClass} + bg-primaryColor + font-semibold + text-white`;

    function prevPageHandler(){
        if(currentPage !== 1) setCurrentPage(currentPage - 1);
    }
    function nextPageHandler(){
        if(currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
    }

  return (
    <div className="px-4 pt-4 lg:px-40">
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        />
        <AccountNav />
        <div className="mt-8 flex flex-col gap-4">
            {
                bookings?.length > 0 && visibleBookings.map((booking, index) => (
                    <Link to={`/account/bookings/${booking._id}`} key={index} className="flex gap-4 bg-gray-100 hover:bg-gray-200 rounded-2xl overflow-hidden cursor-pointer text-sm md:text-xl transition ease-in hover:delay-100">
                        <div className="w-48 h-28">
                            <PlaceImage place={booking.place}/>
                        </div>
                        <div className="pr-4 py-3 grow overflow-hidden">
                                <h2 className="font-bold truncate md:font-semibold">{booking.place.title}</h2>
                                <BookingDates booking={booking} className="mt-2 py-2 border-gray-300"/>
                                <div className="flex gap-2 items-center text-sm lg:text-base overflow-hidden truncate">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                    </svg>
                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights <span className="font-semibold"> | </span> 
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                        </svg>
                                    Total Price: ${booking.price}
                                </div>
                        </div>
                    </Link>
                ))
            }
        </div>
        {/* {
                bookings?.length === 0 && (
                <div className="mt-8 text-gray-400 py-40 bg-gradient-to-r from-gray-100 to-gray-200 text-center">
                    You haven't made any bookings recently.
                    <p>You can check various places available according to your preferences and plan it right away by booking it.</p>
                </div>
                )
            } */}
        <div className="text-sm md:text-base py-2">
            {
                bookings?.length > 0 && numOfTotalPages !== 1 && (
                <div className="flex justify-center items-center my-2">
                    <span onClick={prevPageHandler} 
                        disabled = {currentPage === 1}
                        className="font-semibold px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-primaryHoverColor hover:text-white transition delay-100 ease-in">
                            Prev
                    </span>
                    <p className="text-center">
                    {
                        pages.map((page) => (
                        <span key={page} 
                                onClick={() => setCurrentPage(page)} 
                                className={`${currentPage === page ? activeClass : inactiveClass }`}>
                            {page}
                        </span>
                        ))
                    }
                    </p>
                    <span onClick={nextPageHandler} 
                        disabled={currentPage === numOfTotalPages}
                        className="font-semibold px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-primaryHoverColor hover:text-white transition delay-100 ease-in">
                            Next
                    </span>
                </div>
                )
            }
        </div>
    </div>
  )
}
