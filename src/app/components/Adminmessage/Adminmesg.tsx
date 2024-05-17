import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { fetchListingDetail, removeReservation } from "@/app/apiService";

interface Message {
  id: number;
  sender_first_name: string;
  sender_email: string;
  message: string;
  status: string;
  acknowledged: boolean;
}

const AdminMessages = () => {
  const token = useSelector((state: any) => state.auth.token.access);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetchListingDetail("api/contact", token);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [token]);

  const handleDeleteMessage = async (id: number) => {
    try {
      await removeReservation(`api/contact/${id}/`, token);
      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };
  const handleAcknowledgeMessage = async (id: number) => {
    try {
      await axios.put(
        `http://localhost:8000/api/contact/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(
        messages.map((message) => {
          if (message.id === id) {
            return { ...message, status: "OK" };
          }
          return message;
        })
      );
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
              <td className="border border-gray-500 px-4 py-2">
                {message.sender_first_name}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {message.sender_email}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {message.message}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {message.status}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  Delete
                </button>
                {!message.acknowledged && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
                    onClick={() => handleAcknowledgeMessage(message.id)}
                  >
                    OK
                  </button>
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
