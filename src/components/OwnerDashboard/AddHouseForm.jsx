import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";

const AddHouseForm = () => {


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
      roomSize: form.roomSize.value,
      rentPerMonth: form.rentPerMonth.value,
      picture: form.picture.value,
      description: form.description.value,
    };

    try {
      const token = localStorage.getItem("jwtToken");
      console.log(token)
      const decodedToken = jwt_decode(token);
      console.log(decodedToken)

      // Check if the user's role is "house owner"
      if (decodedToken.role !== "House Owner") {
        toast.error("Only house owners can add a new house.");
        return;
      }

      // Submit the form and add a new house
      await axios.post("http://localhost:5000/api/houses", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("House added successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleHouseSubmit} className="max-w-2xl mx-auto mt-16 py-10">
      <div className="mb-4">
        <h2>Add a new House</h2>
        <p>Please fill out the form to add a new house</p>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="date"
            name="availabilityDate"
            placeholder="Available Date"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedroom"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            name="roomSize"
            placeholder="Room Size"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="rentPerMonth"
            placeholder="Rent per month"
            className="input input-bordered w-full"
          />
        </div>

        <input
          type="text"
          name="picture"
          placeholder="Image url"
          className="input input-bordered w-full"
        />
        <textarea
          className="textarea textarea-bordered h-32"
          name="description"
          placeholder="Description"
        ></textarea>
        <input
          type="submit"
          value="Submit House"
          className="btn btn-primary w-full"
        />
      </div>
    </form>
  );
};

export default AddHouseForm;
