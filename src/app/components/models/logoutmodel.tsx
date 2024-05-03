import { useDispatch } from "react-redux";

import MenuLink from "../navbar/MenuLink";
import { logout } from "@/app/redux/slice/authslice";
import { useRouter } from "next/navigation";


const LogoutButton: React.FC = () => {

    const dispatch = useDispatch();
    const router = useRouter()
    const submitLogout = () => {
        // Clear token and user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        // localStorage.clear();
        // Dispatch logout action to update Redux state
        dispatch(logout());   
        router.push('/')
 
    }

    return (
        <MenuLink
            label="Log out"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;
