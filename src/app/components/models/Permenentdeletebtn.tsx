// components/Permenentdeletebtn.js

import axios from 'axios';
import { useSelector } from 'react-redux';

const Permenentdeletebtn = ({ listingId, onSuccess, onError }) => {
    const token = useSelector((state: any) => state.auth.token.access);
   
  const handleDelete = async () => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
      await axios.delete(`http://localhost:8000/app2/HomePermenent/${listingId}/delete/`, config);
      console.log('successfuly deleted')
      onSuccess();
    } catch (error) {
      console.error('Error deleting listing:', error);
      onError();
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete Listing
    </button>
  );
};

export default Permenentdeletebtn;
