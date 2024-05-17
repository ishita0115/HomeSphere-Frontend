'use client'
import Image from "next/image";
import Listing from "../../app/components/Listing/Listing";
import Mapall from "../components/Alllistingmap/Mapall";
import Categories from "../components/navbar/Categories";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
export default function DetailHome() {
  const [showCategories, setShowCategories] = useState(true);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  return (
    <>
    <main className="max-w-[1500px] mx-auto px-6 pt-10">
    <button className="flex space-x-12 fixed top-[125px] text-white bg-[#0082cc] z-10 h-17 p-2 rounded" onClick={toggleCategories}><FaFilter /></button>
         {!showCategories && <Categories />}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {showCategories &&<Listing />}
        </div>
    </main >
    </>
  );
}
