import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingPlaceWidget from "../components/BookingPlaceWidget";
import PlacePhotosGallery from "../components/PlacePhotosGallery";
import AddressLink from "../components/AddressLink";
import SocialMediaShare from "../components/SocialMediaShare";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  return (
    <div className="px-4 pt-8 lg:px-20 bg-gray-50 text-sm md:text-base">
      <h1 className="text-2xl font-semibold md:text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlacePhotosGallery place={place} />
      <div className="mt-8 mb-4 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="mb-6">
            <h2 className="font-semibold text-xl md:text-2xl">Description</h2>
            {place.description}
          </div>
          <div>
            <span className="font-semibold">Check-in (24hrs):</span>{" "}
            {place.checkIn} <br />
            <span className="font-semibold">Checkout (24hrs):</span>{" "}
            {place.checkOut} <br />
            <span className="font-semibold">
              Maximum number of guests:
            </span>{" "}
            {place.maxGuests} <br />
          </div>
        </div>
        <div>
          <BookingPlaceWidget place={place} />
        </div>
      </div>
      <div className="bg-white border-t py-6 -mx-20 px-20">
        <div>
          <h2 className="font-semibold text-xl">Extra Info</h2>
        </div>
        <div className="text-gray-600 text-md leading-5 mt-2">
          {place.extraInfo}
        </div>
      </div>
      <div className="p-4">
        <SocialMediaShare place={place} />
      </div>
    </div>
  );
}
