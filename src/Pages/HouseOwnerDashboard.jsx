// OwnerDashboard.js
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../components/Button";

const HouseOwnerDashboard = () => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(houses);

  useEffect(() => {
    // Fetch the houses listed by the logged-in user
    const fetchHouses = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/houses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHouses(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-16 min-h-screen max-w-6xl mx-auto">
      <h2 className="text-2xl text-accent text-center font-bold">
        Welcome to owner dashboard
      </h2>
      <div className="overflow-x-auto mt-16">
        <table className="table-fixed w-full border-collapse rounded-md">
          <thead className="bg-dark text-light text-left">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Uploaded Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {houses.map((house) => (
              <tr key={house._id}>
                <td className="px-4 py-2">
                  <img
                    src={house.picture}
                    alt={house.name}
                    className="h-24 w-32 object-cover rounded-lg"
                  />
                </td>
                <td className="px-4 py-2">{house.name}</td>
                <td className="px-4 py-2">{house.createdAt}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button
                    placeholder="edit"
                    variant="primary"
                    href={`/owner/dashboard/edit-house/${house._id}`}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button placeholder="Delete" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HouseOwnerDashboard;
