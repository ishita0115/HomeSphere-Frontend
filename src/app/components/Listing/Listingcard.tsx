"use client";
import Image from "next/image";
import { PropertyType } from "./Listing";
import { useRouter } from "next/navigation";
import { FaBed, FaMapMarkerAlt } from "react-icons/fa";
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

const ListingItems: React.FC<PropertyProps> = ({ property, markFavorite }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const router = useRouter();
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  const isMyListingPage = pathname.includes("/mylisting/");
  const isTrashPage = pathname.includes("/Trash");

  const handleClick = () => router.push(`/DetailHome/${property.id}`);
  const sendtoseller = () => router.push(`/sellerdetail/${property.user}`);
  const handleViewMap = () => router.push(`/?lat=${property.latitude}&lng=${property.longitude}`);
  const handleUpdateListing = () => router.push(`/addlistingform/${property.id}`);
  const handleDeleteSuccess = () => router.push("/");

  const cloudinaryUrl = `https://res.cloudinary.com/daajyumzx/${property.profilephoto}`;

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/app2/listing/${property.id}/rating/`
        );
        setAverageRating(response.data.average_rating ?? 0);
      } catch {
        setAverageRating(0);
      }
    };
    fetchRating();
  }, [property.id]);

  const saleTypeBg = property.sale_type === "For Sale"
    ? "bg-primary text-white"
    : "bg-accent text-white";

  return (
    <div className="group relative w-full cursor-pointer">
      <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">

        {/* ── Image ── */}
        <div className="relative h-52 overflow-hidden" onClick={handleClick}>
          <Image
            src={property.image1}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Sale type badge */}
          <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow ${saleTypeBg}`}>
            {property.sale_type}
          </span>

          {/* Favorite */}
          {markFavorite && (
            <div className="absolute top-3 right-3">
              <FavoriteButton
                id={property.id}
                is_favorite={property.is_favorite}
                markFavorite={(is_favorite) => markFavorite(is_favorite)}
              />
            </div>
          )}

          {/* Map pin */}
          <button
            onClick={(e) => { e.stopPropagation(); handleViewMap(); }}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-white text-primary rounded-full p-2 shadow transition-colors duration-200 cursor-pointer"
            title="View on map"
          >
            <FaMapMarkerAlt className="w-4 h-4" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-4" onClick={handleClick}>
          {/* Price */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-heading font-bold text-primary">
              ₹{Number(property.price).toLocaleString("en-IN")}
            </span>
            {averageRating !== null && (
              <div className="flex items-center gap-1">
                <Rating value={averageRating} precision={0.5} readOnly size="small" />
                <span className="text-xs text-slate-500 font-medium">{averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Title & type */}
          <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide mb-1">
            {property.title}
            <span className="ml-2 text-xs font-normal text-slate-400 normal-case">· {property.home_type}</span>
          </h3>

          {/* Address */}
          <p className="text-slate-600 text-sm line-clamp-1 mb-3 flex items-center gap-1">
            <FaMapMarkerAlt className="w-3 h-3 text-accent flex-shrink-0" />
            {property.address}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 text-slate-600 text-sm border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1.5">
              <FaBed className="w-4 h-4 text-primary/70" />
              <span className="font-medium">{property.bedrooms}</span>
              <span className="text-slate-400 text-xs">bed</span>
            </span>
            <span className="flex items-center gap-1.5">
              <GiBathtub className="w-4 h-4 text-primary/70" />
              <span className="font-medium">{property.bathrooms}</span>
              <span className="text-slate-400 text-xs">bath</span>
            </span>
            <span className="ml-auto text-xs text-slate-400 font-medium">
              {property.city}, {property.country}
            </span>
          </div>
        </div>

        {/* ── Seller row ── */}
        <div
          className="flex items-center gap-2 px-4 pb-4 cursor-pointer"
          onClick={sendtoseller}
        >
          <Image
            src={property.profilephoto ? cloudinaryUrl : "/images/sellerdefaultimg.jpg"}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-slate-100 object-cover"
            alt={property.user_name}
          />
          <span className="text-sm text-slate-700 font-medium truncate">{property.user_name}</span>
        </div>

        {/* ── Seller actions (My Listings) ── */}
        {isMyListingPage && (
          <div className="flex gap-2 px-4 pb-4">
            <button
              onClick={handleUpdateListing}
              className="flex-1 bg-primary hover:bg-primary-light text-white text-sm font-semibold py-2 rounded-xl transition-colors duration-200 cursor-pointer"
            >
              Edit Listing
            </button>
            <DeleteButton
              listingId={property.id}
              onSuccess={handleDeleteSuccess}
              onError={() => {}}
            />
          </div>
        )}

        {/* ── Trash actions ── */}
        {isTrashPage && (
          <div className="flex gap-2 px-4 pb-4">
            <Permenentdeletebtn
              listingId={property.id}
              onSuccess={handleDeleteSuccess}
              onError={() => {}}
            />
            <RestoreButton
              listingId={property.id}
              onSuccess={handleDeleteSuccess}
              onError={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingItems;
