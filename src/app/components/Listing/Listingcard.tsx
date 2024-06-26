"use client";
import Image from "next/image";
import { PropertyType } from "./Listing";
import { redirect, useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";
import { FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import FavoriteButton from "../models/Favoritebtn";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import DeleteButton from "../models/Deletebtn";
import Permenentdeletebtn from "../models/Permenentdeletebtn";
import RestoreButton from "../models/RestoreButton";

interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}

const ListingItems: React.FC<PropertyProps> = ({ property, markFavorite }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const router = useRouter();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isMyListingPage = pathname.includes("/mylisting/");
  const isTrashPage = pathname.includes("/Trash");
  const handleClick = () => {
    router.push(`/DetailHome/${property.id}`);
  };
  const sendtoseller = () => {
    router.push(`/sellerdetail/${property.user}`);
  };

  const handleViewMap = () => {
    const queryString = `/?lat=${property.latitude}&lng=${property.longitude}`;
    router.push(`/${queryString}`);
  };
  const handleUpdateListing = () => {
    router.push(`/addlistingform/${property.id}`);
  };
  const handleDeleteSuccess = () => {
    router.push("/");
  };

  const handleDeleteError = () => {
    // Handle delete error (e.g., show error message)
  };

  const cloudinaryUrl = `https://res.cloudinary.com/daajyumzx/${property.profilephoto}`;

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/app2/listing/${property.id}/rating/`
        );
        const ratings = response.data.average_rating;
        if (ratings) {
          setAverageRating(ratings);
        } else {
          setAverageRating(0);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRating();
  }, [property.id]);

  return (
    <div className="relative mx-auto w-full">
      <div className="relative rounded-lg inline-block w-full transform transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer">
        <div className="rounded-lg bg-white p-4 shadow">
          <div onClick={handleClick}>
            <div className="relative flex h-52 justify-center overflow-hidden rounded-lg">
              <div className="w-full transform transition-transform duration-500 ease-in-out hover:scale-110">
                <div className="absolute inset-0 bg-black bg-opacity-80">
                  <Image
                    src={property.image1}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 mb-2 flex rounded "
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              >
                <div className="flex items-center text-gray-200 shadow-sm">
                  <div className="flex justify-start">
                    {markFavorite && (
                      <FavoriteButton
                        id={property.id}
                        is_favorite={property.is_favorite}
                        markFavorite={(is_favorite) =>
                          markFavorite(is_favorite)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
              <span className="absolute mt-5 top-0 right-2 z-10ml-3 inline-flex select-none rounded-sm bg-[#0082cc] px-2 py-1 text-sm font-semibold text-white">
                {property.sale_type}{" "}
              </span>
            </div>
            <div className="mt-3">₹ {property.price}</div> 
            <div className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                <span className="text-sm uppercase"> {property.title} </span>
                - {property.home_type}
              </div>
              
            <div className="mt-2">
              <h2
                className="line-clamp-1 text-xl font-medium text-gray-800 md:text-lg"
                title="banglow"
              >
                {property.address}
              </h2>
            </div>
            <div className="justify-center">
              <div className="mt-4 flex space-x-3 overflow-hidden rounded-lg px-1 py-1">
                <div className="flex items-center font-medium text-gray-800">
                  <FaBed className=" mr-2 text-blue-900" />
                  {property.bedrooms}
                </div>

                <div className="flex items-center font-medium text-gray-800">
                  <GiBathtub className=" mr-2 text-blue-900" />
                  {property.bathrooms}
                </div>
                <div className="flex items-center font-medium text-gray-800">
                  <MdHome className="mr-2 text-blue-900" />
                  {property.city}({property.country})
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full">
            <div className="relative rounded-lg inline-block w-full">
              {averageRating !== null ? (
                <div className="flex items-center mt-2">
                  <Stack spacing={1}>
                    <Rating
                      name="average-rating"
                      value={averageRating}
                      precision={0.5}
                      readOnly
                    />
                  </Stack>
                  <span className="ml-2 text-gray-600">
                    {averageRating.toFixed(2)}
                  </span>
                </div>
              ) : (
                <p className="text-gray-600 mt-2">No ratings yet.</p>
              )}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2">
            {/* Grid 1 */}
            <div className="flex items-center" onClick={sendtoseller}>
              <Image
                src={
                  property.profilephoto
                    ? cloudinaryUrl
                    : "/images/sellerdefaultimg.jpg"
                }
                width={50}
                height={50}
                className="rounded-full"
                alt="The user name"
              />
              <div className="line-clamp-1 ml-2 text-gray-800">
                {property.user_name}
              </div>
            </div>

            {/* Grid 2 */}
            <div className="flex items-center justify-end mr-5">
              <div className="absolute mb-1 flex ">
                <button
                  onClick={handleViewMap}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ width: "25px", height: "25px", color: "black" }}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
          {isMyListingPage && (
            <div className="flex justify-center items-center h-full">
              <button
                onClick={handleUpdateListing}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 mx-auto"
              >
                Update Listing
              </button>
            </div>
          )}
          {isMyListingPage && (
            <div className="flex justify-center items-center h-full pl-4">
              <DeleteButton
                listingId={property.id}
                onSuccess={handleDeleteSuccess}
                onError={handleDeleteError}
              />
            </div>
          )}
          </div>
          <div className="flex justify-center">
          {isTrashPage && (
            <div className="flex justify-center items-center h-full">
              <Permenentdeletebtn
                listingId={property.id}
                onSuccess={handleDeleteSuccess}
                onError={handleDeleteError}
              />
            </div>
          )}
                    {isTrashPage && (
            <div className="flex justify-center items-center h-full">
              <RestoreButton
                listingId={property.id}
                onSuccess={handleDeleteSuccess}
                onError={handleDeleteError}
              />
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingItems;
