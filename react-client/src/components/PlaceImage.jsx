export default function PlaceImage({place, index = 0, className = null}) {
    if(!place.photos?.length){
        return "";
    }

    if(!className){
        className = 'object-cover hover:opacity-90 flex w-full h-32 grow shrink-0';
    }

  return (
      <div className="bg-black">
            <img className={className} src={"http://localhost:4000/uploads/" + place.photos[index]} alt="" />
      </div>
    )
}
