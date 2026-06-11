"use client";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListingItems from "./Listingcard";
import { paginationdatafetch } from "@/app/apiService";
import { useSelector } from "react-redux";
import useSearchModal from "@/app/redux/hooks/useSearchModel";
import { toast } from "react-toastify";

export type PropertyType = {
  bedrooms: number;
  home_type: string;
  id: number;
  title: string;
  image1: string;
  address: string;
  sale_type: string;
  is_favorite: boolean;
  country: string;
  bathrooms: number;
  city: string;
  profilephoto: string;
  user_name: string;
  user: number;
  latitude: number;
  longitude: number;
  price: number;
};

interface ListingProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
}

const Listing: React.FC<ListingProps> = ({ landlord_id, favorites }) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const { country, city, sale_type, bedrooms, home_type, address, min_price, max_price } = searchModal.query;
  const token = useSelector((state: any) => state.auth.token.access);
  const id = useSelector((state: any) => state.auth.token.uid);

  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const cardsPerPage = 8;

  useEffect(() => {
    const getProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "/app2/ManageListingView/";
        if (favorites) {
          url = `/app2/myFavorites/${id}/`;
        } else {
          const parts: string[] = [];
          if (country)   parts.push("country="   + country);
          if (city)      parts.push("city="      + city);
          if (bedrooms)  parts.push("bedrooms="  + bedrooms);
          if (sale_type) parts.push("sale_type=" + sale_type);
          if (home_type) parts.push("home_type=" + home_type);
          if (address)   parts.push("address="   + address);
          if (min_price) parts.push("min_price=" + min_price);
          if (max_price) parts.push("max_price=" + max_price);
          if (parts.length) url += "?" + parts.join("&");
        }

        const response = await paginationdatafetch.get(url, token, {
          ...Object.fromEntries(params),
          page,
          limit: cardsPerPage,
        });

        const fetchedProperties = response.results.data.map((p: any) => ({
          id: p.id,
          title: p.title,
          image1: p.image1,
          address: p.address,
          sale_type: p.sale_type,
          bedrooms: p.bedrooms,
          home_type: p.home_type,
          country: p.country,
          is_favorite: favorites ? true : false,
          bathrooms: p.bathrooms,
          city: p.city,
          profilephoto: p.profilephoto,
          user_name: p.user_name,
          user: p.user,
          latitude: p.latitude,
          longitude: p.longitude,
          price: p.price,
        }));

        setProperties(fetchedProperties);
        setTotalCount(response.count);
        setTotalPages(Math.ceil(response.count / cardsPerPage));
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProperties();
  }, [favorites, searchModal.query, params, page]);

  const markFavorite = (propId: number, is_favorite: boolean) => {
    setProperties(prev =>
      prev.map(p => {
        if (p.id === propId) {
          is_favorite
            ? toast.success("Added to favourites")
            : toast.info("Removed from favourites");
          return { ...p, is_favorite };
        }
        return p;
      })
    );
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="property-card overflow-hidden animate-pulse">
              <div className="h-52 bg-navy-100" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-navy-100 rounded w-3/4" />
                <div className="h-3 bg-navy-100 rounded w-1/2" />
                <div className="h-3 bg-navy-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <p className="text-primary font-semibold text-lg mb-2">Something went wrong</p>
        <p className="text-navy-400 text-sm mb-6">{error}</p>
        <button
          onClick={() => setPage(1)}
          className="btn btn-primary px-6 py-2.5 text-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!loading && properties.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-navy-50 mb-6">
          <svg className="w-10 h-10 text-navy-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl text-primary mb-2">No Properties Found</h3>
        <p className="text-navy-400 text-sm max-w-sm mx-auto">
          We couldn&apos;t find any properties matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8">
      {/* Result count */}
      <p className="text-sm text-navy-400 mb-6">
        Showing <span className="font-semibold text-primary">{(page - 1) * cardsPerPage + 1}–{Math.min(page * cardsPerPage, totalCount)}</span> of <span className="font-semibold text-primary">{totalCount}</span> properties
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <ListingItems
            key={property.id}
            property={property}
            markFavorite={(is_favorite) => markFavorite(property.id, is_favorite)}
          />
        ))}
      </div>

      {/* Pagination at bottom */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <Pagination
            count={totalPages}
            shape="rounded"
            page={page}
            onChange={(_, value) => { setPage(value); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            sx={{
              "& .MuiPaginationItem-root": {
                fontFamily: "inherit",
                fontWeight: 500,
                color: "#0B2D55",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                background: "#0B2D55",
                color: "white",
                border: "1px solid #0B2D55",
              },
              "& .MuiPaginationItem-root:hover": {
                background: "#F0F4FA",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Listing;
