"use client";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ListingItems from "./Listingcard";
import { fetchListingDetail, paginationdatafetch, profileApiservive } from "@/app/apiService";
import { useSelector } from "react-redux";
import useSearchModal from "@/app/redux/hooks/useSearchModel";
import { useRouter } from "next/navigation";
import CircularIndeterminate from "../loader/Loader";
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
  price:number;
};

interface ListingProps {
  landlord_id?: string | null;
  favorites?: boolean | null;
}

const Listing: React.FC<ListingProps> = ({ landlord_id, favorites }) => {
  const params = useSearchParams();
  const searchModal = useSearchModal();
  const country = searchModal.query.country;
  const city = searchModal.query.city;
  const sale_type = searchModal.query.sale_type;
  const bedrooms = searchModal.query.bedrooms;
  const home_type = searchModal.query.home_type;
  const address = searchModal.query.address;
  const min_price = searchModal.query.min_price;
  const max_price = searchModal.query.max_price;
  const token = useSelector((state: any) => state.auth.token.access);
  const id = useSelector((state: any) => state.auth.token.uid);
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const cardsPerPage = 8;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getProperties = async () => {
      try {
        let url = "/app2/ManageListingView/";
        if (favorites) {
          url = `/app2/myFavorites/${id}/`; 
        } else {
          let urlQuery = "";
          if (country) {
            urlQuery += "&country=" + country;
          }

          if (city) {
            urlQuery += "&city=" + city;
          }

          if (bedrooms) {
            urlQuery += "&bedrooms=" + bedrooms;
          }

          if (sale_type) {
            urlQuery += "&sale_type=" + sale_type;
          }

          if (home_type) {
            urlQuery += "&home_type=" + home_type;
          }
          if (address) {
            urlQuery += "&address=" + address;
          }
          if (min_price) {
            urlQuery += "&min_price=" + min_price;
          }
          if (max_price) {
            urlQuery += "&max_price=" + max_price;
          }

          if (urlQuery.length) {
            urlQuery = "?" + urlQuery.substring(1);
            url += urlQuery;
          }
        }
        console.log('how page is....')
        const response = await paginationdatafetch.get(url, token, {
          ...Object.fromEntries(params),
          page,
          limit: cardsPerPage,
        });
        console.log(response)
        const count = response.count
        const next = response.next
        const fetchedProperties = response.results.data;
        const updatedProperties = fetchedProperties.map(
          (property: {
            id: number;
            title: string;
            image1: any;
            address: string;
            sale_type: any;
            bedrooms: any;
            home_type: any;
            country: string;
            bathrooms: string;
            city: string;
            profilephoto: any;
            user_name: any;
            user: any;
            latitude: any;
            longitude: any;
            price:number;
          }) => ({
            id: property.id,
            title: property.title,
            image1: property.image1,
            address: property.address,
            sale_type: property.sale_type,
            bedrooms: property.bedrooms,
            home_type: property.home_type,
            country: property.country,
            is_favorite: favorites ? true : false,
            bathrooms: property.bathrooms,
            city: property.city,
            profilephoto: property.profilephoto,
            user_name: property.user_name,
            user: property.user,
            latitude: property.latitude,
            longitude: property.longitude,
            price:property.price,
         
          })
        );

        setProperties(updatedProperties);
        setTotalPages(Math.ceil(count / cardsPerPage));
        console.log(Math.ceil(count / cardsPerPage))
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false);
      }
    };

    getProperties();  
  }, [favorites, searchModal.query, params,page]); 

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  

  const renderPropertiesForPage = () => {
    return properties
      .map((property) => (
        <ListingItems
          key={property.id}
          property={property}
          markFavorite={(is_favorite: any) =>
            markFavorite(property.id, is_favorite)
          }
        />
      ));
  };

  const markFavorite = (id: number, is_favorite: boolean) => {
    const tmpProperties = properties.map((property: PropertyType) => {
      if (property.id == id) {
        property.is_favorite = is_favorite;

        if (is_favorite) {
          toast.success("correctly add the list")
        } else {
          toast.info("removed from list");
        }
      }

      return property;
    });

    setProperties(tmpProperties);
  };

  return (
    <>
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <>
         <main className="max-w-[1500px] mx-auto px-6 pt-10">
         <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {renderPropertiesForPage()}
          </div>
          </main>
        </>
      )}
      <Pagination
            count={totalPages}
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
    </>
  );
};

export default Listing;
