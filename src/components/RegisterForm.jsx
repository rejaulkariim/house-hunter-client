import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";

function RegisterForm() {
  const initialState = {
    fullName: "",
    role: "House Owner",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      setFormData(initialState);
      await axios.post("http://localhost:5000/api/register", formData);
      toast.success("Registration successful!");
      setLoading(false);
    } catch (error) {
      console.log(error.message.data.response);
      toast.error(error.message.data.response);
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
          <button type="submit" className="py-2 px-4 bg-accent rounded-md items-center">
            {loading ? <FaSpinner className="animate-spin" /> : null}
            Register
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
