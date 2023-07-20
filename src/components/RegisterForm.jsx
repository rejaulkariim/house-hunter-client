import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const role = form.role.value;

    const formData = {
      name,
      email,
      phone,
      password,
      role,
    };
    console.log(formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/auth/register`,
        formData
      );
      console.log("Registration successful!");
      toast.success("Registration successful!");
      form.reset();

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);


      if (role === "house owner") {
        navigate("/owner/dashboard");
      } else if (role === "house renter") {
        navigate("/renter/dashboard");
      } else {
       navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message)
    } finally {
      setLoading(false);
    }
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
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
          <select name="role" className="input input-bordered w-full">
            <option value="" disabled selected>
              Select Role
            </option>
            <option value="house owner">house owner</option>
            <option value="house renter">house renter</option>
          </select>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
          />
          <input
            type="submit"
            value="Register"
            className="py-2 px-4 bg-accent text-dark rounded-md cursor-pointer"
          ></input>
          <p className="text-center">
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
