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
    </div>
  )
}
