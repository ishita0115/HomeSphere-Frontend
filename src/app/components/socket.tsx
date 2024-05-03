import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Adjust the URL as per your Django backend

export default socket;