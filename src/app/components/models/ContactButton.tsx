'use client';

import useLoginModal from "./LoginModel";
import { useRouter } from "next/navigation";
import {fetchListingDetail} from "@/app/apiService";
import { useSelector } from "react-redux";

interface ContactButtonProps {
    useremail: string;
    landlordId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    useremail,
    landlordId
}) => {
    const token = useSelector((state: any) => state.auth.token.access);
    const loginModal = useLoginModal();
    const router = useRouter();
    console.log()
    const startConversation = async () => {
        if (useremail) {
            const conversation = await fetchListingDetail(`app3/start/${landlordId}`,token)
            if (conversation.conversation_id) {
                router.push(`/Videocall`);
            }
        } else {
            router.push('/')
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