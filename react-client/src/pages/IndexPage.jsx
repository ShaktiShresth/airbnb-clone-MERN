import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "..//components/Footer";
import LoadingBar from "react-top-loading-bar";
import Spinner from "../components/Spinner";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [placesPerPage, setPlacesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState(8);
  const [loader, setLoader] = useState(true);

  const { user } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        axios.get("/places").then((response) => {
          setPlaces(response.data);
        });
        setProgress(100);
        setLoader(false);
      }, 500);
    } else {
      navigate("/login");
    }
  }, []);

  //pagination
  const numOfTotalPages = Math.ceil(places.length / placesPerPage);
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1);

  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;

  const visiblePlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  const inactiveClass =
    "px-4 py-2 mx-1 rounded-xl cursor-pointer hover:bg-primaryHoverColor transition delay-100 ease-in";
  const activeClass = `${inactiveClass} + bg-primaryColor + font-semibold + text-white`;

  function prevPageHandler() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }
  function nextPageHandler() {
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  }

  return (
    <div className="relative">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="p-4 w-96 m-auto relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute left-6 top-8 text-primaryColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          onChange={(ev) => {
            setSearchTerm(ev.target.value);
          }}
          id="search-places"
          className="search-places"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="flex justify-center">{loader && <Spinner />}</div>
      <div className="min-h-screen px-4 py-8 lg:px-20 grid gap-y-8 gap-x-6 grid-cols-2 max-[430px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {searchTerm
          ? places
              .filter((place) => {
                if (searchTerm == "") {
                  return place;
                } else if (
                  place.address
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  place.title.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return place;
                }
              })
              .map((place, index) => {
                return (
                  <Link to={"/place/" + place._id} key={index}>
                    <div className="bg-gray-500 rounded-2xl flex mb-2">
                      {place.photos?.[0] && (
                        <img
                          className="rounded-2xl object-cover aspect-square hover:scale-105"
                          src={
                            "http://localhost:4000/uploads/" + place.photos?.[0]
                          }
                          alt=""
                        />
                      )}
                    </div>
                    <h2 className="font-bold truncate">{place.address}</h2>
                    <h3 className="text-gray-500 text-sm truncate">
                      {place.title}
                    </h3>
                    <div className="text-gray-500 mt-1">
                      <span className="text-black font-bold">
                        ${place.price}
                      </span>{" "}
                      night
                    </div>
                  </Link>
                );
              })
          : visiblePlaces.map((place, index) => {
              return (
                <Link to={"/place/" + place._id} key={index}>
                  <div className="bg-gray-500 rounded-2xl flex mb-2">
                    {place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square hover:scale-105 transition duration-200 ease-in hover:delay-150"
                        src={
                          "http://localhost:4000/uploads/" + place.photos?.[0]
                        }
                        alt=""
                      />
                    )}
                  </div>
                  <h2 className="font-bold truncate">{place.address}</h2>
                  <h3 className="text-gray-500 text-sm truncate">
                    {place.title}
                  </h3>
                  <div className="text-gray-500 mt-1">
                    <span className="text-black font-bold">${place.price}</span>{" "}
                    night
                  </div>
                </Link>
              );
            })}
      </div>
      {/* pagination area below*/}
      <div className="text-sm md:text-base">
        {places.length > 0 && numOfTotalPages !== 1 && (
          <div className="flex justify-center items-center my-4">
            <span
              onClick={prevPageHandler}
              disabled={currentPage === 1}
              className="font-semibold px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-primaryHoverColor hover:text-white transition delay-100 ease-in"
            >
              Prev
            </span>
            <p className="text-center">
              {pages.map((page) => (
                <span
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`${
                    currentPage === page ? activeClass : inactiveClass
                  }`}
                >
                  {page}
                </span>
              ))}
            </p>
            <span
              onClick={nextPageHandler}
              disabled={currentPage === numOfTotalPages}
              className="font-semibold px-4 py-2 bg-gray-200 rounded-md cursor-pointer hover:bg-primaryHoverColor hover:text-white transition delay-100 ease-in"
            >
              Next
            </span>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
