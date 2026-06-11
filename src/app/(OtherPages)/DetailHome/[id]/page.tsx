"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { fetchListingDetail } from "@/app/apiService";
import ReservationSidebar from "@/app/components/Listing/reservationbar";
import { useSelector } from "react-redux";
import FeedbackForm from "@/app/(user)/feedback/feedbackform";

const Mapcompo = dynamic(() => import("@/app/components/map/map"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-navy-50">
      <div className="w-8 h-8 rounded-full border-4 border-navy-100 border-t-primary animate-spin" />
    </div>
  ),
});

interface Property {
  rental_choice: any;
  id: any;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  title: string;
  price: string;
  sale_type: string;
  home_type: string;
  bedrooms: number;
  bathrooms: number;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  profilephoto: string;
  user: string;
  user_name: string;
  description: string;
  extrafacility: string;
}

interface Feedback {
  rating: number;
  message: string;
  feedback_by: string;
  profilephoto: string;
  user_fname: string;
  user_lname: string;
}

function StarDisplay({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-4 h-4" viewBox="0 0 20 20" fill={s <= Math.round(value) ? "#E5B03A" : "#D1D5DB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm font-medium text-navy-600 ml-1">{value.toFixed(1)}</span>
    </div>
  );
}

const PropertyDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const token = useSelector((state: any) => state.auth.token.access);
  const userRole = useSelector((state: any) => state.auth.users.role);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchListingDetail(`app2/listingfeedback/${id}`, token)
      .then(setFeedbacks)
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    fetchListingDetail(`app2/detailisting/${id}`, token)
      .then((data) => { setProperty(data); setLoading(false); })
      .catch((err) => { setError(err); setLoading(false); });
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-navy-100 border-t-primary animate-spin" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary font-semibold text-lg mb-2">Property not found</p>
          <Link href="/DetailHome" className="btn btn-primary px-5 py-2.5 text-sm">
            Browse Listings
          </Link>
        </div>
      </div>
    );
  }

  const cloudinaryUrl = property.profilephoto
    ? `https://res.cloudinary.com/daajyumzx/${property.profilephoto}`
    : "/images/sellerdefaultimg.jpg";
  const images = [property.image1, property.image2, property.image3, property.image4].filter(Boolean);
  const isForSale = property.sale_type === "For Sale";

  return (
    <div className="min-h-screen bg-surface-secondary pb-16">
      <div className="max-w-[1300px] mx-auto px-6 pt-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-navy-400 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/DetailHome" className="hover:text-primary transition-colors">Listings</Link>
          <span>/</span>
          <span className="text-primary truncate max-w-[200px]">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Images + details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden bg-navy-100" style={{ height: "420px" }}>
              <Image src={images[activeImage]} alt={property.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className={`absolute top-4 left-4 badge ${isForSale ? "badge-sale" : "badge-rent"} text-sm px-3 py-1`}>
                {property.sale_type}
              </span>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 cursor-pointer transition-all ${
                      i === activeImage ? "border-primary shadow-card" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info card */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-heading font-bold text-2xl text-primary leading-snug">
                    {property.title}
                  </h1>
                  <p className="text-navy-400 text-sm mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    {property.address}, {property.city}, {property.country}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-heading font-bold text-2xl text-primary">
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </p>
                  {property.sale_type === "For Rent" && property.rental_choice && (
                    <p className="text-xs text-navy-400 mt-0.5">{property.rental_choice}</p>
                  )}
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-6 py-4 border-y border-navy-50 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V9a2 2 0 012-2h14a2 2 0 012 2v3M3 12v5h18v-5M3 12h18"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">Bedrooms</p>
                    <p className="font-bold text-primary">{property.bedrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v6H4v6zm0 0v3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">Bathrooms</p>
                    <p className="font-bold text-primary">{property.bathrooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-navy-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400">Type</p>
                    <p className="font-bold text-primary capitalize">{property.home_type}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-primary mb-2">About this property</h3>
                  <p className="text-navy-500 text-sm leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Extra facility */}
              {property.extrafacility && (
                <div>
                  <h3 className="font-semibold text-primary mb-2">Amenities & Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.extrafacility.split(",").map((f, i) => (
                      <span key={i} className="px-3 py-1.5 bg-navy-50 text-navy-600 text-xs font-medium rounded-xl">
                        {f.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner card */}
            <Link
              href={`/sellerdetail/${property.user}`}
              className="bg-white rounded-2xl shadow-card p-5 flex items-center gap-4 hover:shadow-card-hover transition-all group"
            >
              <Image
                src={cloudinaryUrl}
                width={56} height={56}
                className="rounded-full ring-2 ring-navy-100 object-cover flex-shrink-0"
                alt={property.user_name}
              />
              <div className="flex-1 min-w-0">
                <p className="font-heading font-semibold text-primary">{property.user_name}</p>
                <p className="text-xs text-navy-400">Property Owner · Click to view profile</p>
              </div>
              <svg className="w-5 h-5 text-navy-300 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </Link>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-navy-50">
                <h3 className="font-heading font-semibold text-primary">Location</h3>
              </div>
              <div style={{ height: "300px" }}>
                <Mapcompo
                  latitude={property.latitude}
                  longitude={property.longitude}
                  address={property.address}
                  zoomdata={13}
                />
              </div>
            </div>

            {/* Feedback section */}
            {userRole == 3 && <FeedbackForm listingId={property.id} />}

            {/* Reviews */}
            {feedbacks.length > 0 && (
              <div className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-heading font-semibold text-primary mb-5">
                  Reviews
                  <span className="ml-2 text-sm text-navy-400 font-normal">({feedbacks.length})</span>
                </h3>
                <div className="space-y-5">
                  {feedbacks.map((fb, i) => (
                    <div key={i} className="flex items-start gap-4 pb-5 border-b border-navy-50 last:border-0 last:pb-0">
                      <Image
                        src={fb.profilephoto ? `https://res.cloudinary.com/daajyumzx/${fb.profilephoto}` : "/images/sellerdefaultimg.jpg"}
                        width={40} height={40}
                        className="rounded-full ring-2 ring-navy-100 object-cover flex-shrink-0"
                        alt={fb.user_fname}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-primary">
                            {fb.user_fname} {fb.user_lname}
                          </p>
                          <StarDisplay value={fb.rating} />
                        </div>
                        <p className="text-sm text-navy-500 leading-relaxed">{fb.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Reservation sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {userRole == 3 ? (
                <ReservationSidebar property={property} />
              ) : (
                <div className="bg-white rounded-2xl shadow-card p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                    </svg>
                  </div>
                  <p className="text-primary font-semibold text-sm mb-1">Sign in to Book</p>
                  <p className="text-navy-400 text-xs">Log in as a buyer to schedule a visit</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
