
import { create } from "zustand";

export type SearchQuery = {
    country: string | undefined;
    address:string;
    city:string;
    bedrooms: Number;
    sale_type: string ;
    home_type:string;
    min_price: number,
    max_price: number
}

interface SearchModalStore {
    isOpen: boolean;
    step: string;
    open: (step: string) => void;
    close: () => void;
    query: SearchQuery;
    setQuery: (query: SearchQuery) => void;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    step: '',
    open: (step) => set({ isOpen: true, step: step }),
    close: () => set({ isOpen: false }),
    setQuery: (query: SearchQuery) => set({query: query}),
    query: {
        country: '',
        address: "",
        bedrooms: 0,
        city:'',
        sale_type: '',
        home_type:'',
        min_price: 0,
        max_price: 0

    
    }
}));

export default useSearchModal;
