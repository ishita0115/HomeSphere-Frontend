 'use client'

import { useEffect, useState } from "react";
import { fetchListingDetail, profileApiservive } from "./apiService";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import { useSearchParams } from 'next/navigation'
import Contact from "./components/contact/contactus";
const housingIcon = new Icon({
  iconUrl: "/images/icons8-home-64 (2).png",
  iconSize: [30, 30], // size of the icon
});
export default function Home() {
  const searchParams = useSearchParams()
  const search1 = searchParams.get('lat')
  const search2 = searchParams.get('lng')


  const [listings, setListings] = useState([]);
  const token = useSelector((state: any) => state.auth.token.access);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await profileApiservive.get("/app2/listing-coordinates", token);
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
  }, [token]);

  return (

<>

<main className="max-w-[1500px] mx-auto px-6">
      <div className="mt-4">
        <MapContainer center={[0, 0]} zoom={2} style={{ width: "100%", height: "53vh" }}>
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
    </main>
    <Contact />
</>
 
  );
}

// import { useEffect, useState } from "react";
// import { GetServerSideProps } from 'next';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Icon } from "leaflet";

// const housingIcon = new Icon({
//   iconUrl: "/images/icons8-home-64 (2).png",
//   iconSize: [30, 30], // size of the icon
// });
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Extract query parameters from the context
//   const { lat, lng } = context.query;

//   // Pass the query parameters as props
//   return {
//     props: {
//       lat: lat || null,
//       lng: lng || null,
//     },
//   };
// };
// export default function Home({ lat, lng }) {

//     const [mapCenter, setMapCenter] = useState([0, 0]); // Default center
//     const [listings, setListings] = useState([]);

//     useEffect(() => {
//         // Update the map center based on the latitude and longitude from the query parameters
//         if (lat && lng) {
//             setMapCenter([parseFloat(lat as string), parseFloat(lng as string)]);
            
//             // Fetch nearby homes based on the provided latitude and longitude
//             const fetchNearbyHomes = async () => {
//                 try {
//                     // Make an API request to fetch nearby homes using the provided latitude and longitude
//                     const response = await fetch(`/api/nearby-homes?lat=${lat}&lng=${lng}`);
//                     const data = await response.json();
//                     setListings(data.listings);
//                 } catch (error) {
//                     console.error("Error fetching nearby homes:", error);
//                 }
//             };
//             fetchNearbyHomes();
//         }
//     }, [lat, lng]);

//     return (
//         <main className="max-w-[1500px] mx-auto px-6">
//             <div className="mt-4">
//                 <MapContainer center={mapCenter} zoom={12} style={{ width: "100%", height: "80vh" }}>
//                     <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                     {/* Render markers for nearby homes */}
//                     {listings.map((listing, index) => (
//                         <Marker key={index} position={[listing.latitude, listing.longitude]} icon={housingIcon}>
//                             <Popup>
//                                 <div style={{ maxWidth: "120px" }}>
//                                     <img className="rounded" src={listing.image1} alt="Listing" style={{ width: "100px", height: "100px" }} />
//                                     <div>{listing.address}</div>
//                                     <div className="font-bold">{listing.city}, {listing.country}</div>
//                                 </div>
//                             </Popup>
//                         </Marker>
//                     ))}
//                 </MapContainer>
//             </div>
//         </main>
//     );
// }
