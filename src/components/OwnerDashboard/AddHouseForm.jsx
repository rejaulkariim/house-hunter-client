import axios from "axios";
import { toast } from "react-hot-toast";

const AddHouseForm = () => {
  const handleHouseSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const city = form.city.value;
    const availabilityDate = form.availabilityDate.value;
    const phone = form.phone.value;
    const bedrooms = form.bedrooms.value;
    const roomSize = form.roomSize.value;
    const rentPerMonth = form.rentPerMonth.value;
    const picture = form.picture.value;
    const description = form.description.value;

    const formData = {
      name,
      address,
      city,
      availabilityDate,
      phone,
      bedrooms,
      roomSize,
      rentPerMonth,
      picture,
      description,
    };
    console.log(formData);

    try {
      await axios.post("http://localhost:5000/api/houses", formData);
      toast.success("House added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add the house. Please try again.");
    }
  };

  return (
    <form onSubmit={handleHouseSubmit} className="max-w-3xl mx-auto">
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
