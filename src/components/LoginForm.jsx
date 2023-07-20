import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginFormData = {
      email,
      password,
    };

    console.log(loginFormData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/auth/login`,
        loginFormData
      );

      toast.success("Login successful!");
      form.reset();

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);

      // Extract the role from the response data
      const role = response.data.user.role;

      if (role === "house owner") {
        navigate("/owner/dashboard");
      } else if (role === "house renter") {
        navigate("/renter/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
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
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />
          <input
            type="submit"
            value="Login"
            className="py-2 px-4 bg-accent text-dark rounded-md cursor-pointer"
            required
          />
          <p className="text-center">
            {" "}
            Don&apos;t have an account ?{" "}
            <span className="text-accent font-semi-bold">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
