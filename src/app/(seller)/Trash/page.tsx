'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Trash() {
  const [deletedListings, setDeletedListings] = useState([]);
  const token = useSelector((state: any) => state.auth.token.access);
  const uid = useSelector((state:any) => state.auth.token.uid);
  useEffect(() => {
    const fetchDeletedListings = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/app2/deleted-listingsfetch/${uid}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeletedListings(response.data.deleted_listings);
      } catch (error) {
        console.error('Error fetching deleted listings:', error);
      }
    };

    fetchDeletedListings();
  }, [token]); // Include token in the dependency array

  return (
    <div>
      <h1>Deleted Listings</h1>
      <ul>
        {deletedListings.map((listing) => (
          <li key={listing.id}>
            <div>{listing.title}</div>
            <div>{listing.description}</div>
            {/* Add other listing details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trash;
