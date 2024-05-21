"use client";

import { useRef, useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import apiService, { fetchListingDetail } from "@/app/apiService";
import Mapcompo from "@/app/components/map/map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useMapEvent } from "react-leaflet";
import { toast } from "react-toastify";
import sellermiddleware from "../../sellermiddleware";

const housingIcon = new Icon({
  iconUrl: "/images/icons8-home.png",
  iconSize: [30, 30],
});

interface Coordinates {
  latitude: number;
  longitude: number;
}

function SetViewOnClick({
  animateRef,
  setMarkers,
}: {
  animateRef: React.MutableRefObject<boolean>;
  setMarkers: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }[]>
  >;
}) {
  const leafletMap = useMapEvent("click", (e) => {
    leafletMap.setView(e.latlng, leafletMap.getZoom(), {
      animate: animateRef.current || false,
    });
    setMarkers([{ lat: e.latlng.lat, lng: e.latlng.lng }]);
  });


  useMapEvent("dblclick", (e) => {
    e.originalEvent.preventDefault();
  });

  return null;
}

const MyForm = ({ params }: { params: { id: number } }) => {
  const token = useSelector((state: any) => state.auth.token.access);

  
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    city: "",
    description: "",
    extrafacility: "",
    rental_choice: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    sale_type: "",
    home_type: "",
    country: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    latitude: 0,
    longitude: 0,
  });


  const [isEditing, setIsEditing] = useState(false);


  const fetchListingData = async () => {
    try {
      const response = await fetchListingDetail(
        `app2/detailisting/${params.id}`,
        token
      );
      const data = response;
      setFormData(data);
      console.log(data);
      setMarkers([{ lat: data.latitude, lng: data.longitude }]);
    } catch (error) {
      console.error("Error fetching listing data:", error);
    }
  };
  const animateRef = useRef(false);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    if (markers.length > 0) {
      const { lat, lng } = markers[0];
      handleInputChange({
        target: {
          name: "latitude",
          value: lat.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleInputChange({
        target: {
          name: "longitude",
          value: lng.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [markers]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let newValue: string | number = value; 
    if (name === "bedrooms" || name === "bathrooms") {
      const parsedValue = parseFloat(value);
      if (parsedValue < 1 || parsedValue > 10) {
        toast.error(
          `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } must be between 1 and 10`
        );
        return;
      }
      newValue = parsedValue;
    }
    if (name === "sale_type" && value === "For Rent") {
      setFormData((prevState) => ({
        ...prevState,
        rental_choice: "per month", // Default rental choice for "For Rent"
      }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "price") {
      const parsedValue = parseFloat(value);
      if (parsedValue < 1000 || parsedValue > 1000000000) {
        toast.error("Price must be between 1000 and 1000000000");
        return;
      }
      newValue = parsedValue; 
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `http://localhost:8000/app2/ManageListingupdatedeleteView/${params.id}/`,
        formDataToSend,
        config
      );
      toast.success("Listing updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating listing:", error);
      toast.error("Error updating listing");
    }
  };
  useEffect(() => {
    fetchListingData();
  }, [params.id]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-semibold mb-4 text-center">
        {isEditing ? "Edit Listing" : "View Your Home Details"}
      </h1>
      {isEditing ? (
        <form
          onSubmit={handleFormSubmit}
          className="mx-auto bg-gray-200 p-2 rounded-xl">
          <div className="bg-white shadow-[#4689ab] items-center mt-1 dark:bg-gray-800 shadow-lg rounded-xl w-100 p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Address */}
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Country */}
              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* City */}
              <div className="mb-4">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Extra Facility */}
              <div className="mb-4">
                <label
                  htmlFor="extrafacility"
                  className="block text-sm font-medium text-gray-700">
                  Extra Facility
                </label>
                <textarea
                  name="extrafacility"
                  id="extrafacility"
                  value={formData.extrafacility}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Rental Choice */}
              <div className="mb-4">
                <label htmlFor="rental_choice" className="block text-sm font-medium text-gray-700">
                  Rental Choice
                </label>
                <select
                  name="rental_choice"
                  id="rental_choice"
                  value={formData.rental_choice}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                >
                  <option value="">Select Rent Choice</option>
                  <option value="per month">Per Month</option>
                  <option value="per week">Per Week</option>
                  <option value="per day">Per Day</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div className="mb-4">
                <label
                  htmlFor="bedrooms"
                  className="block text-sm font-medium text-gray-700">
                  Bedrooms
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Bathrooms */}
              <div className="mb-4">
                <label
                  htmlFor="bathrooms"
                  className="block text-sm font-medium text-gray-700">
                  Bathrooms
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Sale Type */}
              <div className="mb-4">
                <label
                  htmlFor="sale_type"
                  className="block text-sm font-medium text-gray-700">
                  Sale Type
                </label>
                <select
                  name="sale_type"
                  id="sale_type"
                  value={formData.sale_type}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              {/* Home Type */}
              <div className="mb-4">
                <label
                  htmlFor="home_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Home Type
                </label>
                <select
                  name="home_type"
                  id="home_type"
                  value={formData.home_type}
                  onChange={handleInputChange}
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                >
                  <option value="rowhouse">Rowhouse</option>
                  <option value="colonial">Colonial</option>
                  <option value="flat">Flat</option>
                  <option value="cottage">Cottage</option>
                  <option value="bungalow">Bungalow</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex mt-3 dark:bg-gray-900 items-center justify-center">
            <div className="bg-white shadow-[#4689ab] w-3/5 h-4/5 items-center mt-1 dark:bg-gray-800 shadow-lg rounded-xl w-100 p-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
                Set Your Location
              </h2>
              <div
                className="relative z-0"
                style={{ width: "100%", height: "50vh" }}>
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={2}
                  scrollWheelZoom={false}
                  style={{
                    width: "100%",
                    height: "100%",
                  }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {/* Render markers */}
                  {markers.map((position, idx) => (
                    <Marker
                      key={idx}
                      position={[position.lat, position.lng]}
                      draggable={true} 
                      icon={housingIcon}
                      eventHandlers={{
                        dragend: (e) => {
                          const { lat, lng } = e.target.getLatLng();
                          setMarkers([{ lat, lng }]);
                        },
                      }}
                    >
                      <Popup>
                        Latitude: {position.lat}, Longitude: {position.lng} 
                      </Popup>
                    </Marker>
                  ))}
                  {/* Pass setMarkers function to SetViewOnClick component */}
                  <SetViewOnClick
                    animateRef={animateRef}
                    setMarkers={setMarkers}
                  />
                </MapContainer>
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white shadow-[#4689ab] dark:bg-gray-800 shadow-lg rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       
            <div className="border p-3 flex flex-col">
              <p className="mb-2">
                <strong>Title:</strong>{" "}
                <span className="ml-2">{formData.title}</span>
              </p>
              <p className="mb-2">
                <strong>Address:</strong>{" "}
                <span className="ml-2">{formData.address}</span>
              </p>
              <p className="mb-2">
                <strong>Country:</strong>{" "}
                <span className="ml-2">{formData.country}</span>
              </p>
              <p className="mb-2">
                <strong>City:</strong>{" "}
                <span className="ml-2">{formData.city}</span>
              </p>
              <p className="mb-2">
                <strong>Description:</strong>{" "}
                <span className="ml-2">{formData.description}</span>
              </p>
              <p className="mb-2">
                <strong>Extra Facility:</strong>{" "}
                <span className="ml-2">{formData.extrafacility}</span>
              </p>
            </div>
            <div className="border p-3">
              <p className="mb-2">
                <strong>Rental Choice:</strong>{" "}
                <span className="ml-2">{formData.rental_choice}</span>
              </p>
              <p className="mb-2">
                <strong>Price:</strong>{" "}
                <span className="ml-2">{formData.price}</span>
              </p>
              <p className="mb-2">
                <strong>Bedrooms:</strong>{" "}
                <span className="ml-2">{formData.bedrooms}</span>
              </p>
              <p className="mb-2">
                <strong>Bathrooms:</strong>{" "}
                <span className="ml-2">{formData.bathrooms}</span>
              </p>
              <p className="mb-2">
                <strong>Sale Type:</strong>{" "}
                <span className="ml-2">{formData.sale_type}</span>
              </p>
              <p className="mb-2">
                <strong>Home Type:</strong>{" "}
                <span className="ml-2">{formData.home_type}</span>
              </p>
            </div>
          </div>
          <div className="mt-6">
            <strong className="mb-2 text-xl text-center block">
              Home Location
            </strong>
            <Mapcompo
              latitude={formData.latitude}
              longitude={formData.longitude}
              address={formData.address}
              zoomdata={1}
            />
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 block mx-auto"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default sellermiddleware(MyForm);
