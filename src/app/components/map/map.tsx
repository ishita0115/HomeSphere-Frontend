
import React, { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import * as ELG from 'esri-leaflet-geocoder'
const housingIcon = new Icon({
  iconUrl: "/images/icons8-home-64 (2).png",
  iconSize: [30, 30], // size of the icon
});
export default function Mapcompo({ latitude, longitude ,address, zoomdata}) {
  // const [markerPosition, setMarkerPosition] = useState([latitude, longitude]);
  const position = [latitude, longitude]
  // Update marker position when latitude or longitude props change
  // useEffect(() => {
  //   setMarkerPosition([latitude, longitude]);
  // }, [latitude, longitude]);

  // const handleMarkerDragEnd = (e) => {
  //   const { lat, lng } = e.target.getLatLng();
  //   setMarkerPosition([lat, lng]);
    
  // };

  return (
    <div className="flex dark:bg-gray-900 items-center justify-center">
      <div className="bg-white shadow-[#4689ab]  items-center dark:bg-gray-800 shadow-lg rounded-xl w-full p-1">
        <div className="relative z-0" style={{ width: "100%", height: "53vh" }}>
        <MapContainer center={position} zoom={zoomdata} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
      {/* <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}> */}
      {/* <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        {/* Render marker with event handler */}
        <Marker position={position}icon={housingIcon}>
          <Popup>
            Adress:{address}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
    </div>
    </div>
  );
}
