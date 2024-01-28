import { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Navigate } from "react-router-dom";
// import { UserContext } from "../UserContext";

export default function BookingPlaceWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  //   const { user } = useContext(UserContext);

  const lStorageProfile = localStorage.getItem("profileData");
  const parsedData = JSON.parse(lStorageProfile);

  useEffect(() => {
    if (parsedData) {
      setFullName(parsedData.name);
    }
  }, []);

  let numOfNights = 0;
  if (checkIn && checkOut) {
    numOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function confirmBookingPlace() {
    if (!parsedData) {
      toast.error("You must be logged in to book the places.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    if (!checkIn || !checkOut || !numOfGuests || !fullName || !phone) {
      toast.error("You must fill in the required info to book this place.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numOfGuests,
      fullName,
      phone,
      place: place._id,
      price: numOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="p-4 mb-4 rounded-2xl bg-white border-2 border-gray-100 shadow-md shadow-gray-200">
      <div className="text-md text-center">
        <span className="font-bold text-xl">${place.price}</span> night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="px-4 py-3">
            <label>Check-in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className="px-4 py-3 border-l">
            <label>Checkout:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className="px-4 py-3 border-t">
          <label>No. of Guests:</label>
          <input
            type="number"
            value={numOfGuests}
            onChange={(ev) => setNumOfGuests(ev.target.value)}
          />
        </div>
        {numOfNights > 0 && (
          <div className="px-4 py-3 border-t">
            <label>Full name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(ev) => setFullName(ev.target.value)}
            />
            <label>Contact Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
      </div>
      <button
        onClick={confirmBookingPlace}
        className="mt-4 block m-auto bg-primaryColor w-64 text-white p-2 rounded-2xl hover:bg-primaryHoverColor text-md"
      >
        Book this place
      </button>

      <div>
        {numOfNights > 0 && (
          <div className="text-gray-500 mt-4 px-4 py-3 flex flex-col">
            <div className="underline flex justify-between">
              <span>{`$${place.price} x ${numOfNights} nights`}</span>
              <span>
                {numOfNights > 0 && <span>${numOfNights * place.price}</span>}
              </span>
            </div>
            <div className="border-t mt-4 pt-4 font-bold flex justify-between">
              Total :{" "}
              <span>
                {numOfNights > 0 && <span> ${numOfNights * place.price}</span>}
              </span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
