"use client";

import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react"; // Import useEffect and useState hooks
import { fetchListingDetail } from "@/app/apiService";
import ReservationSidebar from "@/app/components/Listing/reservationbar";
import { MdLocationPin } from "react-icons/md";
import Mapcompo from "@/app/components/map/map";
import { useSelector } from "react-redux";
import FeedbackForm from "@/app/(user)/feedback/feedbackform";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { Stack } from "@mui/material";
import { Rating } from "@mui/material";

interface Property {
  rental_choice: any;
  id: any;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  title: string;
  price: string;
  sale_type: string;
  home_type: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  profilephoto: string;
  user: string;
  user_name: string;
  description: string;
  extrafacility: string;
}

interface Params {
  id: string;
}
interface Feedback {
  rating: number;
  message: string;
  feedback_by: string;
  profilephoto: string;
  user_fname: string;
  user_lname: string;
}
const PropertyDetailPage = ({ params }: { params: Params }) => {
  // Destructure the id from params
  const { id } = params;

  // Define state variables to store property data and loading/error status
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const token = useSelector((state: any) => state.auth.token.access);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activeStep, setActiveStep] = useState<number>(0);
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetchListingDetail(
          `app2/listingfeedback/${id}`,
          token
        );
        console.log(response);
        setFeedbacks(response);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch property data using the id
        const propertyData = await fetchListingDetail(
          `app2/detailisting/${id}`,
          token
        );
        setProperty(propertyData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const handleStepChange = (step: SetStateAction<number>) => {
    setActiveStep(step);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data</div>;
  }

  const cloudinaryUrl1 = `https://res.cloudinary.com/daajyumzx/${property?.profilephoto}`;

  const steps = [
    property?.image1 ?? "",
    property?.image2 ?? "",
    property?.image3 ?? "",
    property?.image4 ?? "",
  ];

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <div className="w-full h-[64vh] mb-4 overflow-hidden rounded relative border-white border-2">
            <Image
              src={steps[activeStep]}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {steps.map((image, index) => (
              <div
                key={index}
                onClick={() => handleStepChange(index)}
                style={{
                  width: 50,
                  height: 50,
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  cursor: "pointer",
                  marginRight: 10,
                  borderRadius: 5,
                }}
              />
            ))}
          </div>
        </div>
        <div className="py-6 pr-6 col-span-2 mt-4">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 uppercase">
            {property?.title} - {property?.home_type}
          </h1>
          <hr className="border-white" />

          <div className="text-lg text-black flex items-center mt-2">
            <h2 className="text-xl font-semibold mr-2">Total</h2>
            <span className="bg-orange-300 p-1">
              ₹ {property?.price} {property?.sale_type}
              {property?.sale_type === "For Rent" &&
                property?.rental_choice && <> - {property?.rental_choice}</>}
            </span>
          </div>

          <p className="mb-6 text-lg text-black mt-2 ml-2">
            <FaBed className="inline-block mr-2" size={20} />
            <span className="font-bold text-xl">{property?.bedrooms}</span>{" "}
            bedrooms -
            <FaBath className="inline-block ml-2 mr-2" size={20} />
            <span className="font-bold text-xl">
              {property?.bathrooms}
            </span>{" "}
            bathrooms
          </p>

          <div className="flex items-center gap-2">
            <MdLocationPin className="text-black" size={35} />
            <span className="text-lg text-black">
              {property?.address} ,
              <span className="font-bold"> {property?.city}</span> ,
              <span className="font-bold"> {property?.country}</span>
            </span>
          </div>

          <div className="mt-4 text-lg text-black flex items-center">
            <p className="font-bold mr-2">Extra Facility:</p>
            <p>{property?.extrafacility}</p>
          </div>

          <hr className="my-6 border-white" />
          <p className="font-bold mr-2 text-lg">Description :</p>
          <p className="mt-6 text-lg text-black">{property?.description}</p>
        </div>
      </div>
      <div className="col-span-6 lg:col-span-5">
        <div className="py-6 w-full">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-3">
            This is Home Location
          </h2>
          <Mapcompo
            latitude={property?.latitude}
            longitude={property?.longitude}
            address={property?.address}
            zoomdata={13}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="mt-3 pr-6 col-span-3">
          <p className="mt-2 text-lg">
            <Link
              href={`/sellerdetail/${property?.user}`}
              className="py-6 flex items-center space-x-4 bg-slate-100 p-2 rounded-xl mb-5"
            >
              <Image
                src={
                  property?.profilephoto
                    ? cloudinaryUrl1
                    : "/images/sellerdefaultimg.jpg"
                }
                width={50}
                height={50}
                className="rounded-full"
                alt="The user name"
              />
              <p>
                <strong>{property?.user_name}</strong> is This House Owner
              </p>
            </Link>
            <FeedbackForm listingId={property?.id} />
          </p>
        </div>
        <ReservationSidebar property={property} />
      </div>
      {feedbacks.length > 0 && (
  <div className="py-6">
    <h2 className="text-2xl font-bold mb-4">Feedbacks</h2>
    {feedbacks.map((feedback, index) => (
      <div
        key={index}
        className="mb-4 flex items-center space-x-4 bg-slate-100 p-2 rounded"
      >
        <div className="flex items-center space-x-4">
          <Image
            src={
              feedback?.profilephoto
                ? `https://res.cloudinary.com/daajyumzx/${feedback?.profilephoto}`
                : "/images/sellerdefaultimg.jpg"
            }
            width={50}
            height={50}
            className="rounded-full flex"
            alt="User profile"
          />
          <p>
            <strong>
              {feedback.user_fname} {feedback.user_lname}
            </strong>
          </p>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <Stack spacing={1}>
              <Rating
                name="size-large"
                defaultValue={2}
                size="large"
                value={feedback.rating}
                readOnly
              />
            </Stack>
          </div>
          <p>{feedback.message}</p>
        </div>
      </div>
    ))}


        </div>
      )}
    </main>
  );
};

export default PropertyDetailPage;
