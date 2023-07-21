import jwtDecode from "jwt-decode";
import UserBookings from "../components/UserBookings";

const HouseRenterDashboard = () => {
  const token = localStorage.getItem("jwtToken");
  const decodedToken = jwtDecode(token);

  return (
    <div className="min-h-screen mt-16">
      <h2 className="text-2xl text-accent text-center font-bold">
        Welcome back, {decodedToken.name}
      </h2>
      <p className="text-center text-accent">{decodedToken.email}</p>
      <p className="text-center text-accent">
        Your role is a {decodedToken.role}
      </p>
      <UserBookings />
    </div>
  );
};

export default HouseRenterDashboard;
