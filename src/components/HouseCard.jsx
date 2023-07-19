
const HouseCard = ({ house }) => {
  console.log(house);
  return (
    <div className="shadow-md rounded-md p-4">
    <img src={house.picture} alt={house.name} className="w-full h-40 object-cover rounded-md" />
    <div className="mt-4">
      <h3 className="text-xl font-semibold">{house.name}</h3>
      <p className="text-gray-500 mt-2">{house.description}</p>
      <div className="mt-4">
        <p>
          <strong>Address:</strong> {house.address}, {house.city}
        </p>
        <p>
          <strong>Bedrooms:</strong> {house.bedrooms}
        </p>
        <p>
          <strong>Bathrooms:</strong> {house.bathrooms}
        </p>
        <p>
          <strong>Room Size:</strong> {house.roomSize} sq ft
        </p>
        <p>
          <strong>Rent per Month:</strong> ${house.rentPerMonth}
        </p>
        <p>
          <strong>Availability Date:</strong> {house.availabilityDate}
        </p>
        <p>
          <strong>Contact Phone:</strong> {house.phone}
        </p>
      </div>
      <button className="mt-4 w-full btn btn-accent">Book Now</button>
    </div>
  </div>
  );
};

export default HouseCard;
