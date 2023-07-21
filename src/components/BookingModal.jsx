import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const BookingModal = ({ selectedHouse, setSelectedHouse }) => {
  const { name, address, phone } = selectedHouse;
  console.log(selectedHouse)

  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newBooking = {
      user: decodedToken.name,
      address: address,
      house: selectedHouse,
      phone: phone
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    existingBookings.push(newBooking);

    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    toast.success("Booking Successful");
    navigate("/renter/dashboard");
    setSelectedHouse(null);
  };

  return (
    <dialog id="bookingModal" className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="py-4">Please fill out the form to proceed booking</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="name"
            className="input input-bordered w-full"
            defaultValue={decodedToken.name}
            disabled
          />
          <input
            type="text"
            placeholder="address"
            className="input input-bordered w-full"
            defaultValue={decodedToken.email}
            disabled
          />
          <input
            type="text"
            placeholder="address"
            className="input input-bordered w-full"
            defaultValue={phone}
            disabled
          />

          <button
            onClick={handleFormSubmit}
            className="input w-full py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-dark hove:bg-accent/90"
          >
            Book a house
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default BookingModal;
