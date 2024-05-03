'use client';

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/chat/page";

interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
    const router = useRouter();
    const otherUser = conversation.users.find((user) => user.uid != userId)
    console.log(otherUser)
    return (
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl c">
            <p className="mb-6 text-xl">{otherUser?.first_name}  {otherUser?.last_name}</p>

            <p 
                onClick={() => router.push(`/chat/${conversation.id}`)}
                className="text-blue-500"
            >
                Go to conversation
            </p>
        </div>
    )
}

export default Conversation;