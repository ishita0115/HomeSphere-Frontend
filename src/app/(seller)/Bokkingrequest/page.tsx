'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const token = useSelector((state: any) => state.auth.token.access);
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8000/app2/seller-bookings/');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAction = async (bookingId: any, action: string) => {
    try {
      await axios.post(`/api/bookings/${bookingId}/${action}/`);
      // Refresh bookings after action
      fetchBookings();
    } catch (error) {
      console.error(`Error ${action}ing booking ${bookingId}:`, error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
            <th>ID</th>
            <th>Listing</th>
            <th>Date</th>
            <th>Booked By</th>
            <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
          <td>{booking.id}</td>
          <td>{booking.Listing}</td>
          <td>{booking.which_date}</td>
          <td>{booking.booked_by}</td>
          <td>{booking.statusmanage}
              <button onClick={() => handleAction(booking.id, 'accept')}>Accept</button>
              <button onClick={() => handleAction(booking.id, 'reject')}>Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookingTable;
