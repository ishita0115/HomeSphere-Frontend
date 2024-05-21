'use client'
import Listing from "../../components/Listing/Listing";
import Categories from "../../components/navbar/Categories";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import Footer from "../../components/footer/footer";
export default function DetailHome() {
  const [showCategories, setShowCategories] = useState(true);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  return (
    <>
   
    <button className="flex space-x-12 fixed top-[125px] text-white bg-[#0082cc] z-10 h-17 p-2 rounded" onClick={toggleCategories}><FaFilter /></button>
         {!showCategories && <Categories />}
          {showCategories &&<Listing />}
    <Footer />
    </>
  );
}
