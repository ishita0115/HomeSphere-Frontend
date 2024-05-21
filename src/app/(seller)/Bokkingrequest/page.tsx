"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BiCheck } from "react-icons/bi";
import sellermiddleware from "../sellermiddleware";
interface BookingType {
  id: number;
  Listing: string;
  which_date: string;
  booked_by: string;
  statusmanage: string;
}

const BookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [buyerData, setBuyerData] = useState<any[]>([]);
  const token = useSelector((state: any) => state.auth.token.access);
  const [listingData, setListingData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/app2/seller-bookings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data && Array.isArray(response.data.data)) {
        setLoading(false);
        setBookings(response.data.data);
        setListingData(
          response.data.listing_data.reduce(
            (acc: { [x: string]: any }, listing: { id: string | number }) => {
              acc[listing.id] = listing;
              return acc;
            },
            {}
          )
        );
        setBuyerData(response.data.buyer_data);
      } else {
        console.error("Invalid data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleAction = async (bookingId: any, action: string) => {
    try {
      let url = `http://localhost:8000/app2/seller-bookings/${bookingId}/${action}/`;
      if (action === "reject") {
        const message = prompt("Enter rejection message:");
        if (message === null) return;
        await axios.post(
          url,
          { message },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(url, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchBookings();
    } catch (error) {
      console.error(`Error ${action}ing booking ${bookingId}:`, error);
    }
  };
  if (loading) return <div>No bookings done by any buyer.</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Booking List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Index</th>
              <th className="p-3">Home</th>
              <th className="p-3">Date</th>
              <th className="p-3">Buyer's Name</th>
              <th className="p-3">Buyer's Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-center">
            {bookings.map((booking: BookingType, index) => (
              <tr key={booking.id} className="border-b border-gray-300">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 overflow-hidden rounded-full mr-3">
                      <img
                        src={listingData[booking.Listing]?.image1}
                        alt="Listing Image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {listingData[booking.Listing]?.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {listingData[booking.Listing]?.city}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{booking.which_date}</td>
                <td className="p-3">
                  {`${
                    buyerData.find(
                      (buyer) => buyer.buyer_id === booking.booked_by
                    )?.buyer_fname
                  } ${
                    buyerData.find(
                      (buyer) => buyer.buyer_id === booking.booked_by
                    )?.buyer_lname
                  }`}
                </td>
                <td className="p-3">
                  {
                    buyerData.find(
                      (buyer) => buyer.buyer_id === booking.booked_by
                    )?.buyer_email
                  }
                </td>
                <td className="p-3">{booking.statusmanage}</td>
                <tr>
                  <td className="p-4">
                    {booking.statusmanage && (
                      <>
                        <button
                          className="bg-green-900 text-white p-2 rounded flex"
                          onClick={() => handleAction(booking.id, "accept")}
                        >
                          Done
                          <BiCheck className="mt-1" />
                        </button>
                        <button
                          className="bg-yellow-700 text-white p-2 mt-3 rounded"
                          onClick={() => handleAction(booking.id, "reject")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default sellermiddleware(BookingTable);
