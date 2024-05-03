'use client';

import useLoginModal from "@/app/components/models/LoginModel";
import useAddPropertyModal from "@/app/redux/hooks/addPropertyModel";
import LoginModal from "@/app/components/models/LoginModel";
import { useSelector } from "react-redux";
interface AddPropertyButtonProps {
    userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({
    userId
}) => {
    const loginModal = useLoginModal();
    const userDataAfterLogin = useSelector((state :any)=>state.auth.users)
    const userauthenticate = useSelector((state:any)=>state.auth)
    const addPropertyModal = useAddPropertyModal();
    
    const HomeSphere = () => {
        if (userId) {
            addPropertyModal.open()
            console.log(userId)
        } else {
            loginModal.open();
        }
    }

   if(userauthenticate.isAuthenticated){
    return( <div 
        onClick={HomeSphere}
        className="ml-2 cursor-pointer text-sm font-semibold "
    >
     {userDataAfterLogin.first_name}
    </div>)
   
   }else {
    return( <div 
        onClick={HomeSphere}
        className="ml-2 cursor-pointer text-sm font-semibold"
    >
       Welcome
    </div>)
   }
}

export default AddPropertyButton;