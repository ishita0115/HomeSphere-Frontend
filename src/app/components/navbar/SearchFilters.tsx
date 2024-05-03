'use client';
import useSearchModal from "@/app/redux/hooks/useSearchModel";

const SearchFilters = () => {
    const searchModal = useSearchModal();

    return (
        <div 
            onClick={() => searchModal.open('location')}
            className="h-[48px] lg:h-[64] flex flex-row items-center justify-between border rounded-full"
        >
            <div className="hidden lg:block">
                <div className="flex flex-row items-center justify-between">
                    <div className="cursor-pointer w-[250px] h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Where</p>
                        <p className="text-sm">Wanted location</p>
                    </div>
                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">price range</p>
                        <p className="text-sm">price of home</p>
                    </div>
                    <div className="cursor-pointer h-[48px] lg:h-[64] px-8 flex flex-col justify-center rounded-full hover:bg-gray-100">
                        <p className="text-xs font-semibold">Details in</p>
                        <p className="text-sm">Details</p>
                    </div>

                    
                </div>
            </div>

            <div className="p-2">
                <div className="cursor-pointer p-2 lg:h-9 lg:p-4 lg:pt-1 bg-airbnb hover:bg-airbnb-dark transition rounded-full bg-[#0082cc] text-white">
                    <svg className="lg:mt-1"
                        viewBox="0 0 32 32" 
                        style={{display:'flex',fill:'none', height: '18px', width: '18px', stroke: 'currentColor', strokeWidth:4, overflow:'visible'}} 
                        aria-hidden="true" role="presentation" focusable="false"
                    >
                        <path fill="none" d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SearchFilters;