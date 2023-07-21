import axios from "axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const AddHouseForm = () => {
  const navigate = useNavigate();

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

    try {
      const token = localStorage.getItem("jwtToken");
      const decodedToken = jwt_decode(token);
      formData.owner = decodedToken.userId;

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
      form.reset();
      navigate("/owner/dashboard");
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
          <h2 className="text-2xl font-bold">Add a new House</h2>
          <p>Please fill out the form to add a new house</p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="label">
              <span className="label-text text-sm">Give your house a name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Give your house a name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text text-sm">Your Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="w-full">
              <label className="label">
                <span className="label-text text-sm">Your City</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <label className="label">
                <span className="label-text text-sm">Date</span>
              </label>
              <input
                type="date"
                name="availabilityDate"
                placeholder="Available Date"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="w-full">
              <label className="label">
                <span className="label-text text-sm">Phone</span>
              </label>
              <input
                type="number"
                name="phone"
                placeholder="+880 is required"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="label">
                <span className="label-text text-sm">Bedrooms</span>
              </label>
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedroom"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-sm">Bathrooms</span>
              </label>
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-sm">Room Size</span>
              </label>
              <input
                type="number"
                name="roomSize"
                placeholder="Room Size"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text text-sm">Rent per Month</span>
              </label>
              <input
                type="number"
                name="rentPerMonth"
                placeholder="Rent per month"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>
          <div>
            <label className="label">
              <span className="label-text text-sm">Image Url</span>
            </label>
            <input
              type="text"
              name="picture"
              placeholder="Image url"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="w-full">
            <label className="label">
              <span className="label-text text-sm">Descriptions</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 w-full"
              name="description"
              placeholder="Description"
            ></textarea>
          </div>
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
