"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import HomeProperty from "./components/WithoutLogin/Homeshowproperty/HomeProperty";
import GetStarted from "./components/WithoutLogin/Getstart/getstart";
import Mapall from "./components/Alllistingmap/Mapall";
import Value from "./components/WithoutLogin/OurValue/detail";
import About from "./components/WithoutLogin/about/aboutus";
import Image from "next/image";
import heroBg from "/public/aboutus/heroBackground.jpg";
import arrowIcon from "/public/aboutus/arrow.png";
import phoneIcon from "/public/aboutus/contact.png";
import mailIcon from "/public/aboutus/mail.png";

export default function Home() {
  const searchParams = useSearchParams();
  const search1 = searchParams.get("lat");
  const search2 = searchParams.get("lng");
  const uid = useSelector((state: any) => state.auth.token.uid);
  const address = "36, sardarnagar society Dhari, Amreli";
  const phone = "9327058588";
  const email = "ishitachovatiya15@gmail.com";

  const showMoreBtn = () => {};

  return (
    <>
      <section className="flex flex-col w-full h-screen">
        <Image
          src={heroBg}
          alt="bg image"
          fill
          className="w-full h-screen bg-no-repeat rounded-b-4xl object-cover object-center"
        />
        <div className="w-full h-screen relative p-4">
          <div className="relative h-screen text-center flex flex-col justify-center items-center p-6">
            <button className="hidden p-2 lg:block bg-orange-600 hover:bg-orange-500 px-2 py-1 rounded-2xl text-white h-10 w-38 font-black text-xs uppercase cursor-pointer">
              Home Sphere
            </button>
            <h1 className="font-normal text-7xl text-center mt-24 text-white capitalize">
              find Your Dream Home
              <br /> that suits you
            </h1>
            {/* Icons and Text under Heading */}
            <div className="hidden sm:flex mt-24 justify-center items-center">
              <div className="flex mr-11">
                <Image
                  src={arrowIcon}
                  alt="arrow icon"
                  className="w-5 h-5 mx-9 self-center"
                />
                <p className="text-white text-xl py-2">{address}</p>
              </div>

              <div className="flex ml-20 mr-20">
                <Image
                  src={phoneIcon}
                  alt="phone icon"
                  className="w-5 h-5 mx-9 self-center"
                />
                <p className="text-white text-xl py-2">{phone}</p>
              </div>

              <div className="flex ml-20">
                <Image
                  src={mailIcon}
                  alt="mail icon"
                  className="w-5 h-5 mx-9 self-center"
                />
                <p className="text-white text-xl py-2">{email}</p>
              </div>
            </div>
            {/* Show more button  */}
            <div className="absolute bottom-8 w-full text-center">
              <button
                onClick={showMoreBtn}
                className="text-blue-900 text-xl capitalize shadow-lg bg-white hover:bg-orange-500 hover:text-white px-4 py-1 rounded-3xl h-14 w-36"
              >
                Home List
              </button>
            </div>
          </div>
        </div>
      </section>

      <HomeProperty />
      {!uid && <GetStarted />}

      <About
        cardTitle1="15 years"
        cardSubText1="in business"
        cardTitle2="$1 billion"
        cardSubText2="property brokered"
        cardTitle3="10,000"
        cardSubText3="transactions"
      />
      <Value />
      <main className="max-w-[1500px] mx-auto px-6 sticky">
        {uid && <Mapall />}
      </main>
    </>
  );
}
