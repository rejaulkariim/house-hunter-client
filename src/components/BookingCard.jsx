const BookingCard = ({ booking, onDelete }) => {
  const {
    _id,
    house: {
      name,
      bedrooms,
      bathrooms,
      roomSize,
      rentPerMonth,
      phone,
      address,
      city,
      availabilityDate,
      picture,
    },
  } = booking;
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="mt-4">
        <img
          src={picture}
          alt={name}
          className="w-full h-52 object-cover rounded"
        />
      </div>

      <p className="mt-2 font-bold text-xl tracking-wide ">{name}</p>
      <div>
        <p className="font-medium">
          <span className="font-bold">Bedrooms: </span>
          {bedrooms}
        </p>
        <p className="font-medium">
          <span className="font-bold">Bathrooms: </span> {bathrooms}
        </p>
        <p className="font-medium">
          <span className="font-bold">Room Size: </span> {roomSize}
        </p>
        <p className="font-medium">
          <span className="font-bold"> Rent Per Month: </span>
          {rentPerMonth}
        </p>
        <p className="font-medium">
          <span className="font-bold"> House Owner Phone: </span>
          {phone}
        </p>
        <p className="font-medium">
          <span className="font-bold"> Address: </span>
          {address}
        </p>
        <p className="font-medium">
          <span className="font-bold"> City: </span>
          {city}
        </p>
        <p className="font-medium">
          <span className="font-bold">Availability Date: </span>{" "}
          {availabilityDate}
        </p>
      </div>
      <button
        className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-dark hove:bg-accent/90 mt-4"
        onClick={() => onDelete(_id)}
      >
        Delete Booking
      </button>
    </div>
  );
};

export default BookingCard;
