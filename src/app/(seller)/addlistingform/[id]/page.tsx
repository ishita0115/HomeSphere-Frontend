'use client'
// Import necessary modules
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import apiService, { fetchListingDetail } from '@/app/apiService'; // Assuming you have an API service for fetching and updating listing details

const MyForm = ({ params }: { params: { id: number } }) => {
  // Get token from Redux store
  const token = useSelector((state: any) => state.auth.token.access);

  // State to hold the form data
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    city: '',
    description: '',
    extrafacility: '',
    rental_choice: '',
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    sale_type: '',
    home_type: '',
    country: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    latitude: 0,
    longitude: 0,
  });

  // State to toggle between view and edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch listing data
  const fetchListingData = async () => {
    try {
      const response = await fetchListingDetail(`app2/detailisting/${params.id}`, token);
      const data = response;
      setFormData(data);
    } catch (error) {
      console.error('Error fetching listing data:', error);
    }
  };

  // Function to handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    const response = await apiService.put(`/app2/ManageListingupdatedeleteView/${params.id}/`, formDataToSend, token);
    console.log('Listing updated:', response);
    setIsEditing(false);
  } catch (error) {
    console.error('Error updating listing:', error);
  }
};

  // Fetch listing data when component mounts
  useEffect(() => {
    fetchListingData();
  }, [params.id]); // Fetch data when the ID changes

  return (
    <div className="container mx-auto py-8">
    <h1 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Listing' : 'View Listing'}</h1>
    {isEditing ? (
      // Edit mode
      <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto">
       
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            country
          </label>
          <input type="text" name="country" id="country" value={formData.country} onChange={handleInputChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            city
          </label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            description
          </label>
          <input type="text" name="description" id="description" value={formData.description} onChange={handleInputChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
        </div>
        <div>
          <label htmlFor="extrafacility" className="block text-sm font-medium text-gray-700">
            extrafacility
          </label>
          <input type="text" name="extrafacility" id="extrafacility" value={formData.extrafacility} onChange={handleInputChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2" />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Update
        </button>
      </form>
    ) : (
      // View mode
      <div>
       
        <p><strong>Title:</strong> {formData.title}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>country:</strong> {formData.country}</p>
        <p><strong>city:</strong> {formData.city}</p>
        <p><strong>description:</strong> {formData.description}</p>
        <p><strong>extrafacility:</strong> {formData.extrafacility}</p>
        {/* Add more details here */}

        {/* Edit button */}
        <button onClick={() => setIsEditing(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4">
          Edit
        </button>
      </div>
    )}
  </div>
  );
};


export default MyForm;