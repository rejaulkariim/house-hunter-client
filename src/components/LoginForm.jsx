import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function LoginForm() {
  const initialState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);
  console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      const token = response.data.token;
      // Store the JWT token in local storage
      localStorage.setItem("jwtToken", token);

      toast.success("Login successful!");
      // Clear the form data
      setFormData(initialState);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
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
          <h1 className="text-xl font-bold ">Login to your account</h1>
          <p>Please fill out the form to create an account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            className="py-2 px-4 rounded-md"
            required
    
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="py-2 px-4 rounded-md"
            required
        
            onChange={handleInputChange}
          />
          <button type="submit" className="py-2 px-4 bg-accent rounded-md">
            Login
          </button>
          <p className="text-center">
            {" "}
            Don&apos;t have an account ?{" "}
            <span>
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
