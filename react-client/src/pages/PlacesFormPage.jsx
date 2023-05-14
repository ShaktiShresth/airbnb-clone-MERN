import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotoUploader from "../components/PhotoUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function PlacesFormPage() {
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut]=useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price)
        });
    }, [id]);

    const inputHeader = (text) => {
        return (                    
            <h2 className="mt-4 text-xl truncate">{text}</h2>
        )
    }
    const inputDescription = (text) => {
        return (
            <p className="text-sm text-gray-500 truncate">{text}</p>
        )
    }
    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }
    async function savePlace(ev){
        ev.preventDefault();
        if(!title || !address || !description || !checkIn || !checkOut || !maxGuests || !price){
            toast.warning("Please enter all the required info to add the place to your account.", {
                position: toast.POSITION.BOTTOM_RIGHT
              });
              return;
        }
        const placeDetails = {
            title, address, addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price,
        }
        if(id){
            //update place
            await axios.put('/places', {id, ...placeDetails});
            setRedirect(true);
        }else{
            //add new place
            await axios.post('/places', placeDetails);
            setRedirect(true);
        } 
    }

    if(redirect){
        return <Navigate to={'/account/places'} />;
    }    

  return (
    <div className="px-20 pb-4 pt-4">
        <AccountNav />
        <form onSubmit={savePlace}>
            {preInput('Title', 'Title of your place, make it short and appealing')}
            <input type="text" value={title || ""} onChange={(ev)=>setTitle(ev.target.value)} placeholder="title"/>
            {preInput('Address', 'Address to the place')}
            <input type="text" value={address || ""} onChange={(ev)=>setAddress(ev.target.value)} placeholder="address"/>
            {preInput('Photos', 'Photos of the place')}
            <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {preInput('Description', 'Relative information of the place')}
            <textarea value={description || ""} onChange={(ev)=>setDescription(ev.target.value)} rows={3}/>
            {preInput('Perks', 'Select all the perks of the place')}
            <Perks selected={perks} onChange={setPerks}/>
            {preInput('Extra Information', 'Notices, house rules, etc...')}
            <textarea value={extraInfo || ""} onChange={(ev)=>setExtraInfo(ev.target.value)} rows="3" />
            {preInput('Check in & check out times', 'Add check in and out times')}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div>
                    <h3 className="mt-2 -mb-1 truncate">Check-in time(24hrs)</h3>
                    <input type="text" 
                            value={checkIn || ""} 
                            onChange={(ev)=>setCheckIn(ev.target.value)} 
                            placeholder="12"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 truncate">Check-out time(24hrs)</h3>
                    <input type="text" 
                            value={checkOut || ""} 
                            onChange={(ev)=>setCheckOut(ev.target.value)} 
                            placeholder="24"/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 truncate">Maximum guests</h3>
                    <input type="number" min={1} max={50}
                            value={maxGuests || ""} 
                            onChange={(ev)=>setMaxGuests(ev.target.value)}/>
                </div>
                <div>
                    <h3 className="mt-2 -mb-1 truncate">Price per night($)</h3>
                    <input type="number"
                            value={price || ""} 
                            onChange={(ev)=>setPrice(ev.target.value)}/>
                </div>
            </div>
            <div className="flex items-center justify-center">
            <button className="my-4 block py-2 w-96 text-xl text-white text-center bg-primaryColor rounded-2xl hover:bg-primaryHoverColor">
                    Save
            </button>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}
