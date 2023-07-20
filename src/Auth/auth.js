import jwtDecode from "jwt-decode";

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId;
    
  } catch (error) {
    console.error("Error decoding JWT token", error);
    return null;
  }
};
