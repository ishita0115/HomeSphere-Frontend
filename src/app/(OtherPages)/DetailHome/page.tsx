'use client';
import Listing from "../../components/Listing/Listing";
import Categories from "../../components/navbar/Categories";
import { useState } from "react";
import Footer from "../../components/footer/footer";

export default function DetailHome() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <div className="min-h-screen bg-surface-secondary">
      {/* Page header */}
      <div className="bg-white border-b border-navy-100 sticky top-20 z-40">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-lg text-primary">Property Listings</h1>
            <p className="text-xs text-navy-400 mt-0.5">Browse all available properties</p>
          </div>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer ${
              showCategories
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-primary border-navy-200 hover:border-primary hover:bg-navy-50'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            {showCategories ? 'Hide Filters' : 'Sort & Filter'}
          </button>
        </div>
      </div>

      {showCategories && <Categories />}
      <Listing />
      <Footer />
    </div>
  );
}
