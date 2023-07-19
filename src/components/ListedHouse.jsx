import axios from "axios";
import { useEffect, useState } from "react";
import HouseCard from "./HouseCard";

const ListedHouse = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/houses");
      setHouses(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter houses based on the search term
  const filteredHouses = houses.filter((house) =>
    house.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!houses.length) {
    return <p>No houses to display.</p>;
  }

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by house name"
            className="input input-bordered max-w-xl"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <p>
          Explore and book your dream house from our wide selection of
          properties
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        {filteredHouses.map((house) => (
          <HouseCard key={house._id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default ListedHouse;
