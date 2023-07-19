import axios from "axios";
import { useEffect, useState } from "react";
import HouseCard from "./HouseCard";

const ListedHouse = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        // const token = localStorage.getItem("jwtToken");
        // const decodedToken = jwt_decode(token); // Decode the token to get the user's role
        // if (decodedToken.role !== "House Owner") {
        // Check if the user's role is not "House Owner"
        //   return; // If not, don't fetch houses and return early
        // }

        const response = await axios.get("http://localhost:5000/api/houses", {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
        });

        setHouses(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHouses();
  }, []);

  if (!houses.length) {
    return <p>No houses to display.</p>;
  }
  return (
    <div className="">
      <h2>Your Houses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {houses.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default ListedHouse;
