import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImage from "../components/PlaceImage";
import LoadingBar from 'react-top-loading-bar'

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [placesPerPage, setPlacesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
     axios.get('/user-places').then(({data}) => {
       setPlaces(data);
     });
     setProgress(100);
  }, []);

  const numOfTotalPages = Math.ceil(places.length / placesPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastPlace = currentPage * placesPerPage; //6
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage; //3

  const visiblePlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const inactiveClass = "px-4 py-2 mx-1 rounded-xl cursor-pointer hover:bg-primaryHoverColor transition delay-100 ease-in";
  const activeClass = `${inactiveClass} + bg-primaryColor + font-semibold + text-white`;

  function prevPageHandler(){
    if(currentPage !== 1) setCurrentPage(currentPage - 1);
  }
  function nextPageHandler(){
    if(currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  }

  return (
    <div className="py-4 px-4 lg:px-40">
        <LoadingBar
          color='#f11946'
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          />
        <AccountNav />
        <div className="text-center my-6 mb-2 text-sm md:text-base">
            <Link to={'/account/places/new'} className="bg-primaryColor rounded-full text-white py-2 px-6 inline-flex gap-1 items-center hover:bg-primaryHoverColor">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new place
            </Link>
        </div>
        <div className="mt-6">
          {
            places.length > 0 && visiblePlaces.map((place, index) => (
              <Link to={'/account/places/'+place._id} key={index} className="flex gap-4 p-4 rounded-2xl bg-gray-100 cursor-pointer mb-3 hover:bg-gray-200 transition ease-in hover:delay-150">
                <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                  <PlaceImage place={place}/>
                </div>
               <div className="grow-0 shrink overflow-hidden">
                  <h2 className="text-xl md:text-2xl font-bold md:font-semibold truncate">{place.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{place.description.slice(0, 189) + "... more"}</p>
                  <p className="mt-2 text-sm">{place.address}</p>
               </div>
              </Link>
            ))
          }
          {/* {
            places.length === 0 && (
              <div className="text-gray-400 py-40 bg-gradient-to-r from-gray-100 to-gray-200 text-center text-sm md:text-base">
                You don't have any places added to your account right now.
              </div>
            )
          } */}
        </div>
          <div className="text-sm md:text-base">
          {
            places.length > 0 && numOfTotalPages !== 1 && (
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
