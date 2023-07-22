import { format } from "date-fns";
import React from "react";
import Button from "./Button";

const OwnerHouseCard = ({ house, setSelectedHouseId }) => {
    console.log(house)
    
  const formattedCreatedAt = format(
    new Date(house.availabilityDate),
    "MMM dd, yyyy "
  );

  return (
    <tr key={house._id}>
      <td className="px-4 py-2">
        <img
          src={house.picture}
          alt={house.name}
          className="h-24 w-32 object-cover rounded-lg"
        />
      </td>
      <td className="px-4 py-2">{house.name}</td>
      <td className="px-4 py-2">{formattedCreatedAt}</td>
      <td className="px-4 py-2 space-x-2">
        <Button
          placeholder="Edit"
          variant="primary"
          href={`/owner/dashboard/edit-house/${house._id}`}
          className="mr-2"
        ></Button>
        <button
          className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-error text-light hove:bg-warning/80"
          onClick={() =>
            setSelectedHouseId(house._id) & window.my_modal_1.showModal()
          }
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default OwnerHouseCard;
