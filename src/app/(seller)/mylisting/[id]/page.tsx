'use client'
'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchListingDetail } from "@/app/apiService";
import ContactButton from "@/app/components/models/ContactButton";
import ListingItems from "@/app/components/Listing/Listingcard";
import { useSelector } from "react-redux";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import sellermiddleware from "../../sellermiddleware";

const SellerDetail = ({ params }: { params: { id: string } }) => {
  const [landlord, setLandlord] = useState<any>(null);
  const [sellerData, setSellerData] = useState<any>(null);
  const token = useSelector((state: any) => state.auth.token.access);

  useEffect(() => {
    const fetchLandlordData = async () => {
      try {
        const response = await fetchListingDetail(`app2/mylistings/${params.id}`, token);
        if (response) {
          setLandlord(response);
        } else {
          console.error("No data found for landlord with ID:", params.id);
        }
      } catch (error) {
        console.error("Error fetching landlord details:", error);
      }
    };

    fetchLandlordData();
  }, [params.id, token]);

  useEffect(() => {
    if (landlord) {
      const userData = Object.keys(landlord).map(key => landlord[key]);
      const userAtIndex0 = userData[0];

      const fetchSellerData = async () => {
        try {
          const response = await fetchListingDetail(`api/UserDetailView/${userAtIndex0.user}`, token);
          if (response) {
            setSellerData(response);
          } else {
            console.error("No data found for seller with ID:", params.id);
          }
        } catch (error) {
          console.error("Error fetching seller details:", error);
        }
      };

      fetchSellerData();
    }
  }, [landlord, params.id, token]);

  if (!landlord || !sellerData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="col-span-1 mb-4 mt-4">
          <div className="flex flex-col items-center p-6 rounded-xl border bg-white border-gray-300 shadow-xl">
            <Image
              src={sellerData.profilephoto ? sellerData.profilephoto : "/images/defaultuser.png"}
              width={200}
              height={200}
              alt="Landlord name"
              className="rounded-full"
            />
            <h1 className="mt-6 text-2xl">{sellerData.first_name} {sellerData.last_name}</h1>
            <div className="flex items-center font-medium text-gray-800 mt-2">
              <MdEmail className="mr-2" />{sellerData.email}
            </div>
            <div className="flex items-center font-medium text-gray-800 mt-1">
              <FaPhone className="mr-2" />{sellerData.mobileno}
            </div>
          </div>
        </aside>
        <div className="col-span-1 md:col-span-3 pl-0 md:pl-6">
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {landlord && landlord.map((property: any) => (
                <ListingItems key={property.id} property={property} />
              ))}
              
            </div>
            
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default sellermiddleware(SellerDetail);
