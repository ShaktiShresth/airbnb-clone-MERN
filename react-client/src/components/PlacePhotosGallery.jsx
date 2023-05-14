import { useState } from "react";

export default function PlacePhotosGallery({place}) {
    const [showAllPics, setShowAllPics] = useState(false);

    if(showAllPics){
        return (
            <div className="bg-black text-white absolute top-0 left-0 min-h-screen">
                <div className="px-40 py-8 grid gap-2">
                    <div>
                        <h2 className="text-2xl mr-44">Photos from {place.title}</h2>
                        <button onClick={() => setShowAllPics(false)} className="z-10 fixed right-40 top-6 px-4 py-2 rounded-2xl flex gap-1 text-black bg-white shadow shadow-white hover:bg-gray-200 transform hover:ease-in">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    <div className="grid gap-4 pt-2">
                    {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                        <div key={index} className="flex justify-center min-h-placePicHeight overflow-hidden text-center">
                            <img className="cursor-pointer hover:opacity-80 transform hover:ease-in duration-300" src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
    <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
            <div className="bg-black">
                {
                place.photos?.[0] && (
                    <div>
                        <img onClick={() => {setShowAllPics(true)}} className="hover:opacity-80 cursor-pointer transform hover:ease-in duration-300" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""/>
                    </div>
                )}
            </div>
            <div className="grid">
                <div className="bg-black">
                    {
                    place.photos?.[1] && (
                        <img onClick={() => {setShowAllPics(true)}} className="hover:opacity-80 cursor-pointer transform hover:ease-in duration-300" src={'http://localhost:4000/uploads/'+place.photos[1]} alt=""/>
                    )}
                </div>
                <div className="relative top-2">
                    <div className="overflow-hidden bg-black">
                        {
                        place.photos?.[2] && (
                            <img onClick={() => {setShowAllPics(true)}} className="hover:opacity-80 cursor-pointer transform hover:ease-in duration-300" src={'http://localhost:4000/uploads/'+place.photos[2]} alt=""/>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <button onClick={() => setShowAllPics(true)} className="flex gap-1 items-center absolute bottom-2 right-2 rounded-2xl px-2 py-1 md:px-4 md:py-2 border-2 border-black bg-white text-sm hover:bg-gray-100 hover:transition hover:ease-in">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-6 lg:h-6">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
            </svg>
            <span className="hidden md:block">Show more photos</span>
        </button>
      </div>
  )
}
