"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react"; // Import useEffect and useState hooks
import { fetchListingDetail } from "@/app/apiService";
import ReservationSidebar from "@/app/components/Listing/reservationbar";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import Mapcompo from "@/app/components/map/map";
import { useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import SellerDetail from "@/app/(seller)/sellerdetail/[id]/page";


const PropertyDetailPage = ({ params }) => {
  // Destructure the id from params
  const { id } = params;

  // Define state variables to store property data and loading/error status
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state: any) => state.auth.token.access);
  
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property data using the id
        const propertyData = await fetchListingDetail(`app2/detailisting/${id}`,token);
        setProperty(propertyData);
        console.log("++++", propertyData)
        setLoading(false); // Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error); // Set error state if data fetching fails
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchData(); // Invoke the fetchData function
  }, [id]); // Call useEffect whenever the id changes

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  if (error) {
    return <div>Error fetching data</div>; // Render error message if data fetching fails
  }
  const cloudinaryUrl = `https://res.cloudinary.com/daajyumzx/${property.profilephoto}`;
  // Render property details once data is fetched successfully
  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative border-white">
            <Image
              src={property.image1}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="py-6 pr-6 col-span-2 mt-4">
          <h1 className="mb-4 text-4xl">{property.title}</h1>
          <h2>Total</h2> <p>
              ₹ {property.price} {property.sale_type}
            </p> 
          <span className="mb-6 block text-lg text-gray-600">
            {property.guests} guests - {property.bedrooms} bedrooms -{" "}
            {property.bathrooms} bathrooms
          </span>

          <div className="flexStart" style={{ gap: "1rem" }}>
            <ul>
           
              <li>
                
              <span className="secondaryText">

              <MdLocationPin size={25} /> 
              {property?.address} {property?.city} {property?.country}
            </span>
              </li>
            </ul>
          
            
          </div>
       
          <hr />

          <hr />

          <p className="mt-6 text-lg">{property.description}</p>
          <hr />
          <CiHeart className="mr-2 text-2xl text-red-600 hover:text-red-800" />
        </div>
      </div>
      <div className="col-span-6 lg:col-span-5">
        <div className="py-6 w-full">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-3">This is Home Location</h2>
          <Mapcompo
            latitude={property.latitude}
            longitude={property.longitude}
            address={property.address}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <p className="mt-6 text-lg">
            <Link
              href={`/sellerdetail/${property.user}`}
              className="py-6 flex items-center space-x-4"
            >
             
              <Image
                src={property.profilephoto ? cloudinaryUrl :"/images/sellerdefaultimg.jpg" }
                width={50}
                height={50}
                className="rounded-full"
                alt="The user name"
              />
             

              <p>
                <strong>{property.user_name}</strong> is This House Owner
              </p>
            </Link>
          </p>
        </div>

        <ReservationSidebar property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
