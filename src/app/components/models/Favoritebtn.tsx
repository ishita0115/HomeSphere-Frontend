'use client';
import { IoMdHeart } from "react-icons/io";
import  { sendpodtdata } from "@/app/apiService";
import { useSelector } from "react-redux";

interface FavoriteButtonProps {
    id: string;
    is_favorite: boolean;
    markFavorite: (is_favorite: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    id,
    is_favorite,
    markFavorite
}) => {
    const token = useSelector((state: any) => state.auth.token.access);
    const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            console.log("llllllllll")
            const response = await sendpodtdata.post(`/app2/favorite/${id}/`,{},token);
            console.log('Response from toggleFavorite:', response);
            markFavorite(response.is_favorite);
        } catch (error) {
            console.error('Error in toggleFavorite:', error);
        }
    }

    return (
        <div
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 ${is_favorite ? 'text-pink' : 'text-red'} hover:text-airbnb`}
        >
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg> */}
             <div className="absolute bottom-0 left-5 mb-3 flex rounded "  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                  <div className="flex items-center font-medium text-gray-200 mr-1 shadow-sm">
                 
                    <div className=" mr-2 text-sm ml-1 text-gray-300 hover:text-white">
                    Add Cart
                    </div>
                  </div>
                </div>
        </div>
    )
}

export default FavoriteButton;
