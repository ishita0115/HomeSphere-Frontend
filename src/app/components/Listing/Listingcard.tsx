"use client";
import Image from "next/image";
import { PropertyType } from "./Listing";
import { useRouter } from "next/navigation";
import { FaBed } from "react-icons/fa";
import { GiBathtub } from "react-icons/gi";
import FavoriteButton from "../models/Favoritebtn";
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import DeleteButton from "../models/Deletebtn";
import Permenentdeletebtn from "../models/Permenentdeletebtn";
import RestoreButton from "../models/RestoreButton";

interface PropertyProps {
  property: PropertyType;
  markFavorite?: (is_favorite: boolean) => void;
}

export default function ListingItems({ property, markFavorite }: PropertyProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isMyListing = pathname.includes("/mylisting/");
  const isTrash     = pathname.includes("/Trash");

  const go      = (url: string) => router.push(url);
  const toDetail = (e: React.MouseEvent) => { if (!(e.target as HTMLElement).closest("button")) go(`/DetailHome/${property.id}`); };
  const toSeller = () => go(`/sellerdetail/${property.user}`);
  const toMap    = (e: React.MouseEvent) => { e.stopPropagation(); go(`/?lat=${property.latitude}&lng=${property.longitude}`); };
  const toEdit   = (e: React.MouseEvent) => { e.stopPropagation(); go(`/addlistingform/${property.id}`); };

  const cloudinaryUrl = `https://res.cloudinary.com/daajyumzx/${property.profilephoto}`;
  const isForSale = property.sale_type === "For Sale";

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/app2/listing/${property.id}/rating/`)
      .then(r => setRating(r.data.average_rating ?? 0))
      .catch(() => setRating(0));
  }, [property.id]);

  return (
    <div className="property-card group">

      {/* ── Image ── */}
      <div className="card-image cursor-pointer" onClick={toDetail}>
        {/* Skeleton */}
        {!imgLoaded && <div className="absolute inset-0 bg-navy-100 animate-pulse" />}

        <Image
          src={property.image1}
          alt={property.title}
          fill
          className={`object-cover transition-all duration-700 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setImgLoaded(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-card-gradient opacity-80" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <span className={`badge ${isForSale ? "badge-sale" : "badge-rent"}`}>
            {property.sale_type}
          </span>
        </div>

        {/* Favorite */}
        {markFavorite && (
          <div className="absolute top-3 right-3 z-10">
            <div className="w-9 h-9 rounded-full glass-dark flex items-center justify-center shadow-sm">
              <FavoriteButton
                id={property.id}
                is_favorite={property.is_favorite}
                markFavorite={(v) => markFavorite(v)}
              />
            </div>
          </div>
        )}

        {/* Bottom overlay row */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white font-heading font-bold text-xl leading-none">
                ₹{Number(property.price).toLocaleString("en-IN")}
              </p>
              <p className="text-white/70 text-xs mt-1">{property.city}, {property.country}</p>
            </div>
            {/* Map button */}
            <button
              onClick={toMap}
              className="w-9 h-9 rounded-full glass-dark hover:bg-accent/80 flex items-center justify-center transition-all duration-200 cursor-pointer"
              title="View on map"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-4 cursor-pointer" onClick={toDetail}>
        {/* Title + type */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-primary text-base leading-snug line-clamp-1">
            {property.title}
          </h3>
          <span className="text-xs text-navy-400 font-medium flex-shrink-0 mt-0.5">{property.home_type}</span>
        </div>

        {/* Address */}
        <p className="text-navy-500 text-sm line-clamp-1 mb-3 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          {property.address}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 pb-3 border-b border-navy-50 text-navy-600 text-sm">
          <span className="flex items-center gap-1.5">
            <FaBed className="text-primary/60 w-4 h-4" />
            <span className="font-semibold text-primary">{property.bedrooms}</span>
            <span className="text-navy-400 text-xs">bed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <GiBathtub className="text-primary/60 w-4 h-4" />
            <span className="font-semibold text-primary">{property.bathrooms}</span>
            <span className="text-navy-400 text-xs">bath</span>
          </span>
          {rating !== null && (
            <span className="ml-auto flex items-center gap-1">
              <Rating value={rating} precision={0.5} readOnly size="small" />
              <span className="text-xs text-navy-500 font-medium">{rating.toFixed(1)}</span>
            </span>
          )}
        </div>
      </div>

      {/* ── Seller row ── */}
      <div className="flex items-center gap-3 px-4 pb-4 cursor-pointer" onClick={toSeller}>
        <Image
          src={property.profilephoto ? cloudinaryUrl : "/images/sellerdefaultimg.jpg"}
          width={34} height={34}
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
        <div className="flex gap-2 px-4 pb-4">
          <button
            onClick={toEdit}
            className="flex-1 bg-primary hover:bg-primary-light text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Edit Listing
          </button>
          <DeleteButton listingId={property.id} onSuccess={() => router.push("/")} onError={() => {}} />
        </div>
      )}

      {/* ── Trash actions ── */}
      {isTrash && (
        <div className="flex gap-2 px-4 pb-4">
          <Permenentdeletebtn listingId={property.id} onSuccess={() => router.push("/")} onError={() => {}} />
          <RestoreButton      listingId={property.id} onSuccess={() => router.push("/")} onError={() => {}} />
        </div>
      )}
    </div>
  );
}
