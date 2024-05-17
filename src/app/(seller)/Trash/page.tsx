'use client'
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ListingItems from '@/app/components/Listing/Listingcard';
import { profileApiservive } from '@/app/apiService';
import sellermiddleware from '../sellermiddleware';

function Trash() {
  const [deletedListings, setDeletedListings] = useState([]);
  const token = useSelector((state: any) => state.auth.token.access);
  const uid = useSelector((state:any) => state.auth.token.uid);
  useEffect(() => {
    const fetchDeletedListings = async () => {
      try {
        const response = await profileApiservive.get(`/app2/deleted-listingsfetch/${uid}/`, token)
        setDeletedListings(response.deleted_listings);
      } catch (error) {
        console.error('Error fetching deleted listings:', error);
      }
    };

    fetchDeletedListings();
  }, [uid]);

  return (
    <div>
      <h1 className='p-3 bg-yellow-600 text-center text-2xl'>Deleted Homes</h1>
      
      <div className="col-span-1 md:col-span-3 pl-0 md:pl-2">
          <div className="mt-4 m-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deletedListings.map((property:any) => (
            <ListingItems key={property.id} property={property} />
        ))}
    </div>
    </div>
    </div>
    </div>
  );
}

export default sellermiddleware(Trash);
