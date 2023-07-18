import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const initialState = {
    fullName: "",
    role: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Start the loading spinner
      await axios.post("http://localhost:5000/api/register", formData);
      setLoading(false); // Stop the loading spinner
      toast.success("Registration successful!");
      setFormData(initialState);

      // redirect user to dashboard based on their role
      if(formData.role === "House Owner"){
        navigate("/dashboard/owner")
      }else if (formData.role === "House Renter") {
        navigate("/dashboard/renter");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false); // Stop the loading spinner
      if (error.response?.status === 409) {
        setErrorMessage("Email already registered. Please login");
      } else {
        console.log(error.message.data.response);
        setErrorMessage("Registration failed. Please try again later.");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-[600px]">
      <div className="w-[400px]">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold ">Register an account</h1>
          <p>Please fill out the form to create an account</p>
        </div>
        {errorMessage && <p className="text-center text-error">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
            required
          >
            {" "}
            <option value="" disabled selected>
              Select Role
            </option>
            <option value="House Owner">House Owner</option>
            <option value="House Renter">House Renter</option>
          </select>

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
            required
          />
          <button
            type="submit"
            className="py-2 px-4 bg-primary rounded-md"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Register"} 
          </button>
          <p className="text-center">
            {" "}
            Already have an account ?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
