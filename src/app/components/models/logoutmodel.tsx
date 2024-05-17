import { useDispatch } from "react-redux";
import MenuLink from "../navbar/MenuLink";
import { logout } from "@/app/redux/slice/authslice";
import { useRouter } from "next/navigation";


const LogoutButton: React.FC = () => {

    const dispatch = useDispatch();
    const router = useRouter()
    const submitLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        router.push('/')
        dispatch(logout());   
    }

    return (
        <MenuLink
            label="Log out"
            onClick={submitLogout}
        />
    )
}

export default LogoutButton;
