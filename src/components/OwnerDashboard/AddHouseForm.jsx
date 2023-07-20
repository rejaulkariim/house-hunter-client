import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const AddHouseForm = () => {

  const navigate = useNavigate()
  
  const handleHouseSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value,
      address: form.address.value,
      city: form.city.value,
      availabilityDate: form.availabilityDate.value,
      phone: form.phone.value,
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      roomSize: form.roomSize.value,
      rentPerMonth: form.rentPerMonth.value,
      picture: form.picture.value,
      description: form.description.value,
    };
    console.log(formData);
    try {
      const token = localStorage.getItem("jwtToken");
      console.log(token);
      const decodedToken = jwt_decode(token);
      formData.owner = decodedToken.userId;

      console.log(decodedToken);

      // Check if the user's role is "house owner"
      if (decodedToken.role !== "house owner") {
        toast.error("Only house owners can add a new house.");
        return;
      }

      // Submit the form and add a new house
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/add/houses`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      form.reset()
      navigate("/owner/dashboard")
      toast.success("House added successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mt-16 min-h-screen max-w-2xl mx-auto">
      <div className="mb-4">
        <Button placeholder="Back to dashboard?" href="/owner/dashboard" />
      </div>
      <form onSubmit={handleHouseSubmit} className="max-w-2xl mx-auto py-10">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Add a new House</h2>
          <p>Please fill out the form to add a new house</p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />
          <div className="flex gap-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex gap-4">
            <input
              type="date"
              name="availabilityDate"
              placeholder="Available Date"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              name="bedrooms"
              placeholder="Bedroom"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="bathrooms"
              placeholder="Bedroom"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="roomSize"
              placeholder="Room Size"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="rentPerMonth"
              placeholder="Rent per month"
              className="input input-bordered w-full"
              required
            />
          </div>

          <input
            type="text"
            name="picture"
            placeholder="Image url"
            className="input input-bordered w-full"
            required
          />
          <textarea
            className="textarea textarea-bordered h-32"
            name="description"
            placeholder="Description"
          ></textarea>
          <input
            type="submit"
            value="Submit House"
            className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-dark hove:bg-accent/90 w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default AddHouseForm;
