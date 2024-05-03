
'use client';
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import Link from "next/link";
import { login } from "@/app/redux/slice/authslice";
import { useState } from "react";
// import { useRouter } from 'next/navigation'; // Changed from 'next/navigation' to 'next/router'
import LoginModalStore from "@/app/redux/hooks/loginhook";
import CustomButton from "./CustomButton";
import apiService from "../../apiService";
// import OAuth from "@/app/components/models/Oauth"
const LoginModal = () => {
    // const router = useRouter();
    const loginModal = LoginModalStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = {
            email: email,
            password: password
        };
            const response = await apiService.post('/api/login/', JSON.stringify(formData));
            if (response.success) {
                alert('Successfully logged in');
                const tokenValue = response.token.access;
                localStorage.setItem('token', tokenValue);
                dispatch(login([response.user,response.token]));
                loginModal.close();
                
              
            } else {
                setErrors(response.non_field_errors);
                alert('Credentials are not valid');
            }
    };
    const content = (
        <form onSubmit={handleSubmit} className="space-y-4"> {/* Changed 'action' to 'onSubmit' */}
            <input autoComplete="email" autoFocus onChange={(e) => setEmail(e.target.value)} placeholder="Your e-mail address" type="email" className="w-full h-[54px] px-4 border focus:bg-white bg-gray-200 border-gray-300 rounded-xl" />
            <input onChange={(e) => setPassword(e.target.value)} placeholder="Your password" type="password" className="w-full h-[54px] px-4 border border-gray-300 focus:bg-white bg-gray-200 rounded-xl" />
            {errors.map((error, index) => (
                <div key={`error_${index}`} className="p-5 bg-[#1ea8f8] text-rounded-xl opacity-80">
                    {error}
                </div>
            ))}
            <CustomButton
                    label="Submit"
                    onClick={handleSubmit}
                />

            {/* <OAuth/> */}
            <Link href="/forgot-password" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
                Forgot Password?
            </Link>
        </form>
    );

    return (
        <Modal
            isOpen={loginModal.isOpen}
            close={loginModal.close}
            label="Log in"
            content={content}
        />
    );
}

export default LoginModal;
