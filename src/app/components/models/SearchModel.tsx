'use client';

import Modal from "./Modal";
import { useState } from "react";
import CustomButton from "./CustomButton";
import useSearchModal, { SearchQuery } from "@/app/redux/hooks/useSearchModel";
import SelectCountry, { SelectCountryValue } from "../Listing/setContries";

const SearchModal = () => {
    let content = (<></>);
    const searchModal = useSearchModal();
    const [sale_type, setSaleType] = useState<string>('');
    const [home_type, setHomeType] = useState<string>('');
    const [numBedrooms, setNumBedrooms] = useState<number>(0);
    const [country, setCountry] = useState<SelectCountryValue>();
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);


    const closeAndSearch = () => {
        const newSearchQuery: SearchQuery = {
            country: country?.label,
            bedrooms: numBedrooms,
            sale_type: sale_type,
            home_type: home_type,
            city: city,
            address: address,
            min_price: minPrice,
            max_price: maxPrice
        };

        searchModal.setQuery(newSearchQuery);
        searchModal.close();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'home_type') {
            setHomeType(value);
        } else if (name === 'numBedrooms') {
            setNumBedrooms(parseInt(value));
        } else if (name === 'city') {
            setCity(value);
        } else if (name === 'address') {
            setAddress(value);
        } else if (name === 'price') { // Handle price input change
            setPrice(parseFloat(value)); // Ensure to parse as float or integer depending on your use case
        } else if (name === 'sale_type') { // Handle sale type selection
            setSaleType(value);
        }
    };
    const handleMinPriceChange = (e) => {
        const { value } = e.target;
        setMinPrice(parseFloat(value));
    };

    const handleMaxPriceChange = (e) => {
        const { value } = e.target;
        setMaxPrice(parseFloat(value));
    };


    const contentLocation = (
        <>
            <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
            <div className="mb-3">Country:</div>
            <SelectCountry
                value={country}
                onChange={(value) => setCountry(value as SelectCountryValue)}
            />
             <div className="space-y-4">
                    <label className="mt-3" htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={city}
                        onChange={handleChange}
                        placeholder="City..."
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl "
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={handleChange}
                        placeholder="Address..."
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>
            
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="price range ->"
                    onClick={() => searchModal.open('price')}
                />
            </div>
        </>
    )
    const contentprice = (
         <>
            <h2 className="mb-6 text-2xl">Price Range</h2>
            <div className="space-y-4">
                <label htmlFor="minPrice">Min Price:</label>
                <input
                    type="number"
                    min="0"
                    id="minPrice"
                    name="minPrice"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    placeholder="Enter min price..."
                    className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                />
            </div>
            <div className="space-y-4">
                <label htmlFor="maxPrice">Max Price:</label>
                <input
                    type="number"
                    min="0"
                    id="maxPrice"
                    name="maxPrice"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    placeholder="Enter max price..."
                    className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                />
            </div>
            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="Details ->"
                    onClick={() => searchModal.open('Details')}
                />
            </div>
        </>
    )

    const contentDetails = (
        <>
            <h2 className="mb-6 text-2xl">Details</h2>

            <div className="space-y-4">
            <div className="space-y-4">
                    <label htmlFor="sale_type">sale Type:</label>
                    <select
                        id="sale_type"
                        name="sale_type"
                        value={sale_type}
                        onChange={handleChange}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    >
                        <option value="For Sale">For Sale</option>
                        <option value="For Rent">For Rent</option>
                        
                    </select>
                </div>

                <div className="space-y-4">
                    <label htmlFor="home_type">Home Type:</label>
                    <select
                        id="home_type"
                        name="home_type"
                        value={home_type}
                        onChange={handleChange}
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    >
                        <option value="rowhouse">Rowhouse</option>
                        <option value="colonial">Colonial</option>
                        <option value="flat">Flat</option>
                        <option value="cottage">Cottage</option>
                        <option value="bungalow">Bungalow</option>
                        <option value="other">Other</option>
                    </select>
                </div>
               
                <div className="space-y-4">
                    <label htmlFor="numBedrooms">Number of bedrooms:</label>
                    <input
                        type="number"
                        min="1"
                        id="numBedrooms"
                        name="numBedrooms"
                        value={numBedrooms}
                        onChange={handleChange}
                        placeholder="Number of bedrooms..."
                        className="w-full h-14 px-4 border border-gray-300 rounded-xl"
                    />
                </div>

               
            </div>

            <div className="mt-6 flex flex-row gap-4">
                <CustomButton
                    label="<-check price "
                    onClick={() => searchModal.open('price')}
                />

                <CustomButton
                    label="Search"
                    onClick={closeAndSearch}
                />
            </div>
        </>
    )

    if (searchModal.step === 'location') {
         content = contentLocation;
    } 
    else if(searchModal.step === 'price')
        {
            content = contentprice;
        }
    else if (searchModal.step === 'Details') {
        content = contentDetails;
    }

    return (
        <Modal
            label="Search"
            content={content}
            close={searchModal.close}
            isOpen={searchModal.isOpen}
        />
    )
}

export default SearchModal;









// import Modal from "./Modal";
// import { useState } from "react";
// import CustomButton from "./CustomButton";
// import useSearchModal, { SearchQuery } from "@/app/redux/hooks/useSearchModel";
// import SelectCountry, { SelectCountryValue } from "../Listing/setContries";

// const SearchModal = () => {
//     let content = (<></>);
//     const searchModal = useSearchModal();
//     const [sale_type, setSaleType] = useState<string>('For Sale');
//     const [home_type, setHomeType] = useState<string>('');
//     const [numBedrooms, setNumBedrooms] = useState<number>(0);
//     const [country, setCountry] = useState<SelectCountryValue>();
//     const [city, setCity] = useState<string>('');
//     const [address, setAddress] = useState<string>('');
//     const [minPrice, setMinPrice] = useState<number>(0);
//     const [maxPrice, setMaxPrice] = useState<number>(0);


//     const closeAndSearch = () => {
//         const newSearchQuery: SearchQuery = {
//             country: country?.label,
//             bedrooms: numBedrooms,
//             sale_type: sale_type,
//             home_type: home_type,
//             city: city,
//             address: address,
//             min_price: minPrice,
//             max_price: maxPrice
//         };

//         searchModal.setQuery(newSearchQuery);
//         searchModal.close();
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'home_type') {
//             setHomeType(value);
//         } else if (name === 'numBedrooms') {
//             setNumBedrooms(parseInt(value));
//         } else if (name === 'city') {
//             setCity(value);
//         } else if (name === 'address') {
//             setAddress(value);
//         } else if (name === 'minPrice') {
//             setMinPrice(parseFloat(value));
//         } else if (name === 'maxPrice') {
//             setMaxPrice(parseFloat(value));
//         }
//     };

//     const contentLocation = (
//         <>
//             <h2 className="mb-6 text-2xl">Where do you want to go?</h2>
//             <div>country</div>
//             <SelectCountry
//                 value={country}
//                 onChange={(value) => setCountry(value as SelectCountryValue)}
//             />
//              <div className="space-y-4">
//                     <label htmlFor="city">City:</label>
//                     <input
//                         type="text"
//                         id="city"
//                         name="city"
//                         value={city}
//                         onChange={handleChange}
//                         placeholder="City..."
//                         className="w-full h-14 px-4 border border-gray-300 rounded-xl"
//                     />
//                 </div>

//                 <div className="space-y-4">
//                     <label htmlFor="address">Address:</label>
//                     <input
//                         type="text"
//                         id="address"
//                         name="address"
//                         value={address}
//                         onChange={handleChange}
//                         placeholder="Address..."
//                         className="w-full h-14 px-4 border border-gray-300 rounded-xl"
//                     />
//                 </div>
            
//             <div className="mt-6 flex flex-row gap-4">
//                 <CustomButton
//                     label="price range ->"
//                     onClick={() => searchModal.open('price')}
//                 />
//             </div>
//         </>
//     )
//     const contentprice = (
//          <>
//             <h2 className="mb-6 text-2xl">Price Range</h2>
//             <div className="space-y-4">
//                 <label htmlFor="minPrice">Min Price:</label>
//                 <input
//                     type="number"
//                     min="0"
//                     id="minPrice"
//                     name="minPrice"
//                     value={minPrice}
//                     onChange={handleChange}
//                     placeholder="Enter min price..."
//                     className="w-full h-14 px-4 border border-gray-300 rounded-xl"
//                 />
//             </div>
//             <div className="space-y-4">
//                 <label htmlFor="maxPrice">Max Price:</label>
//                 <input
//                     type="number"
//                     min="0"
//                     id="maxPrice"
//                     name="maxPrice"
//                     value={maxPrice}
//                     onChange={handleChange}
//                     placeholder="Enter max price..."
//                     className="w-full h-14 px-4 border border-gray-300 rounded-xl"
//                 />
//             </div>
//             <div className="mt-6 flex flex-row gap-4">
//                 <CustomButton
//                     label="Details ->"
//                     onClick={() => searchModal.open('Details')}
//                 />
//             </div>
//         </>
//     )

//     const contentDetails = (
//         <>
//             <h2 className="mb-6 text-2xl">Details</h2>

//             <div className="space-y-4">
//                 <div className="space-y-4">
//                     <label htmlFor="home_type">Home Type:</label>
//                     <select
//                         id="home_type"
//                         name="home_type"
//                         value={home_type}
//                         onChange={handleChange}
//                         className="w-full h-14 px-4 border border-gray-300 rounded-xl"
//                     >
//                         <option value="rowhouse">Rowhouse</option>
//                         <option value="colonial">Colonial</option>
//                         <option value="flat">Flat</option>
//                         <option value="cottage">Cottage</option>
//                         <option value="bungalow">Bungalow</option>
//                         <option value="other">Other</option>
//                     </select>
//                 </div>

//                 <div className="space-y-4">
//                     <label htmlFor="numBedrooms">Number of bedrooms:</label>
//                     <input
//                         type="number"
//                         min="1"
//                         id="numBedrooms"
//                         name="numBedrooms"
//                         value={numBedrooms}
//                         onChange={handleChange}
//                         placeholder="Number of bedrooms..."
//                         className="w-full h-14 px-4 border border-gray-300 rounded-xl"
//                     />
//                 </div>

               
//             </div>

//             <div className="mt-6 flex flex-row gap-4">
//                 <CustomButton
//                     label="<-check price "
//                     onClick={() => searchModal.open('price')}
//                 />

//                 <CustomButton
//                     label="Search"
//                     onClick={closeAndSearch}
//                 />
//             </div>
//         </>
//     )

//     if (searchModal.step === 'location') {
//          content = contentLocation;
//     } 
//     else if(searchModal.step === 'price')
//         {
//          content = contentprice;
//         }
//     else if (searchModal.step === 'Details') {
//         content = contentDetails;
//     }

//     return (
//         <Modal
//             label="Search"
//             content={content}
//             close={searchModal.close}
//             isOpen={searchModal.isOpen}
//         />
//     )
// }

// export default SearchModal;
