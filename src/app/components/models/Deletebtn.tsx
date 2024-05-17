// components/DeleteButton.js

import axios from "axios";
import { useSelector } from "react-redux";
interface DeleteButtonProps {
  listingId: number;
  onSuccess: () => void;
  onError: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  listingId,
  onSuccess,
  onError,
}) => {
  const token = useSelector((state: any) => state.auth.token.access);

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(
        `http://localhost:8000/app2/listings/${listingId}/delete/`,
        config
      );
      console.log("successfuly deleted");
      onSuccess();
    } catch (error) {
      console.error("Error deleting listing:", error);
      onError();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="delete-button bg-red-500 text-white rounded-lg p-2 m-3"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
