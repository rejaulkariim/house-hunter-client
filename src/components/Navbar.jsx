import axios from "axios";
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

  return (
    <header className="fixed left-0 top-0 right-0 backdrop:blur h-16 z-50 bg-light border-b">
      <nav className="max-w-[1080px] mx-auto h-full flex justify-between items-center">
        <div className="flex justify-between items-center gap-16">
          <Link to="/" className="text-xl text-dark font-bold tracking-wider">
            House Hunter
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/" className="text-dark">
            Home
          </Link>
          <Link to="/about" className="text-dark">
            About
          </Link>
          <Link to="/contact" className="text-dark">
            Contact
          </Link>
          <Link to="/dashboard" className="text-dark">
            Dashboard
          </Link>
        </div>

        <div>
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
      </nav>
    </header>
  );
}

export default Navbar;
