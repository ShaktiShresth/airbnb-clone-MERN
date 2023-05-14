import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios';
import AddressLink from "../components/AddressLink";
import PlacePhotosGallery from "../components/PlacePhotosGallery";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(()=>{
      if(id){ 
        axios.get('/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) => _id === id);
          if(foundBooking){
            setBooking(foundBooking);
          }
        });
      }
    }, [id]);

    if(!booking){
      return '';
    }

  return (
    <div className="px-4 py-8 lg:px-20 bg-gray-50 text-sm md:text-base">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">{booking.place.title}</h1>
        <AddressLink className="my-2 flex">{booking.place.address}</AddressLink>
        <div className="flex flex-col justify-between items-center truncate p-6 bg-gray-200 mb-4 rounded-2xl sm:flex-row">
          <div className="text-center sm:text-left">
            <h2 className="mb-2 text-xl">Your booking information</h2>
            <BookingDates booking={booking} />
          </div>
          <div className="p-2 md:p-3 bg-primaryColor text-center rounded-2xl text-white mt-4 sm:mt-0">
            <div>Total Price</div>
            <div className="text-xl md:text-2xl">${booking.price}{booking.numOfGuests}</div>
          </div>
        </div>
        <PlacePhotosGallery place={booking.place}/>
      </div>
      {/* <div className="flex items-center justify-center pt-4">
          <button 
              onClick={handleDeleteBooking}
              className="w-96 text-sm md:text-lg bg-primaryColor hover:bg-black text-white px-4 py-4 rounded-2xl flex gap-2 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Remove
          </button>
      </div> */}
    </div>
  )
}
