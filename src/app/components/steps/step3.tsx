import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvent } from "react-leaflet";
import { FcHome } from "react-icons/fc";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const housingIcon = new Icon({
  iconUrl: "/images/icons8-home-64 (2).png",
  iconSize: [30, 30], // size of the icon
});

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface StepThreeProps {
  formData: Coordinates;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SetViewOnClick({ animateRef, setMarkers }: { animateRef: React.MutableRefObject<boolean>, setMarkers: React.Dispatch<React.SetStateAction<{ lat: number; lng: number; }[]>> }) {
  const leafletMap = useMapEvent("click", (e) => {
    leafletMap.setView(e.latlng, leafletMap.getZoom(), {
      animate: animateRef.current || false,
    });
    setMarkers([{ lat: e.latlng.lat, lng: e.latlng.lng }]);
  });
  
  // Prevent default double-click behavior (zooming the map)
  useMapEvent("dblclick", (e) => {
    e.originalEvent.preventDefault();
  });

  return null;
}

const StepThree: React.FC<StepThreeProps> = ({ formData, handleInputChange }) => {
  const animateRef = useRef(false);
  const [markers, setMarkers] = useState<{ lat: number; lng: number; }[]>([]);



  useEffect(() => {
    // Fetch user's geolocation
    const successCallback = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setMarkers([{ lat: latitude, lng: longitude }]);
      
      handleInputChange({
        target: {
          name: "latitude",
          value: latitude.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>);
      handleInputChange({
        target: {
          name: "longitude",
          value: longitude.toString(),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    };

    navigator.geolocation.getCurrentPosition(successCallback);

    // Fly to user's geolocation if available
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMarkers([{ lat: latitude, lng: longitude }]);
        handleInputChange({
          target: {
            name: "latitude",
            value: latitude.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
        handleInputChange({
          target: {
            name: "longitude",
            value: longitude.toString(),
          },
        } as React.ChangeEvent<HTMLInputElement>);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  

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

  return (
    <div className="flex mt-3 dark:bg-gray-900 items-center justify-center">
      <div className="bg-white shadow-[#4689ab] w-3/5 h-4/5 items-center mt-1 dark:bg-gray-800 shadow-lg rounded-xl w-100 p-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">Set Your Location</h2>
        <div className="relative z-0" style={{ width: "100%", height: "50vh" }}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={9}
            scrollWheelZoom={false}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Render markers */}
            {markers.map((position, idx) => (
              <Marker
                key={idx}
                position={[position.lat, position.lng]}
                draggable={true} // Allow marker to be dragged
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
            <SetViewOnClick animateRef={animateRef} setMarkers={setMarkers} />
          </MapContainer>
        </div>
        <div className=" sticky top-[100px] mt-4">
          <label className="block mb-2">Latitude:</label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
          />
          <label className="block mb-2">Longitude:</label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md px-3 py-2 w-full mb-2"
          />
        </div>
      </div>
    </div>
  );
}

export default StepThree;