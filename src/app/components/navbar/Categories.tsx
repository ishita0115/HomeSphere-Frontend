"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListingItems from "../Listing/Listingcard";

const SORT_OPTIONS = [
  { key: "min_max_price", label: "Price: Low to High", icon: "↑₹" },
  { key: "max_min_price", label: "Price: High to Low", icon: "↓₹" },
  { key: "high_rating",   label: "Top Rated",          icon: "★" },
  { key: "low_rating",    label: "Lowest Rated",       icon: "☆" },
  { key: "bhk_wise",      label: "BHK: Low to High",   icon: "🛏" },
];

const getSortBy = (category: string) => {
  const map: Record<string, string> = {
    min_max_price: "price_asc",
    max_min_price: "price_desc",
    high_rating:   "rating_desc",
    low_rating:    "rating_asc",
    bhk_wise:      "bedrooms_asc",
  };
  return map[category] ?? "";
};

const Categories = () => {
  const [selected, setSelected] = useState("");
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_HOST}/app2/listinglist/`, { sort_by: getSortBy(selected) })
      .then(r => setListings(r.data))
      .catch(e => console.error("Sort fetch error:", e))
      .finally(() => setLoading(false));
  }, [selected]);

  return (
    <div className="bg-white border-b border-navy-100">
      <div className="max-w-[1400px] mx-auto px-6 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <span className="text-xs font-semibold text-navy-400 flex-shrink-0 mr-1">Sort by:</span>
          {SORT_OPTIONS.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setSelected(selected === key ? "" : key)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer ${
                selected === key
                  ? "bg-primary text-white border-primary shadow-card"
                  : "bg-white text-navy-600 border-navy-200 hover:border-primary/50 hover:text-primary"
              }`}
            >
              <span className="text-base leading-none">{icon}</span>
              {label}
            </button>
          ))}
          {selected && (
            <button
              onClick={() => { setSelected(""); setListings([]); }}
              className="flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-navy-400 hover:text-primary transition-colors cursor-pointer ml-auto"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Sorted results */}
      {selected && (
        <div className="max-w-[1400px] mx-auto px-6 pb-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="property-card animate-pulse overflow-hidden">
                  <div className="h-48 bg-navy-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-navy-100 rounded w-3/4" />
                    <div className="h-3 bg-navy-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-6">
              {listings.map((p: any) => <ListingItems key={p.id} property={p} />)}
            </div>
          ) : (
            <p className="text-center text-navy-400 text-sm py-6">No results found for this sort.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
