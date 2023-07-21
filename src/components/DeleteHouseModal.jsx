import React, { useState } from "react";

const DeleteHouseModal = ({ houseName, onCancel, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete();
      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      setDeleteError("Error deleting the house. Please try again later.");
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Are you sure you want to delete {houseName}?</h3>
        <p className="py-4">Once you delete this, the action cannot be undone.</p>
        <div className="modal-action">
          <button className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-accent text-dark hove:bg-accent/90" onClick={onCancel} disabled={isDeleting}>
            Close
          </button>
          <button className="py-2 px-4 rounded-md duration-300 cursor-pointer bg-error text-light hove:bg-error/90" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
        {deleteError && <p className="text-red-500 py-2">{deleteError}</p>}
      </form>
    </dialog>
  );
};

export default DeleteHouseModal;
