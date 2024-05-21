"use client"
import React, { useState } from "react";
import Back from "./Back";
import Heading from "./Heading";
import Image from "next/image";
import { IoIosHome } from "react-icons/io";

interface AboutProps {
  cardTitle1: string;
  cardTitle2: string;
  cardTitle3: string;
  cardSubText1: string;
  cardSubText2: string;
  cardSubText3: string;
}

const About: React.FC<AboutProps> = ({
  cardTitle1,
  cardTitle2,
  cardTitle3,
  cardSubText1,
  cardSubText2,
  cardSubText3,
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <>
      <section className="px-4 py-8">
        <Back
          name="About Us"
          title="About Us - Who We Are?"
          cover="/images/about.jpg"
        />
        <div className="container mx-auto flex flex-col md:flex-row justify-between mt-8 ml-20">
          <div className="md:w-1/2 md:pr-4 mt-20">
            <Heading
              title="Our Story"
              subtitle="Experience Home Sphere Innovation"
            />

            <p className={`text-justify ${showFullContent ? '' : 'truncate'}`}>
              Welcome to HomeSphere, where innovation meets Home Sphere.HomeSphere.com stands. platforms to homeowners, landlords, developers. Whether it's new homes, resale properties, rentals, plots, or co-living spaces, we've got you covered.
              {showFullContent ? (
                <>
                 delivers services advertising, marketing, sales solutions, personalized search, virtual reality experiences, and comprehensive post-transaction services for both buyers and renters.
                  Our vision? To redefine the Indian property landscape. Our mission? To become the preferred destination for consumers and partners alike, guiding them journey of discovering, renting, buying, selling, and financing homes, all while leveraging data, design, and technology.
                </>
              ) : (
                " Curious for more? Click 'More About Us' to unveil the full narrative."
              )}
            </p>
            {!showFullContent ? (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={toggleContent}
              >
                More About Us
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={toggleContent}
              >
                Less About Us
              </button>
            )}
          </div>
          <div className="md:w-1/2 mt-8 md:pl-2 ml-34 mr-0 ml-8" >
            <img
              src="/images/immio.jpg"
              alt="Company Office"
              width={450}
              height={300}
            />
          </div>
        </div>
      </section>
      <div id="about-container" className="relative p-4 mb-4">
      <div className="flex justify-center items-center">
      <button className="text-blue-900 text-xl capitalize shadow-lg bg-white hover:bg-orange-500 hover:text-white px-4 py-1 rounded-3xl h-14 w-36">
          Our Story
        </button>
      </div>

      <div className="relative ">
        <div className="flex flex-col justify-center items-center mt-10">
          <p
            className="text-9xl sm:text-10xl text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full dark:text-white
          "
          >
            OUR STORY
          </p>
          <p className="text-4xl text-blue-900 font-bold text-center z-0 relative mt-16 dark:text-gray-300">
            We Will Find the Best Option
          </p>
        </div>
      </div>

      <div className="relative justify-center items-center">
        <p className="font-medium text-base text-center mt-20  text-bluePText">
          Real estate is &quot;property consisting of land and the buildings on
          it, along with its natural resources such as crops,
          <br /> minerals or water, immovable property of this nature; an
          interest vested in this (also) an item of real property,
          <br /> (more generally) buildings or housing in general.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center mt-[50px] ml-[28px]">
        <div className="bg-white  py-35 px-10 h-[160px] w-[350px] mr-[30px] flex flex-col justify-center items-center rounded-[10px] shadow-md mb-5 hover:bg-orange-500 hover:text-white ">
          <p className="font-medium text-3xl leading-[50px] text-blueCardTitle capitalize dark:text-gray-100">
            {cardTitle1}
          </p>
          <p className="text-sm leading-8 text-center text-blueCardSubTitle dark:text-white">
            {cardSubText1}
          </p>
        </div>
        <div className="bg-white py-35 px-10 h-[160px] w-[350px] mr-[30px] flex flex-col justify-center items-center rounded-[10px] shadow-md mb-5 dark:bg-slate-700 hover:bg-orange-500 hover:text-white">
          <p className="font-medium text-3xl leading-[50px] text-blueCardTitle capitalize dark:text-gray-100">
            {cardTitle2}
          </p>
          <p className="text-sm leading-8 text-center text-blueCardSubTitle dark:text-white">
            {cardSubText2}
          </p>
        </div>
        <div className="bg-white py-35 px-10 h-[160px] w-[350px] mr-[30px] flex flex-col justify-center items-center rounded-[10px] shadow-md mb-5 dark:bg-slate-700 hover:bg-orange-500 hover:text-white">
          <p className="font-medium text-3xl leading-[50px] text-blueCardTitle capitalize dark:text-gray-100">
            {cardTitle3}
          </p>
          <p className="text-sm leading-8 text-center text-blueCardSubTitle dark:text-white">
            {cardSubText3}
          </p>
        </div>
      </div>
    </div>
    <div id="services" className="relative p-4 mb-4">
      <div className="flex justify-center items-center">
      <button className="text-blue-900 text-xl capitalize shadow-lg bg-white hover:bg-orange-500 hover:text-white px-4 py-1 rounded-3xl h-14 w-36">
          services
        </button>
      </div>
      <div className="relative ">
        <div className="flex flex-col justify-center items-center mt-20">
          <p className=" text-8xl sm:text-10xl text-blue-700 opacity-5 font-black text-center z-0 absolute top-0 left-0 w-full uppercase  dark:text-white">
            services
          </p>
          <p className="text-4xl text-blue-900 font-bold text-center z-0 relative mt-7 sm:mt-14 dark:text-gray-300 ">
            Services for Maximum Efficiency
          </p>
        </div>
      </div>

      <div className="relative justify-center items-center">
        <p className="font-medium text-base text-center mt-20  text-bluePText">
          We have developed a unique space where you can work and create. We
          thought of everything to the smallest
          <br /> detail. You will be able to conduct your business, conduct
          meetings, meetings
        </p>
      </div>

      {/* 5 icons and names of services */}
      <div className="grid grid-cols-2 sm:flex justify-center items-center mt-16 ml-[40px]">
        <div className="flex flex-col justify-center items-center mr-[30px] sm:mr-[60px] sm:ml-[50px] hover:scale-125 ease-in duration-200">
          <div className="bg-white h-[120px] w-[120px] mr-[30px] flex flex-col justify-center items-center rounded-[120px] shadow-xl p-[10px] gap-[10px] mb-5 dark:bg-gray-700">
          <Image src="/aboutus/house.png" alt="house" width={44}   height={40} /> 
            <p className="font-bold text-sm leading-6  text-center text-blueCardTitle dark:text-gray-200 ">
              House
            </p>
          </div>
        </div>

        <div className="flex flex-col mr-[60px] hover:scale-125  ease-in duration-200">
          <div className="bg-white h-[120px] w-[120px] mr-[30px] flex flex-col justify-center items-center rounded-[120px] shadow-xl p-[10px] gap-[10px] mb-5 dark:bg-gray-700">
          <Image src="/aboutus/apartment.png" alt="house" width={44}   height={40} /> 
            <p className="font-bold text-sm leading-6  text-center text-blueCardTitle dark:text-gray-200 ">
              Apartment
            </p>
          </div>
        </div>
        <div className="flex flex-col  mr-[60px] hover:scale-125  ease-in duration-200">
          <div className="bg-white h-[120px] w-[120px] mr-[30px] flex flex-col justify-center items-center rounded-[120px] shadow-xl p-[10px] gap-[10px] mb-5 dark:bg-gray-700">
          <Image src="/aboutus/office.png" alt="house" width={44}   height={40} /> 
            <p className="font-bold text-sm leading-6  text-center text-blueCardTitle dark:text-gray-200 ">
              flat
            </p>
          </div>
        </div>
        <div className="flex flex-col  mr-[60px] hover:scale-125  ease-in duration-200">
          <div className="bg-white h-[120px] w-[120px] mr-[30px] flex flex-col justify-center items-center rounded-[120px] shadow-xl p-[10px] gap-[10px] mb-5 dark:bg-gray-700">
          <Image src="/aboutus/warehouse.png" alt="house" width={44}   height={40} /> 
            <p className="font-bold text-sm leading-6  text-center text-blueCardTitle dark:text-gray-200 ">
              colonial
            </p>
          </div>
        </div>

       
      </div>
    </div>
    </>
  );
};

export default About;
