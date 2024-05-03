'use client';

import useLoginModal from "./LoginModel";
import { useRouter } from "next/navigation";
import {fetchListingDetail} from "@/app/apiService";
import { useSelector } from "react-redux";

interface ContactButtonProps {
    userId: string | null;
    landlordId: string;
}

const ContactButton: React.FC<ContactButtonProps> = ({
    userId,
    landlordId
}) => {
    const token = useSelector((state) => state.auth.token.access);
    const loginModal = useLoginModal();
    const router = useRouter();
    console.log(landlordId)
    const startConversation = async () => {
        if (userId) {
            const conversation = await fetchListingDetail(`app3/start/${landlordId}`,token)
            if (conversation.conversation_id) {
                // router.push(`/chat/${conversation.conversation_id}`)
                   router.push(`/indexchat/${conversation.conversation_id}`)
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