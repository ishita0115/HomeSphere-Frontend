"use client"
import React, { useState, useEffect, ChangeEvent } from 'react';

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
  rental_choice?: string; // Optional if it's only applicable for 'For Rent' sale type
}

interface StepOneProps {
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const StepOne: React.FC<StepOneProps> = ({ formData, handleChange }) => {
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    localStorage.setItem('listingFormData', JSON.stringify(formData));
  }, [formData]);
  return (
    <div className="flex mt-3 dark:bg-gray-900 min-h-screen items-center justify-center">
      <div className="bg-white shadow-[#4689ab] w-3/5 items-center dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">Add Your Listing</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="home_type">
              Home Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="home_type"
              name="home_type"
              value={formData.home_type}
              onChange={handleChange}
            >
              <option value="rowhouse">Row House</option>
              <option value="colonial">Colonial</option>
              <option value="flat">Flat</option>
              <option value="cottage">Cottage</option>
              <option value="bungalow">Bungalow</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="address">
              Address
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="country">
              country
            </label>
            {/* <SelectCountry
              value={{ label: formData.country, value: formData.country }}
              onChange={handleCountryChange}
            /> */}
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="country"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="extrafacility">
              Extra Facility
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="extrafacility"
              type="text"
              name="extrafacility"
              value={formData.extrafacility}
              onChange={handleChange}
              placeholder="Extra Facility"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="bedrooms">
              Bedrooms
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bedrooms"
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
            />
            {errors.bedrooms && <p className="text-red-500 text-xs italic">{errors.bedrooms}</p>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="bathrooms">
              Bathrooms
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bathrooms"
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
            />
              {errors.bathrooms && <p className="text-red-500 text-xs italic">{errors.bathrooms}</p>}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="sale_type">
              Sale Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sale_type"
              name="sale_type"
              value={formData.sale_type}
              onChange={handleChange}
            >
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
            {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
          </div>
          {formData.sale_type === "For Rent" && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="Rental_choice">
                Rental Choice
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rental_choice"
                name="rental_choice"
                value={formData.rental_choice}
                onChange={handleChange}
              >
                <option value="per week">per Week</option>
                <option value="per month">per Month</option>
                <option value="per day">per Day</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <div>
        
      </div>
    </div >
  );
};

export default StepOne;
