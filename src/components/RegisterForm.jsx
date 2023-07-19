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
      setLoading(true); 
      await axios.post("http://localhost:5000/api/register", formData);
      setLoading(false); 
      toast.success("Registration successful!");
      setFormData(initialState);

      // redirect user to dashboard based on their role
      if(formData.role === "House Owner"){
        navigate("/dashboard")
      }else if (formData.role === "House Renter") {
        navigate("/dashboard/renter");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false); 
      if (error.response?.status === 409) {
        // setErrorMessage("Email already registered. Please login");
        toast.error("Email already registered. Please login")
      } else {
        console.log(error.message.data);
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
        {/* {errorMessage && <p className="text-center text-error">{errorMessage}</p>} */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="input input-bordered w-full"
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
            className="input input-bordered w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
          <button
            type="submit"
            className="py-2 px-4 bg-accent text-dark rounded-md cursor-pointer"
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Register"} 
          </button>
          <p className="text-center">
            {" "}
            Already have an account ?{" "}
            <span className="text-accent font-semi-bold">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
