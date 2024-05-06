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
import FeedbackForm from "@/app/(user)/feedback/feedbackform";


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
            
             {/* <div id="default-carousel" className="relative w-full" data-carousel="slide">
   
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src={property?.image3} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" layout="fill" objectFit="cover" alt="..." />
        </div>
        
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src={property.image3} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" layout="fill" objectFit="cover" alt="..." />
        </div>
       
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src={property.image3} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" layout="fill" objectFit="cover" alt="..." />
        </div>
       
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src={property.image3} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" layout="fill" objectFit="cover" alt="..." />
        </div>
       
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image src={property.image3} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" layout="fill" objectFit="cover" alt="..." />
        </div>
    </div>
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
   
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div> */}
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
            <FeedbackForm />
          </p>
         
        </div>

        <ReservationSidebar property={property} />
      </div>
    </main>
  );
};

export default PropertyDetailPage;
