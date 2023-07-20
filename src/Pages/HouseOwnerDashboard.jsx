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
        // const decodedToken = jwtDecode(token)
        // console.log(decodedToken.userId)

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
    <div className="min-h-screen mt-16">
      <h1 className="text-2xl text-accent text-center font-bold">Welcome to House Owner Dashboard</h1>
      <Button placeholder="Add a New House" href="/owner/dashboard/add-house"/>

  
      <h2>Total Houses Listed:</h2>
      {houses.map((house) => (
        <div key={house._id}>
          <h3>{house.name}</h3>

          {/* Add more details here as needed */}
        </div>
      ))}

   
    </div>
  );
};

export default HouseOwnerDashboard;
