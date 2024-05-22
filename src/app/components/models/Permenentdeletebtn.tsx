// components/Permenentdeletebtn.js

import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
interface DeleteButtonProps {
  listingId: number;
  onSuccess: () => void;
  onError: () => void;
}

const Permenentdeletebtn: React.FC<DeleteButtonProps> = ({
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
        `http://localhost:8000/app2/HomePermenent/${listingId}/delete/`,
        config
      );
      toast.success("successfuly deleted");
      onSuccess();
    } catch (error) {
      console.error("Error deleting listing:", error);
      onError();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="delete-button bg-red-600 p-2 rounded m-1 text-white"
    >
      Delete Permenent
    </button>
  );
};

export default Permenentdeletebtn;
