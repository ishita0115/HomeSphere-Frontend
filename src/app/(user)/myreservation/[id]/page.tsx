"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchListingDetail , removeReservation} from "@/app/apiService";
import Link from "next/link";
import { useSelector } from "react-redux";
import axios from "axios";

const MyBookings = () => {
  const [reservations, setReservations] = useState([]);
  const [listingData, setListingData] = useState({});
  const token = useSelector((state:any) => state.auth.token.access);
  const userId = useSelector((state:any) => state.auth.token.uid);
  
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetchListingDetail(`app2/mybooking/${userId}`, token);
        setReservations(response.data);
      
        
        setListingData(response.listing_data.reduce((acc: { [x: string]: any; }, listing: { id: string | number; }) => {
          acc[listing.id] = listing;
          return acc;
        }, {}));
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [userId, token]);

  const today = new Date(); // Get current date

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toDateString(); // Format date as string
  };
  const getBackgroundColor = (date: string | number | Date) => {
    const visitDate = new Date(date);
    if (visitDate.toDateString() === today.toDateString()) {
      return "bg-yellow-400"; // Today's date
    } else if (visitDate < today) {
      return "bg-red-400"; // Past date
    } else {
      return "bg-white"; // Future date
    }
  };
  const handleRemoveBooking = async (bookingId: any) => {
    try {
      await removeReservation(`app2/bookingsdelete/${bookingId}`, token);
      // Update the reservations state by filtering out the removed booking
      setReservations(reservations.filter((reservation) => reservation.id !== bookingId));
    } catch (error) {
      console.error("Error removing booking:", error);
    }
  };


  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <h1 className="my-6 text-2xl bg-[#0082cc] text-stone-50 flex items-center justify-center h-16 shadow-md border">My Reservations</h1>
      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className={`p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border rounded-xl bg-white`}>
           
            <div className="col-span-1">
              <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                  fill
                  src={listingData[reservation.Listing]?.image1} 
                  className="hover:scale-110 object-cover transition h-full w-full"
                  alt="house"
                />
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 ml-4">
              <h2 className="mb-4 text-xl mt-3 uppercase"><strong>{listingData[reservation.Listing]?.title}</strong></h2>

              <p className={`${getBackgroundColor(reservation.which_date)} mb-2 p-2`}><strong>Visit date:</strong> {formatDate(reservation.which_date)}</p>
              <p className="mb-2 p-2"><strong>Owner Name: </strong> {listingData[reservation.Listing]?.user_name}</p>

              <p className="mb-2 p-2"><strong>City: </strong> {listingData[reservation.Listing]?.city}</p>
              <p className="mb-3 mt-3 bg-yellow-300 rounded p-2"><strong>Status:  </strong> {reservation.statusmanage}</p>
             

              
                <button
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md"
                  onClick={() => handleRemoveBooking(reservation?.id)}
                >
                  Remove
                </button>       

              <Link 
                href={`/DetailHome/${reservation.Listing}`}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md ml-3"
              >
                Go to property
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyBookings;
