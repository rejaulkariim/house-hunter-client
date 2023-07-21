import axios from "axios";
import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import Button from "./Button";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

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
        <div>
          <p className="text-xl font-medium tracking-wide text-center">
            You have no booking available right now
          </p>
          <div className="flex justify-center my-4">
            <Button placeholder="Start Booking Now" href="/" />
          </div>
        </div>
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
