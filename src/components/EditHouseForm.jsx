import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditHouseForm = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const [houseData, setHouseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/houses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHouseData(response.data);
        setIsLoading(false);
       
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchHouseData();
  }, [id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/houses/${id}`,
        houseData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success response
      console.log(response.data);

      navigate("/owner/dashboard")
    } catch (error) {
      // Handle error
      console.log(error.response.data);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
     <form className="max-w-2xl mx-auto py-10" onSubmit={handleFormSubmit}>
  {/* Form fields and pre-filled data go here */}
  {/* Make sure to use controlled inputs */}
  <input
    type="text"
    name="name"
    value={houseData.name}
    onChange={(e) => setHouseData({ ...houseData, name: e.target.value })}
    placeholder="Give your house a name"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="address"
    value={houseData.address}
    onChange={(e) => setHouseData({ ...houseData, address: e.target.value })}
    placeholder="Address"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="city"
    value={houseData.city}
    onChange={(e) => setHouseData({ ...houseData, city: e.target.value })}
    placeholder="City"
    className="input input-bordered w-full"
    required
  />
  <input
    type="date"
    name="availabilityDate"
    value={houseData.availabilityDate}
    onChange={(e) =>
      setHouseData({ ...houseData, availabilityDate: e.target.value })
    }
    placeholder="Available Date"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="phone"
    value={houseData.phone}
    onChange={(e) => setHouseData({ ...houseData, phone: e.target.value })}
    placeholder="Phone"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="bedrooms"
    value={houseData.bedrooms}
    onChange={(e) => setHouseData({ ...houseData, bedrooms: e.target.value })}
    placeholder="Bedroom"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="bathrooms"
    value={houseData.bathrooms}
    onChange={(e) => setHouseData({ ...houseData, bathrooms: e.target.value })}
    placeholder="Bathrooms"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="roomSize"
    value={houseData.roomSize}
    onChange={(e) => setHouseData({ ...houseData, roomSize: e.target.value })}
    placeholder="Room Size"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="rentPerMonth"
    value={houseData.rentPerMonth}
    onChange={(e) =>
      setHouseData({ ...houseData, rentPerMonth: e.target.value })
    }
    placeholder="Rent per month"
    className="input input-bordered w-full"
    required
  />
  <input
    type="text"
    name="picture"
    value={houseData.picture}
    onChange={(e) => setHouseData({ ...houseData, picture: e.target.value })}
    placeholder="Image url"
    className="input input-bordered w-full"
    required
  />
  <textarea
    className="textarea textarea-bordered h-32"
    name="description"
    value={houseData.description}
    onChange={(e) => setHouseData({ ...houseData, description: e.target.value })}
    placeholder="Description"
  ></textarea>
  <input
    type="submit"
    value="Update House"
    className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-dark hover:bg-accent/90 w-full"
  />
</form>

    </div>
  );
};

export default EditHouseForm;
