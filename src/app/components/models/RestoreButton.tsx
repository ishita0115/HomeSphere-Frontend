
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface RestoreButtonProps {
  listingId: number;
  onSuccess: () => void;
  onError: () => void;
}

const RestoreButton: React.FC<RestoreButtonProps> = ({
  listingId,
  onSuccess,
  onError,
}) => {
  const token = useSelector((state: any) => state.auth.token.access);

  const handleRestore = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.put(
        `http://localhost:8000/app2/HomePermenent/${listingId}/restore/`,
        {},
        config
      );
      toast.dark("Successfully restored");
      onSuccess();
    } catch (error) {
      console.error("Error restoring listing:", error);
      onError();
    }
  };

  return (
    <button
      onClick={handleRestore}
      className="delete-button bg-green-600 p-2 rounded m-1 text-white"
    >
      Restore
    </button>
  );
};

export default RestoreButton;
