"use client";
import React, { ChangeEvent } from "react";

interface FormData {
  title: string;
  home_type: string;
  address: string;
  country: string;
  city: string;
  description: string;
  extrafacility: string;
  bedrooms: number;
  bathrooms: number;
  sale_type: string;
  price: number;
  rental_choice?: string;
}

interface StepOneProps {
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const INPUT = "w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-primary placeholder-navy-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white";
const SELECT = "w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-primary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white appearance-none cursor-pointer";
const LABEL = "block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5";

const HOME_TYPES = ["Row House", "Colonial", "Flat", "Cottage", "Bungalow", "Apartment", "Villa"];
const RENTAL_CHOICES = ["per Day", "per Week", "per Month"];

const StepOne: React.FC<StepOneProps> = ({ formData, handleChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-card p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-navy-50">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <div>
          <h2 className="font-heading font-bold text-lg text-primary">Property Details</h2>
          <p className="text-xs text-navy-400">Tell buyers about your property</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className={LABEL} htmlFor="title">Property Title</label>
          <input className={INPUT} id="title" type="text" name="title" value={formData.title}
            onChange={handleChange} placeholder="e.g. Modern 3BHK Apartment in Bandra West" />
        </div>

        {/* Type + Sale Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL} htmlFor="home_type">Property Type</label>
            <div className="relative">
              <select className={SELECT} id="home_type" name="home_type" value={formData.home_type} onChange={handleChange}>
                <option value="">Select type</option>
                {HOME_TYPES.map(t => <option key={t} value={t.toLowerCase().replace(" ", "")}>{t}</option>)}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
          <div>
            <label className={LABEL} htmlFor="sale_type">Listing Type</label>
            <div className="relative">
              <select className={SELECT} id="sale_type" name="sale_type" value={formData.sale_type} onChange={handleChange}>
                <option value="">Select type</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Rental choice (conditional) */}
        {formData.sale_type === "For Rent" && (
          <div>
            <label className={LABEL} htmlFor="rental_choice">Rental Period</label>
            <div className="flex gap-3">
              {RENTAL_CHOICES.map(c => (
                <label key={c} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-all ${
                  formData.rental_choice === c.toLowerCase() ? "border-primary bg-primary text-white" : "border-navy-200 text-navy-600 hover:border-primary"
                }`}>
                  <input type="radio" name="rental_choice" value={c.toLowerCase()} checked={formData.rental_choice === c.toLowerCase()}
                    onChange={handleChange} className="sr-only" />
                  {c}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Country + City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={LABEL} htmlFor="country">Country</label>
            <input className={INPUT} id="country" type="text" name="country" value={formData.country}
              onChange={handleChange} placeholder="e.g. India" />
          </div>
          <div>
            <label className={LABEL} htmlFor="city">City</label>
            <input className={INPUT} id="city" type="text" name="city" value={formData.city}
              onChange={handleChange} placeholder="e.g. Mumbai" />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className={LABEL} htmlFor="address">Full Address</label>
          <textarea className={INPUT} id="address" name="address" rows={2} value={formData.address}
            onChange={handleChange} placeholder="Street, area, landmark…" />
        </div>

        {/* Description */}
        <div>
          <label className={LABEL} htmlFor="description">Description</label>
          <textarea className={INPUT} id="description" name="description" rows={4} value={formData.description}
            onChange={handleChange} placeholder="Describe your property — highlights, features, nearby places…" />
        </div>

        {/* Bedrooms + Bathrooms + Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={LABEL} htmlFor="bedrooms">Bedrooms</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V9a2 2 0 012-2h14a2 2 0 012 2v3M3 12v5h18v-5M3 12h18"/>
                </svg>
              </span>
              <input className={`${INPUT} pl-10`} id="bedrooms" type="number" name="bedrooms" min={1} max={10}
                value={formData.bedrooms} onChange={handleChange} placeholder="0" />
            </div>
          </div>
          <div>
            <label className={LABEL} htmlFor="bathrooms">Bathrooms</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v6H4v6zm0 0v3"/>
                </svg>
              </span>
              <input className={`${INPUT} pl-10`} id="bathrooms" type="number" name="bathrooms" min={1} max={10}
                value={formData.bathrooms} onChange={handleChange} placeholder="0" />
            </div>
          </div>
          <div>
            <label className={LABEL} htmlFor="price">Price (₹)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500 font-bold text-sm">₹</span>
              <input className={`${INPUT} pl-8`} id="price" type="number" name="price"
                value={formData.price} onChange={handleChange} placeholder="0" />
            </div>
          </div>
        </div>

        {/* Extra Facility */}
        <div>
          <label className={LABEL} htmlFor="extrafacility">Extra Facilities</label>
          <input className={INPUT} id="extrafacility" type="text" name="extrafacility"
            value={formData.extrafacility} onChange={handleChange}
            placeholder="e.g. Swimming Pool, Gym, Parking, 24/7 Security…" />
          <p className="text-xs text-navy-400 mt-1.5">Separate multiple facilities with commas</p>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
