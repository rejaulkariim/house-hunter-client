import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AddHouseForm = () => {
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  useEffect(() => {
    // Get the token from local storage
    const token = localStorage.getItem("jwtToken");

    if (token) {
      // Decode the token to get the user details
      const decodedToken = jwt_decode(token);
      const { name, phone } = decodedToken;
      console.log(first)

      // Disable the form for logged-in users
      setIsFormDisabled(true);
    }
  }, []);


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
      const decodedToken = jwt_decode(token);

      // Check if the user's role is "house owner"
      if (decodedToken.role !== "house owner") {
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
          defaultValue={defaultValues.name}
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input input-bordered w-full"
            defaultValue={defaultValues.address}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className="input input-bordered w-full"
            defaultValue={defaultValues.city}
          />
        </div>

        <div className="flex gap-4">
          <input
            type="date"
            name="availabilityDate"
            placeholder="Available Date"
            className="input input-bordered w-full"
            defaultValue={defaultValues.availabilityDate}
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            className="input input-bordered w-full"
            defaultValue={defaultValues.phone}
          />
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            name="bedrooms"
            placeholder="Bedroom"
            className="input input-bordered w-full"
            defaultValue={defaultValues.bedrooms}
          />
          <input
            type="number"
            name="roomSize"
            placeholder="Room Size"
            className="input input-bordered w-full"
            defaultValue={defaultValues.roomSize}
          />
          <input
            type="text"
            name="rentPerMonth"
            placeholder="Rent per month"
            className="input input-bordered w-full"
            defaultValue={defaultValues.rentPerMonth}
          />
        </div>

        <input
          type="text"
          name="picture"
          placeholder="Image url"
          className="input input-bordered w-full"
          defaultValue={defaultValues.picture}
        />
        <textarea
          className="textarea textarea-bordered h-32"
          name="description"
          placeholder="Description"
          defaultValue={defaultValues.description}
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
