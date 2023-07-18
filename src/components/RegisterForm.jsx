import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

function RegisterForm() {
  const initialState = {
    fullName: "",
    role: "House Owner",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormData(initialState);
      await axios.post("http://localhost:5000/api/register", formData);
      toast.success("Registration successful!");
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
    <section className="">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
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
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="py-2 px-4 rounded-md"
          />
          <button type="submit" className="py-2 px-4 bg-accent rounded-md">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
