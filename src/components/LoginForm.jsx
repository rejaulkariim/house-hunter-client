import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        `http://localhost:5000/api/user/auth/login`,
        loginFormData
      )

      const token = response.data.token;

      // Store the JWT token in local storage for future authentication
      localStorage.setItem("jwtToken", token);

      // Display a success toast message
      toast.success("Login successful!");

      // Redirect the user to the dashboard page
      navigate("/owner/dashboard");

      // Reset the form fields after successful login
    
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
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
