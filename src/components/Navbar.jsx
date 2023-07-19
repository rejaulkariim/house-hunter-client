import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout");
      localStorage.removeItem("jwtToken");

      toast.success("Logged out");
      navigate("/login");
    } catch (error) {
      console.log("Error logging out:", error);
      toast.error("Something went wrong");
    }
  };

  // Check if the authentication token exists in local storage
  const isAuthenticated = !!localStorage.getItem("jwtToken");

  // Get the user's role from the JWT token if authenticated
  let isHouseOwner = false;
  if (isAuthenticated) {
    const jwtToken = localStorage.getItem("jwtToken");
    const decodedToken = jwt_decode(jwtToken);
    isHouseOwner = decodedToken.role === "House Owner";
  }

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/" className="text-dark">
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/contact" className="text-dark">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-dark">
                About
              </Link>
            </li>
            {isHouseOwner ? (
              <li>
                {" "}
                <Link to="/owner/dashboard" className="text-dark">
                  Dashboard
                </Link>
              </li>
            ) : (
              <li>
                {" "}
                <Link to="/renter/dashboard" className="text-dark">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="font-bold text-xl">
          House Hunter
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="text-dark">
              Home
            </Link>
          </li>
          <li>
            {" "}
            <Link to="/contact" className="text-dark">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-dark">
              About
            </Link>
          </li>
          {isHouseOwner ? (
            <li>
              {" "}
              <Link to="/owner/dashboard" className="text-dark">
                Dashboard
              </Link>
            </li>
          ) : (
            <li>
              {" "}
              <Link to="/renter/dashboard" className="text-dark">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-accent text-light hove:bg-accent/90 py-2 px-4 rounded-md duration-300 cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Button placeholder="Login" href="/login" color="green" />
        )}
      </div>
    </div>
  );
}

export default Navbar;
