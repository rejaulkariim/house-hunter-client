import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ selectedHouse, setSelectedHouse }) => {
  const { name } = selectedHouse;

  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("jwtToken");
  const decodedToken = jwtDecode(token);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const phoneRegex = /^(\+?8801|01)[3-9]\d{8}$/;
    if (!phone.match(phoneRegex)) {
      toast.error("Please provide a valid Bangladeshi phone number.");
      return;
    }

    try {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = jwtDecode(token);

      const newBooking = {
        name: decodedToken.name,
        email: decodedToken.email,
        house: selectedHouse,
        phone: phone,
      };
      // Make an API call to your backend to fetch existing bookings for the user
      const bookingData = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userBookings = bookingData.data.userBookings || [];
      const totalBookings = userBookings.length;

      // Check if the user has already booked 2 houses
      if (totalBookings >= 2) {
        toast.error(
          "Booking Limit Exceeded, You can only book up to 2 houses. Please free up booking space to proceed. Thank you!"
        );
        return;
      }

      // Make an API call to your backend to save the booking order
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/bookings`,
        newBooking
      );

      if (response.data.message) {
        toast.success("Booking Successful");
        navigate("/renter/dashboard");
        setSelectedHouse(null);
      } else {
        toast.error("Failed to make a booking. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your booking.");
    }
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
            name="phone"
            placeholder="880 is a required"
            className="input input-bordered w-full"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
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
