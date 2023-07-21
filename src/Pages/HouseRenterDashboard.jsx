const HouseRenterDashboard = () => {
  const bookings = JSON.parse(localStorage.getItem("bookings"));

  return (
    <div className="min-h-screen mt-16">
      <h2 className="text-2xl text-accent text-center font-bold">
        Welcome to renter dashboard
      </h2>

      <div className="mt-4">
        {bookings && bookings.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold">Your Bookings:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bookings.map((booking, index) => (
                <div key={index} className="shadow-lg rounded-lg p-4 mt-2">
                  <img
                    src={booking.house.picture}
                    alt={booking.house.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold">
                    {booking.house.name}
                  </h3>
                  <p className="text-gray-500 mt-2">{booking.address}</p>
                  <p>${booking.rentPerMonth}</p>
                  <p className="text-gray-500 my-4">
                    <strong>Rent per Month:</strong>
                  </p>
                  <button className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-dark hove:bg-accent/90">
                    Proceed to checkout
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center mt-4 text-gray-600">
            No bookings available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HouseRenterDashboard;
