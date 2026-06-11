"use client";
import React, { useRef, useState, useEffect, ChangeEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const housingIcon = new Icon({ iconUrl: "/images/icons8-home.png", iconSize: [30, 30] });

interface Coordinates { latitude: number; longitude: number; }
interface StepThreeProps {
  formData: Coordinates;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SetViewOnClick({ animateRef, setMarkers }: {
  animateRef: React.MutableRefObject<boolean>;
  setMarkers: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }[]>>;
}) {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), { animate: animateRef.current || false });
    setMarkers([{ lat: e.latlng.lat, lng: e.latlng.lng }]);
  });
  useMapEvent("dblclick", (e) => { e.originalEvent.preventDefault(); });
  return null;
}

const StepThree: React.FC<StepThreeProps> = ({ formData, handleInputChange }) => {
  const animateRef = useRef(false);
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [locating, setLocating] = useState(false);

  const applyCoords = (lat: number, lng: number) => {
    setMarkers([{ lat, lng }]);
    handleInputChange({ target: { name: "latitude",  value: lat.toString() } } as ChangeEvent<HTMLInputElement>);
    handleInputChange({ target: { name: "longitude", value: lng.toString() } } as ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => applyCoords(coords.latitude, coords.longitude),
      () => {}
    );
  }, []);

  useEffect(() => {
    if (markers.length > 0) applyCoords(markers[0].lat, markers[0].lng);
  }, [markers]);

  const detectLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { applyCoords(coords.latitude, coords.longitude); setLocating(false); },
      () => { setLocating(false); }
    );
  };

  const center: [number, number] = formData.latitude && formData.longitude
    ? [formData.latitude, formData.longitude]
    : [20.5937, 78.9629];

  return (
    <div className="bg-white rounded-2xl shadow-card p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-navy-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-primary">Property Location</h2>
            <p className="text-xs text-navy-400">Click on the map or drag the pin to set location</p>
          </div>
        </div>
        <button
          type="button"
          onClick={detectLocation}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-navy-200 text-sm font-semibold text-navy-600 hover:border-primary hover:text-primary transition-all cursor-pointer"
        >
          {locating ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4"/>
            </svg>
          )}
          {locating ? "Detecting…" : "My Location"}
        </button>
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-navy-100" style={{ height: "380px" }}>
        <MapContainer center={center} zoom={formData.latitude ? 13 : 5} scrollWheelZoom={false} style={{ width: "100%", height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((pos, i) => (
            <Marker
              key={i}
              position={[pos.lat, pos.lng]}
              draggable
              icon={housingIcon}
              eventHandlers={{ dragend: (e) => { const { lat, lng } = e.target.getLatLng(); setMarkers([{ lat, lng }]); } }}
            >
              <Popup>
                <span className="text-xs font-medium">
                  {pos.lat.toFixed(5)}, {pos.lng.toFixed(5)}
                </span>
              </Popup>
            </Marker>
          ))}
          <SetViewOnClick animateRef={animateRef} setMarkers={setMarkers} />
        </MapContainer>
      </div>

      {/* Coordinates */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        {[
          { name: "latitude",  label: "Latitude",  icon: "↕", value: formData.latitude },
          { name: "longitude", label: "Longitude", icon: "↔", value: formData.longitude },
        ].map(({ name, label, icon, value }) => (
          <div key={name}>
            <label className="block text-xs font-semibold text-navy-500 uppercase tracking-wide mb-1.5">{label}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400 text-sm font-bold">{icon}</span>
              <input
                type="text"
                name={name}
                value={value || ""}
                onChange={handleInputChange}
                readOnly
                className="w-full rounded-xl border border-navy-200 pl-8 pr-4 py-3 text-sm text-primary bg-navy-50 cursor-not-allowed"
                placeholder="Set via map…"
              />
            </div>
          </div>
        ))}
      </div>

      {markers.length > 0 && (
        <div className="flex items-center gap-2 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
          <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-xs text-emerald-700 font-medium">Location pinned successfully. You can drag the marker to fine-tune.</p>
        </div>
      )}
    </div>
  );
};

export default StepThree;
