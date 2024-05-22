'use client';

import useLoginModal from "./LoginModel";
import { useRouter } from "next/navigation";
import {fetchListingDetail} from "@/app/apiService";
import { useSelector } from "react-redux";

interface ContactButtonProps {
    useremail: string;
    landlordId: string;
    uid:string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    useremail,
    landlordId,
    uid
}) => {
    const token = useSelector((state: any) => state.auth.token.access);
    const loginModal = useLoginModal();
    const router = useRouter();
    console.log(useremail)
    const fetchPaymentStatus = async () => {
        try {
            const response = await fetch(`http://localhost:8000/razorpayapp/payment-status/${uid}/`); 
            const data = await response.json();
            return data.payment_done;
        } catch (error) {
            console.error('Error fetching payment status:', error);
            return false;
        }
    };
    const startConversation = async () => {
        const paymentDone = await fetchPaymentStatus();
        if (paymentDone) {
            window.location.href = `/Videocall/${landlordId}`;
        } else {
            window.location.href = `/Payment`;
            
        }
    }

    return (
        <div 
            onClick={startConversation}
            className="mt-6 py-4 px-6 cursor-pointer bg-airbnb text-white rounded-xl hover:bg-rose-700 bg-[#0082cc] transition"
        >
            Contact
        </div>
    )
}

export default ContactButton;