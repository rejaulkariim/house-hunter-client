import jwt_decode from "jwt-decode";
import { Navigate, useLocation } from "react-router";

const RenterPrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("jwtToken");

  // Function to check if the token is valid
  const isValidToken = (token) => {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken.role === "house renter";
    } catch (error) {
      console.log("Error decoding token", error);
      return false;
    }
  };

  const isAuthenticated = token && isValidToken(token);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RenterPrivateRoute;
