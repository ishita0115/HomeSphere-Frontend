import React, { useState, useEffect } from "react";
import axios from "axios";
import ListingItems from "../Listing/Listingcard";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortedListings, setSortedListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/app2/listinglist/",
          {
            sort_by: getSortByValue(selectedCategory),
          }
        );
        setSortedListings(response.data);
      } catch (error) {
        console.error("Error fetching sorted listings:", error);
      }
    };

    if (selectedCategory) {
      fetchData();
    }
  }, [selectedCategory]);

  const handleCategorySelection = (category: React.SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  const getSortByValue = (category: string) => {
    switch (category) {
      case "min_max_price":
        return "price_asc";
      case "max_min_price":
        return "price_desc";
      case "high_rating":
        return "rating_desc";
      case "low_rating":
        return "rating_asc";
      case "bhk_wise":
        return "bedrooms_asc";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="flex items-center space-x-12 fixed top-[110px] bg-white z-10">
        <div
          onClick={() => handleCategorySelection("min_max_price")}
          className={`pb-4 flex flex-col ml-3 items-center space-y-2 border-b-2 ${
            selectedCategory === "min_max_price"
              ? "border-black"
              : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <span className="text-xs">Min-Max Price</span>
        </div>

        <div
          onClick={() => handleCategorySelection("high_rating")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            selectedCategory === "high_rating" ? "border-black" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <span className="text-xs">High Rating</span>
        </div>

        <div
          onClick={() => handleCategorySelection("low_rating")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            selectedCategory === "low_rating" ? "border-black" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <span className="text-xs">Low Rating</span>
        </div>

        <div
          onClick={() => handleCategorySelection("bhk_wise")}
          className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
            selectedCategory === "bhk_wise" ? "border-black" : "border-white"
          } opacity-60 hover:border-gray-200 hover:opacity-100`}
        >
          <span className="text-xs">BHK Wise</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-4">
        {sortedListings &&
          sortedListings.map((property: any) => (
            <ListingItems key={property.id} property={property} />
          ))}
      </div>
    </>
  );
};

export default Categories;
