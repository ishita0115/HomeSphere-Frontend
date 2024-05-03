'use client'
import React, { useState, useEffect } from 'react';
import Conversation from "../components/chating/Conversation";
import { useSelector } from 'react-redux';
import {fetchListingDetail} from '../apiService';

export type UserType = {
    uid: string;
    id: string;
    name: string;
    avatar_url: string;
}

export type ConversationType = {
    id: string;
    users: UserType[];
}

const chatapp = () => {
    const userId = useSelector((state) => state.auth.token.uid);
    const token = useSelector((state) => state.auth.token.access);
    const [conversations, setConversations] = useState<ConversationType[]>([]);

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await fetchListingDetail('app3/ConversationsList',token);
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        };
        if (userId) {
            fetchConversations();
        }
    }, [userId]);

    if (!userId) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        )
    }
console.log(conversations)
    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
            <h1 className="my-6 text-2xl">My Chat</h1>

            {conversations.map((conversation: ConversationType) => {
                return (
                    <Conversation 
                        userId={userId}
                        key={conversation.id}
                        conversation={conversation}
                    />
                )
            })}
        </main>
    )
}

export default chatapp;
