import jwt_decode from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const isAuthenticated = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      return decodedToken.role === "house owner";
    }
    return false;
  };


  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" state={{from: location}} replace/>;
  }

  // If the user is authenticated, render the protected route
  return children;
};

export default PrivateRoute;