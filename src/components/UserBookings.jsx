import axios from "axios";
import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  console.log(bookings);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.userBookings);
      } catch (error) {
        console.error("Error fetching user's orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-10">
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
