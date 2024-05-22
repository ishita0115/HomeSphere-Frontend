'use client'
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const housingIcon = new Icon({
  iconUrl: "/images/icons8-home.png",
  iconSize: [30, 30], 
});

interface MapcompoProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  zoomdata: number;
}

const Mapcompo: React.FC<MapcompoProps> = ({ latitude = 0, longitude = 0, address, zoomdata }) => {
  const position: LatLngExpression = [latitude, longitude];

  return (
    <div className="flex dark:bg-gray-900 items-center justify-center">
      <div className="bg-white shadow-[#4689ab]  items-center dark:bg-gray-800 shadow-lg rounded-xl w-full p-1">
        <div className="relative z-0" style={{ width: "100%", height: "53vh" }}>
          <MapContainer center={position} zoom={zoomdata} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={housingIcon}>
              <Popup>
                Address: {address}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default Mapcompo;









