import { Link } from "react-router-dom";

const HouseOwnerDashboard = () => {
  const token = localStorage.getItem("jwtToken")

  return (
    <div className="min-h-screen mt-16 b-accent">
      <div className="py-10">
        <h2 className="text-5xl font-bold text-accent">
          Welcome to owner dashboard
        </h2>

        <div className="my-4">
          <Link
            to="/owner/dashboard/add-house"
            className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-light hove:bg-accent/90"
          >
            Add New House
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HouseOwnerDashboard;
