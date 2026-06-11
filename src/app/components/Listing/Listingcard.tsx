"use client";
import Image from "next/image";
import Link from "next/link";
import type { PropertyType } from "@/app/types/listing";
import { useRouter } from "next/navigation";
import FavoriteButton from "../models/Favoritebtn";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteButton from "../models/Deletebtn";
import Permenentdeletebtn from "../models/Permenentdeletebtn";
import RestoreButton from "../models/RestoreButton";

interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20"
          fill={s <= Math.round(value) ? "#E5B03A" : "#D1D5DB"}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
      <span className="text-xs text-navy-500 font-medium ml-0.5">{value.toFixed(1)}</span>
    </span>
  );
}

export default function ListingItems({ property, markFavorite }: PropertyProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isMyListing = pathname.includes("/mylisting/");
  const isTrash = pathname.includes("/Trash");

  const cloudinaryUrl = property.profilephoto
    ? `https://res.cloudinary.com/daajyumzx/${property.profilephoto}`
    : "/images/sellerdefaultimg.jpg";
  const isForSale = property.sale_type === "For Sale";

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/app2/listing/${property.id}/rating/`)
      .then((r) => setRating(r.data.average_rating ?? 0))
      .catch(() => setRating(0));
  }, [property.id]);

  const stopNav = (e: React.MouseEvent) => e.preventDefault();

  return (
    <Link
      href={`/DetailHome/${property.id}`}
      className="property-card group block no-underline"
      prefetch={true}
    >
      {/* ── Image ── */}
      <div className="card-image">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-navy-100 animate-pulse" />
        )}
        <Image
          src={property.image1 || "/images/dummy1.jpeg"}
          alt={property.title}
          fill
          className={`object-cover transition-all duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`badge ${isForSale ? "badge-sale" : "badge-rent"}`}>
            {property.sale_type}
          </span>
        </div>

        {/* Favorite (stop link nav) */}
        {markFavorite && (
          <div
            className="absolute top-3 right-3 z-10"
            onClick={stopNav}
          >
            <div className="w-9 h-9 rounded-full glass-dark flex items-center justify-center shadow-sm">
              <FavoriteButton
                id={property.id}
                is_favorite={property.is_favorite}
                markFavorite={(v) => markFavorite(v)}
              />
            </div>
          </div>
        )}

        {/* Map button (stop link nav, navigate to map) */}
        <div className="absolute bottom-4 right-4 z-10" onClick={stopNav}>
          <button
            onClick={(e) => {
              e.preventDefault();
              router.push(`/?lat=${property.latitude}&lng=${property.longitude}`);
            }}
            className="w-9 h-9 rounded-full glass-dark hover:bg-accent/80 flex items-center justify-center transition-all duration-200 cursor-pointer"
            title="View on map"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </button>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-white font-heading font-bold text-xl leading-none drop-shadow">
            ₹{Number(property.price).toLocaleString("en-IN")}
          </p>
          <p className="text-white/75 text-xs mt-0.5 drop-shadow">
            {property.city}, {property.country}
          </p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading font-semibold text-primary text-base leading-snug line-clamp-1">
            {property.title}
          </h3>
          <span className="text-xs text-navy-400 font-medium flex-shrink-0 mt-0.5 capitalize">
            {property.home_type}
          </span>
        </div>

        <p className="text-navy-500 text-sm line-clamp-1 mb-3 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          {property.address}
        </p>

        <div className="flex items-center gap-4 pb-3 border-b border-navy-50 text-sm">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V9a2 2 0 012-2h14a2 2 0 012 2v3M3 12v5h18v-5M3 12h18"/>
            </svg>
            <span className="font-semibold text-primary">{property.bedrooms}</span>
            <span className="text-navy-400 text-xs">bed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-primary/60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v6H4v6zm0 0v3"/>
            </svg>
            <span className="font-semibold text-primary">{property.bathrooms}</span>
            <span className="text-navy-400 text-xs">bath</span>
          </span>
          {rating !== null && rating > 0 && (
            <span className="ml-auto">
              <StarRating value={rating} />
            </span>
          )}
        </div>
      </div>

      {/* ── Seller row (stop link nav, navigate to seller) ── */}
      <div
        className="flex items-center gap-3 px-4 pb-4 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          router.push(`/sellerdetail/${property.user}`);
        }}
      >
        <Image
          src={cloudinaryUrl}
          width={34}
          height={34}
          className="rounded-full ring-2 ring-navy-100 object-cover flex-shrink-0"
          alt={property.user_name}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-primary truncate">{property.user_name}</p>
          <p className="text-xs text-navy-400">Property Owner</p>
        </div>
        <svg className="w-4 h-4 text-navy-300 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </div>

      {/* ── My Listing actions ── */}
      {isMyListing && (
        <div className="flex gap-2 px-4 pb-4" onClick={stopNav}>
          <button
            onClick={(e) => { e.preventDefault(); router.push(`/addlistingform/${property.id}`); }}
            className="flex-1 bg-primary hover:bg-primary-light text-white text-sm font-semibold py-2.5 rounded-xl transition-all cursor-pointer"
          >
            Edit Listing
          </button>
          <DeleteButton listingId={property.id} onSuccess={() => router.push("/")} onError={() => {}} />
        </div>
      )}

      {/* ── Trash actions ── */}
      {isTrash && (
        <div className="flex gap-2 px-4 pb-4" onClick={stopNav}>
          <Permenentdeletebtn listingId={property.id} onSuccess={() => router.push("/")} onError={() => {}} />
          <RestoreButton listingId={property.id} onSuccess={() => router.push("/")} onError={() => {}} />
        </div>
      )}
    </Link>
  );
}
