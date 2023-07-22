import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BookingModal from "./BookingModal";
import HouseCard from "./HouseCard";

const ListedHouse = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [selectedHouse, setSelectedHouse] = useState(null);

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
  }, [page]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter houses based on the search term
  const filteredHouses = houses.filter(
    (house) =>
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.city.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!houses.length) {
    return <p>No houses to display.</p>;
  }

  return (
    <div className="">
      <h2 className="text-center text-2xl font-bold tracking-wider my-4">Discover Your Dream Home</h2>
      <div className="flex justify-center">
        {/* search bar */}
        <div className="flex mb-4 w-[30rem] shadow-md rounded-xl">
          <input
            type="text"
            placeholder="Search by house name or address"
            className="input input-bordered w-full tracking-wider text-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <p className="text-medium tracking-wider">
          Explore and book your dream house from our wide selection of
          properties
        </p>
      </div>
      <InfiniteScroll
        dataLength={houses.length}
        next={() => setPage((prevPage) => prevPage + 1)}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p className="text-center my-10">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {filteredHouses.map((house) => (
            <HouseCard
              key={house._id}
              house={house}
              setSelectedHouse={setSelectedHouse}
            />
          ))}
        </div>
      </InfiniteScroll>
      {selectedHouse ? (
        <BookingModal
          selectedHouse={selectedHouse}
          setSelectedHouse={setSelectedHouse}
        />
      ) : null}
    </div>
  );
};

export default ListedHouse;
