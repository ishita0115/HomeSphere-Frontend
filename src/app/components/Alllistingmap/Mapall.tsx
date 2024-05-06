'use client'
import { useEffect, useState } from "react";
import { fetchListingDetail, profileApiservive } from "../../apiService";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
// import { useSearchParams } from 'next/navigation'

const housingIcon = new Icon({
  iconUrl: "/images/icons8-home-64 (2).png",
  iconSize: [30, 30], // size of the icon
});
export default function Mapall({search1,search2}) {
  const [listings, setListings] = useState([]);
  const token = useSelector((state: any) => state.auth.token.access);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await profileApiservive.get("/app2/listing-coordinates", token);
        console.log(response)
        if (response.coordinates) {
          setListings(response.coordinates);
        } else {
          console.error("Failed to fetch listings:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    
    fetchListings();
  }, []);

  return (

<>
      <div className="m-4">
        <MapContainer center={[0, 0]} zoom={2} style={{ width: "100%", height: "45vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {listings.map((listing, index) => (
            <Marker key={index} position={[listing.latitude, listing.longitude]} icon={housingIcon}>
            <Popup>
              <div style={{ maxWidth: "120px" }}>
                <img className="rounded" src={listing.image1} alt="Listing" style={{ width: "100px", height: "100px" }} />
                <div >{listing.address}</div>
                <div className="font-bold ">{listing.city}, {listing.country}</div>
              </div>
            </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div >
   
</>
 
  );
}
