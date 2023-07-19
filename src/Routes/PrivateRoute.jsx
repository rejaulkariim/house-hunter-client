import jwt_decode from "jwt-decode";
import { Navigate, useLocation } from "react-router";
import OwnerDashboardLayout from "../Layout/OwnerDashboardLayout";
import RenterDashboardLayout from "../Layout/RenterDashboardLayout";
const PrivateRoute = ({ children }) => {
  const location = useLocation();

  // Check if the authentication token exists in local storage
  const isAuthenticated = !!localStorage.getItem("jwtToken");

  // Get the user's role from the JWT token if authenticated
  let isHouseOwner = false;
  if (isAuthenticated) {
    const jwtToken = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(jwtToken);
    isHouseOwner = decodedToken.role === "House Owner";
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isHouseOwner) {
    return <OwnerDashboardLayout />;
  } else {
    return <RenterDashboardLayout />;
  }
};

export default PrivateRoute;
