import axios from "axios";
import { useEffect, useState } from "react";
import BookingModal from "./BookingModal";
import HouseCard from "./HouseCard";

const ListedHouse = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedHouse, setSelectedHouse] = useState(null);
  console.log(selectedHouse);
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/get/houses`
        );
        setHouses(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchHouses();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter houses based on the search term
  const filteredHouses = houses.filter(
    (house) =>
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.address.toLowerCase().includes(searchTerm.toLowerCase())
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
        {/* search bar */}
        <div className="flex mb-4 w-[30rem]">
          <input
            type="text"
            placeholder="Search by house name or address"
            className="input input-bordered w-full"
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
          <HouseCard
            key={house._id}
            house={house}
            setSelectedHouse={setSelectedHouse}
          />
        ))}
      </div>
      {selectedHouse ? <BookingModal selectedHouse={selectedHouse} setSelectedHouse={setSelectedHouse} /> : null}
    </div>
  );
};

export default ListedHouse;
