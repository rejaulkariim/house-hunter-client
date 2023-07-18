import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="flex items-center justify-center h-[600px]">
      <div className="w-[400px]">
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold ">Login to your account</h1>
          <p>Please fill out the form to create an account</p>
        </div>
        <form className="flex flex-col gap-4 mt-4">
          <input
            type="email"
            placeholder="Email"
            className="py-2 px-4 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="py-2 px-4 rounded-md"
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
