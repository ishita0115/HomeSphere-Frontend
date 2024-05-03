'use client';
import { useEffect, useState, useRef } from "react";
import CustomButton from "../models/CustomButton";
import { ConversationType } from "@/app/chat/page";
import useWebSocket, {ReadyState} from "react-use-websocket";
import { MessageType } from "@/app/chat/[id]/page";
import { UserType } from "@/app/chat/page";

// interface ConversationDetailProps {
//     token: string;
//     userId: string;
//     conversation: ConversationType;
//     messages: MessageType[];
// }

// const ConversationDetail: React.FC<ConversationDetailProps> = ({
//     userId,
//     token,
//     messages,
//     conversation
// }) => {
//     const messagesDiv = useRef<HTMLDivElement>(null);
//     const [newMessage, setNewMessage] = useState('');
//     const myUser = conversation.users?.find((user) => user.uid == userId)
//     const otherUser = conversation.users?.find((user) => user.uid != userId)
//     const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);

//     const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`, {
//         share: false,
//         shouldReconnect: () => true,
//       },
//     )

//     useEffect(() => {
//         console.log("Connection state changed", readyState);
//     }, [readyState]);

//     useEffect(() => {
//         if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
//             const message: MessageType = {
//                 id: '',
//                 name: lastJsonMessage.name as string,
//                 body: lastJsonMessage.body as string,
//                 sent_to: otherUser as UserType,
//                 created_by: myUser as UserType,
//                 conversationId: conversation.id
//             }

//             setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
//         }

//         scrollToBottom();
//     }, [lastJsonMessage]);

//     const sendMessage = async () => {
//         console.log('sendMessage'),

//         sendJsonMessage({
//             event: 'chat_message',
//             data: {
//                 body: newMessage,
//                 name: myUser?.first_name,
//                 sent_to_id: otherUser?.id,
//                 conversation_id: conversation.id
//             }
//         });

//         setNewMessage('');

//         setTimeout(() => {
//             scrollToBottom()
//         }, 50);
//     }

//     const scrollToBottom = () => {
//         if (messagesDiv.current) {
//             messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
//         }
//     }

//     return (
//         <>
//             <div 
//                 ref={messagesDiv}
//                 className="max-h-[400px] overflow-auto flex flex-col space-y-4"
//             >
//                 {messages.map((message, index) => (
//                     <div
//                         key={index}
//                         className={`w-[80%]py-4 px-6 rounded-xl ${message.created_by.name == myUser?.first_name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
//                     >
//                         <p className="font-bold text-gray-500">{message.created_by.name}</p>
//                         <p>{message.body}</p>
//                     </div>
//                 ))}

//                 {realtimeMessages.map((message, index) => (
//                     <div
//                         key={index}
//                         className={`w-[80%]py-4 px-6 rounded-xl ${message.name == myUser?.first_name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
//                     >
//                         <p className="font-bold text-gray-500">{message.name}</p>
//                         <p>{message.body}</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
//                 <input
//                     type="text"
//                     placeholder="Type your message..."
//                     className="w-full p-2 bg-gray-200 rounded-xl"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                 />

//                 <CustomButton 
//                     label='Send'
//                     onClick={sendMessage}
//                     className="w-[100px]"
//                 />
//             </div>
//         </>
//     )
// }

// export default ConversationDetail;

// import React, { useEffect, useState, useRef } from "react";
// import CustomButton from "../models/CustomButton";
// import { ConversationType } from "@/app/chat/page";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// import { MessageType } from "@/app/chat/[id]/page";
// import { UserType } from "@/app/chat/page";

// interface ConversationDetailProps {
//     token: string;
//     userId: string;
//     conversation: ConversationType;
// }

// const ConversationDetail: React.FC<ConversationDetailProps> = ({
//     userId,
//     token,
//     conversation
// }) => {
//     const messagesDiv = useRef<HTMLDivElement>(null);
//     const [newMessage, setNewMessage] = useState('');
//     const myUser = conversation.users?.find((user) => user.uid === userId);
//     const otherUser = conversation.users?.find((user) => user.uid != userId)
//     const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
//     const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
//         `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`,
//         {
//             share: false,
//             shouldReconnect: () => true,
//         }
//     );
// console.log(`${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`)
//     useEffect(() => {
//         console.log("WebSocket connection state:", readyState);
//         if (readyState === ReadyState.CONNECTING) {
//             console.log("WebSocket connection is in the process of connecting...");
//         } else if (readyState === ReadyState.OPEN) {
//             console.log("WebSocket connection is open.");
//         } else if (readyState === ReadyState.CLOSING) {
//             console.log("WebSocket connection is closing...");
//         } else if (readyState === ReadyState.CLOSED) {
//             console.log("WebSocket connection is closed.");
//             // Handle closed connection, possibly attempt reconnection
//         } else if (readyState === ReadyState.UNINSTANTIATED) {
//             console.log("WebSocket connection is not yet instantiated.");
//             // Handle uninitialized connection
//         }
//     }, [readyState]);

//     useEffect(() => {
//         console.log("Last JSON message:", lastJsonMessage);
//         if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
//             console.log("Received message:", lastJsonMessage);
//             const message: MessageType = {
//                 id: '',
//                 name: lastJsonMessage.name as string,
//                 body: lastJsonMessage.body as string,
//                 sent_to: otherUser as UserType,
//                 created_by: myUser as UserType,
//                 conversationId: conversation.id
//             }
//             console.log("Processed message:", message);
//             setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
//         }
//         scrollToBottom();
//     }, [lastJsonMessage]);

//     useEffect(() => {
//         console.log("WebSocket connection state:", readyState);
//     }, [readyState]);

//     const sendMessage = async () => {
//         if (readyState === ReadyState.OPEN) {
//             console.log('Sending message:', newMessage);
//             sendJsonMessage({
//                 event: 'chat_message',
//                 data: {
//                     body: newMessage,
//                     name: myUser?.first_name,
//                     sent_to_id: otherUser?.uid,
//                     conversation_id: conversation.id
//                 }
//             });
//             setNewMessage('');
//             setTimeout(() => {
//                 scrollToBottom();
//             }, 50);
//         } else {
//             console.log('WebSocket connection is not open. Message not sent.');
//         }
//     };

//     const scrollToBottom = () => {
//         if (messagesDiv.current) {
//             messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
//         }
//     };

//     return (
//         <>
//             <div 
//                 ref={messagesDiv}
//                 className="max-h-[400px] overflow-auto flex flex-col space-y-4"
//             >
//                  {realtimeMessages.map((message, index) => (
//                     <div
//                         key={index}
//                         // className={`w-[80%] py-4 px-6 rounded-xl ${message.name === myUser?.first_name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
//                     >
//                         <p className="font-bold text-gray-500">{message.name}</p>
//                         <p>{message.body}</p>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
//                 <input
//                     type="text"
//                     placeholder="Type your message..."
//                     className="w-full p-2 bg-gray-200 rounded-xl"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                 />

//                 <CustomButton 
//                     label='Send'
//                     onClick={sendMessage}
//                     className="w-[100px]"
//                 />
//             </div>
//         </>
//     );
// };

// export default ConversationDetail;



const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    messages,
    conversation,
}) => {
    const messagesDiv = useRef<HTMLDivElement>(null);
    const [newMessage, setNewMessage] = useState('');
    const myUser = conversation.users?.find((user) => user.uid == userId);
    const otherUser = conversation.users?.find((user) => user.uid != userId);
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
    const [retryCount, setRetryCount] = useState(0);

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        `${process.env.NEXT_PUBLIC_WS_HOST}/ws/${conversation.id}/?token=${token}`,
        {
            share: false,
            shouldReconnect: () => true,
            retryOnError: true, // Automatically retry on error
            onError: (event) => {
                console.error('WebSocket error:', event);
                // Retry connecting if there's an error
                setRetryCount((prevCount) => prevCount + 1);
            },
        }
    );
    
    useEffect(() => {
        console.log('WebSocket connection state:', readyState);
        
    }, [readyState]);

    useEffect(() => {
        console.log('Last JSON message:', lastJsonMessage);
        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'body' in lastJsonMessage) {
            const message: MessageType = {
                id: '',
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id,
            };

            setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
        }

        scrollToBottom();
    }, [lastJsonMessage]);

    const sendMessage = async () => {
        if (readyState === ReadyState.OPEN) {
            console.log('Sending message:', newMessage);
            const messageData = {
                event: 'chat_message',
                data: {
                    body: newMessage,
                    sent_to_id: otherUser?.uid,
                    conversation_id: conversation.id,
                },
            };
            // Stringify the message object before sending
            const messageString = JSON.stringify(messageData);
            sendJsonMessage(messageString).catch((error) => {
                console.error('Error sending message:', error);
            });
            setNewMessage('');
            setTimeout(() => {
                scrollToBottom();
            }, 50);
        } else if (readyState === ReadyState.CONNECTING) {
            console.log('WebSocket connection is still opening. Please wait.');
        } else {
            console.log('WebSocket connection is not open. Message not sent. Retrying...');
            // You can implement a retry mechanism here if needed
            if (retryCount < MAX_RETRY_COUNT) {
                // Retry connecting
                setRetryCount((prevCount) => prevCount + 1);
            } else {
                console.log('Max retry count reached. Unable to establish connection.');
                // Provide feedback to the user
            }
        }
    };

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    };

    return (
        <>
            <div ref={messagesDiv} className="max-h-[400px] overflow-auto flex flex-col space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-[80%]py-4 px-6 rounded-xl ${
                            message.created_by.first_name == myUser?.first_name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'
                        }`}
                    >
                        <p className="font-bold text-gray-500">{message.created_by.first_name}</p>
                        <p>{message.body}</p>
                    </div>
                ))}

                {realtimeMessages.map((message, index) => (
                    <div key={index}>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>

            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />

                <CustomButton label="Send" onClick={sendMessage} className="w-[100px]" />
            </div>
        </>
    );
};

export default ConversationDetail;
