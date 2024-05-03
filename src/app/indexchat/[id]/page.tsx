// components/chatmsg.js
'use client'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Chatmsg = ({ params }: { params: { id: string } }) => {
    const [newMessage, setNewMessage] = useState('');
    const token = useSelector((state) => state.auth.token.access);
    const uid = useSelector((state) => state.auth.token.uid);
 
    const sendMessage = async () => {
      try {
        // Make a POST request to the Django backend API endpoint
        await axios.post('http://localhost:8000/app3/messages/', { body: newMessage, conversation_id: `${params.id}`,sent_to_id:uid}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        // Clear the input field after sending the message
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  };

export default Chatmsg;
