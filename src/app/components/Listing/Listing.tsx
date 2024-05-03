'use client';
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ListingItems from './Listingcard';
import { fetchListingDetail, profileApiservive } from '@/app/apiService';
import { useSelector } from 'react-redux';
import useSearchModal from '@/app/redux/hooks/useSearchModel';
import { useRouter } from 'next/navigation';
export type PropertyType = {
    bedrooms: number;
    home_type: string;
    id: string;
    title: string;
    image1: string;
    address: string;
    sale_type:string;
    is_favorite: boolean;
    country:string;
    bathrooms:number;
    city:string;
    profilephoto:string;
    user_name:string;
    user:number;
    latitude:number;
    longitude:number;
    
};

interface ListingProps {
    landlord_id?: string | null;
    favorites?: boolean | null;
}

const Listing: React.FC<ListingProps> = ({  landlord_id , favorites}) => {
    const params = useSearchParams();
    const searchModal = useSearchModal();
    
    const country = searchModal.query.country;
    const city = searchModal.query.city;
    const sale_type = searchModal.query.sale_type;
    const numBedrooms = searchModal.query.bedrooms;
    const home_type = searchModal.query.home_type;
    const address = searchModal.query.address;
    const min_price = searchModal.query.min_price;
    const max_price = searchModal.query.max_price;

    console.log('searchQUery:', searchModal.query);
    console.log('numBedrooms', numBedrooms)

    const token = useSelector((state: any) => state.auth.token.access);
    const id = useSelector((state: any) => state.auth.token.uid);
    const [properties, setProperties] = useState<PropertyType[]>([]);
    const [page, setPage] = useState<number>(1); // Define page state
    const [totalPages, setTotalPages] = useState<number>(0);
    const cardsPerPage = 12;
    const router = useRouter();
    
    // useEffect(() => {
    //     const getProperties = async () => {import { useSearchParams } from 'next/navigation';
    //         try {
    //              let url="/app2/ManageListingView/"
    //              if(favorites){
    //                 url=""
    //              }
    //             const response = await profileApiservive.get(url,token);
    //             console.log(response.data)
    //             setProperties(response.data);
    //             setTotalPages(Math.ceil(response.data.length / cardsPerPage));
    //         } catch (error) {
    //             console.error('Error fetching properties:', error);
    //         }
    //     };

    //     getProperties();

    // }, [token]);
    useEffect(() => {
        const getProperties = async () => {
            try {
                let url = "/app2/ManageListingView/";
                if (favorites) {
                    url = `/app2/myFavorites/${id}/`; // Replace placeholder with user ID
                }else{
                    let urlQuery = '';
                    if (country) {
                        urlQuery += '&country=' + country
                    }
        
                    if (city) {
                        urlQuery += '&city=' + city
                    }
        
                    if (numBedrooms) {
                        urlQuery += '&numBedrooms=' + numBedrooms
                    }
        
                    if (sale_type) {
                        urlQuery += '&sale_type=' + sale_type
                    }
        
                    if (home_type) {
                        urlQuery += '&home_type=' + home_type
                    }
                    if (address) {
                        urlQuery += '&address=' + address
                    }
                    if (min_price) {
                        urlQuery += '&min_price=' + min_price
                    }
                    if (max_price) {
                        urlQuery += '&max_price=' + max_price
                    }
        
                    if (urlQuery.length) {
                        console.log('Query:', urlQuery);
        
                        urlQuery = '?' + urlQuery.substring(1);
        
                        url += urlQuery;
                    }
                }
                const response = await profileApiservive.get(url, token);
                const fetchedProperties = response.data;
                 console.log(fetchedProperties)
                // Ensure that each property has the required fields and set the is_favorite flag
                const updatedProperties = fetchedProperties.map(property => ({
                    id: property.id,
                    title: property.title,
                    image1: property.image1,
                    address: property.address,
                    sale_type: property.sale_type,
                    bedrooms:property.bedrooms,
                    home_type:property.home_type,
                    country:property.country,
                    is_favorite: favorites ? true : false,
                    bathrooms:property.bathrooms,
                    city:property.city,
                    profilephoto:property.profilephoto,
                    user_name:property.user_name,
                    user:property.user,
                    latitude:property.latitude,
                    longitude:property.longitude,
                     // Set is_favorite based on favorites prop
                }));
    
                setProperties(updatedProperties);
                setTotalPages(Math.ceil(updatedProperties.length / cardsPerPage));
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
    
        getProperties();
    }, [favorites,searchModal.query, params]); // Ensure id is included in dependencies
    
    
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); // Update the page when pagination changes
    };
    const renderPropertiesForPage = () => {
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = page * cardsPerPage;
        return properties.slice(startIndex, endIndex).map((property) => (
            <ListingItems key={property.id} property={property} markFavorite={(is_favorite: any) => markFavorite(property.id, is_favorite)}/>
        ));
    };

    const markFavorite = (id: string, is_favorite: boolean) => {
        const tmpProperties = properties.map((property: PropertyType) => {
            if (property.id == id) {
                property.is_favorite = is_favorite

                if (is_favorite) {
                    console.log('added to list of favorited propreties')
                } else {
                    console.log('removed from list')
                }
            }

            return property;
        })

        setProperties(tmpProperties);
    }

    
    return (
        <>
            {renderPropertiesForPage()}
            <Pagination count={totalPages} shape="rounded" page={page} onChange={handleChange}/>
        </>
    );
};

export default Listing;
