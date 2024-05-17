'use client';
import  { sendpodtdata } from "@/app/apiService";
import { useSelector } from "react-redux";

interface FavoriteButtonProps {
    id: number;
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
