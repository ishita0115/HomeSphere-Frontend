// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { fetchListingDetail, removeReservation } from '@/app/apiService';

// const AdminMessages = () => {
//   const token = useSelector((state: any) => state.auth.token.access); 
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const response = await fetchListingDetail('api/contact', token);
//         setMessages(response.data);
//       } catch (error) {
//         console.error('Error fetching messages:', error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   const handleDeleteMessage = async (id) => {
//     try {
//       await removeReservation(`api/contact/${id}/`, token);
//       // Update the reservations state by filtering out the removed booking
//       setMessages(messages.filter((message) => messages.id !== id));
//       const [replyMessage, setReplyMessage] = useState('');
//     } catch (error) {
//       console.error("Error removing booking:", error);
//     }
//   };
//   const handleReplyMessage = async (id) => {
//     try {
//       await axios.post(`api/contact/${id}/send/`, { message: replyMessage }, { headers: { Authorization: `Bearer ${token}` }});
//       setReplyMessage('');
//       // Optionally, you can fetch the updated message list again after sending the reply
//     } catch (error) {
//       console.error("Error replying to message:", error);
//     }
//   };
//   return (
//     <div className="container mx-auto">
//       <h1 className="text-3xl font-bold text-center my-8">Admin Messages</h1>
//       <table className="table-auto w-full border-collapse border border-gray-500">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-500 px-4 py-2">ID</th>
//             <th className="border border-gray-500 px-4 py-2">Sender Name</th>
//             <th className="border border-gray-500 px-4 py-2">Sender Email</th>
//             <th className="border border-gray-500 px-4 py-2">Message</th>
//             <th className="border border-gray-500 px-4 py-2">Created At</th>
//             <th className="border border-gray-500 px-4 py-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {messages.map((message) => (
//             <tr key={message.id} className="text-center">
//               <td className="border border-gray-500 px-4 py-2">{message.id}</td>
//               <td className="border border-gray-500 px-4 py-2">{message.sender_first_name}</td>
//               <td className="border border-gray-500 px-4 py-2">{message.sender_email}</td>
//               <td className="border border-gray-500 px-4 py-2">{message.message}</td>
//               <td className="border border-gray-500 px-4 py-2">{message.created_at}</td>
//               <td className="border border-gray-500 px-4 py-2">
//                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteMessage(message.id)}>Delete</button>
//                 <form onSubmit={(e) => { e.preventDefault(); handleReplyMessage(message.id, e.target.reply.value); }}>
//                   <input type="text" name="reply" placeholder="Reply message" />
//                   <button type="submit">Reply</button>
//                 </form>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminMessages;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { fetchListingDetail, removeReservation } from '@/app/apiService';

const AdminMessages = () => {
  const token = useSelector((state: any) => state.auth.token.access); 
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchListingDetail('api/contact', token);
        console.log(response.data)
        setMessages(response.data);
        if(response.data)
            {
            
            }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id: any) => {
    try {
      await removeReservation(`api/contact/${id}/`, token);
      // Update the messages state by filtering out the removed message
      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
 
  const handleAcknowledgeMessage = async (id: any) => {
    try {
      await axios.post(`api/contact/${id}/send`, {}, { headers: { Authorization: `Bearer ${token}` }});
    } catch (error) {
      console.error("Error acknowledging message:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Admin Messages</h1>
      <table className="table-auto w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2">ID</th>
            <th className="border border-gray-500 px-4 py-2">Sender Name</th>
            <th className="border border-gray-500 px-4 py-2">Sender Email</th>
            <th className="border border-gray-500 px-4 py-2">Message</th>
            <th className="border border-gray-500 px-4 py-2">Status</th>
            <th className="border border-gray-500 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className="text-center">
              <td className="border border-gray-500 px-4 py-2">{message.id}</td>
              <td className="border border-gray-500 px-4 py-2">{message.sender_first_name}</td>
              <td className="border border-gray-500 px-4 py-2">{message.sender_email}</td>
              <td className="border border-gray-500 px-4 py-2">{message.message}</td>
              <td className="border border-gray-500 px-4 py-2">{message.status}</td>
              <td className="border border-gray-500 px-4 py-2">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                {!message.acknowledged && (
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleAcknowledgeMessage(message.id)}>OK</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMessages;
