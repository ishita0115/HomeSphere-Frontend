'use client';

import React, { useState, useEffect } from 'react';
import { fetchListingDetail } from '@/app/apiService';
import ConversationDetail from "@/app/components/chating/ConversationDetail";
import { UserType } from "../page";
import { useSelector } from 'react-redux';

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;
};

const ConversationPage = ({ params }: { params: { id: string } }) => {
    const userId = useSelector((state: any) => state.auth.token.uid);
    const token = useSelector((state: any) => state.auth.token.access);
    const [conversation, setConversation] = useState<any>(null);
    const [convmessage,setConvmessage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId || !token) {
                    throw new Error("You need to be authenticated...");
                }
                const conversationData = await fetchListingDetail(`app3/ConversationsDetail/${params.id}`, token);
                setConversation(conversationData.conversation);
                setConvmessage(conversationData.messages)
                
            } catch (error) {
                setError(error.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id, token, userId]);

    if (loading) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <p>Loading...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-[1500px] mx-auto px-6 pb-6">
                <p>{error}</p>
            </main>
        );
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            {conversation && (
                <ConversationDetail 
                    token={token}
                    userId={userId}
                    messages={convmessage}
                    conversation={conversation}
                />
            )}
        </main>
    );
};

export default ConversationPage;
