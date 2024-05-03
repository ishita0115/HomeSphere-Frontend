"use client";
import Image from "next/image";
import { PropertyType } from "./Listing";
import { redirect, useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";
import { FaBed, FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import { CiHeart } from "react-icons/ci";
import FavoriteButton from "../models/Favoritebtn";
import Link from "next/link";
import { useState } from "react";
interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}
const ListingItems: React.FC<PropertyProps> = ({ property, markFavorite }) => {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to the property detail page when clicked on the listing item
    window.location.href = `/DetailHome/${property.id}`;
  };
  const sendtoseller = () => {
    // Navigate to the property detail page when clicked on the listing item
    window.location.href = `/sellerdetail/${property.user}`;
  };

  const handleViewMap = (hotel: Hotel) => {
    // Navigate to MapComponent page with the hotel location
    const queryString = `/map?lat=${property.latitude}&lng=${property.longitude}`;
    router.push(`/map${queryString}`);
  };
  console.log(property.latitude);
  const cloudinaryUrl = `https://res.cloudinary.com/daajyumzx/${property.profilephoto}`;
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
              <span className="absolute top-0 right-2 z-10 mt-3 ml-3 inline-flex select-none rounded-sm bg-[#0082cc] px-2 py-1 text-sm font-semibold text-white">
                {property.sale_type}{" "}
              </span>
            </div>

            <div className="mt-4">
              <h2
                className="line-clamp-1 text-2xl font-medium text-gray-800 md:text-lg"
                title="banglow"
              >
                {property.address}
              </h2>

              <div className="text-primary mt-2 inline-block whitespace-nowrap rounded-xl font-semibold leading-tight">
                <span className="text-sm uppercase"> {property.title} </span>
                {property.home_type}
              </div>
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
          <div className="mt-8 grid grid-cols-2">
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
              <div className="absolute mb-1 flex">
              <button onClick={handleViewMap} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <FaMapMarkerAlt style={{ width: '25px', height: '25px', color: 'black' }} />
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div
    //     className=" bg-gray-300 cursor-pointer rounded-xl"
    //     // onClick={() => router.push(`/properties/${property.id}`)}
    // >
    //     <div className="relative overflow-hidden aspect-square rounded-xl">
    //         {/* <Image
    //             fill
    //             src={property.image_url}
    //             sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
    //             className="hover:scale-110 object-cover transition h-full w-full"
    //             alt="Beach house"
    //         /> */}
    //     <Image
    //     fill
    //     src='/images/new2.jpeg'
    //     sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
    //     className="hover:scale-110 object-cover transition h-full w-full"
    //     alt="Beach house" />
    //     {/* {markFavorite && ( */}
    //             {/* <FavoriteButton
    //                 id={property.id}
    //                 is_favorite={property.is_favorite}
    //                 // markFavorite={(is_favorite) => markFavorite(is_favorite)}
    //             />
    //         )} */}
    //     </div >
    //     <div className="overflow-hidden">
    //     <div className="mt-2 ml-3">
    //         <p className="text-lg font-bold">villaaaa ssssssssssssssssssssssssssssssss </p>
    //     </div>

    //     <div className="mt-2 ml-3 mb-1">
    //         <p className="text-sm text-gray-500"><strong>30000 sssssssssssssssssssssssssssssfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff</strong> per month</p>
    //     </div>
    //     </div>
    // </div>
  );
};

export default ListingItems;
