
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Usermiddleware from '../../usermiddleware';

function randomID(len: number) {
  let result = '';
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  const maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

function Videocall({ params }: { params: { id: number } }) {
  const [copiedLink, setCopiedLink] = useState('');
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const buyerid = useSelector((state: any) => state.auth.token.uid);

  const containerRef = useRef(null);

  useEffect(() => {
    const initializeVideoCall = async () => {
    
      if (typeof window !== 'undefined' && containerRef.current) {
      
        const appID = 1220834105;
        const serverSecret = "6a6d633486cd77671e102d90b60e1362";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          container: containerRef.current,
          sharedLinks: [
            {
              name: 'Copy link',
              url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
          },
        });
      }
    };

    initializeVideoCall();
  }, [roomID]); 
  const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCopiedLink(event.target.value);
  };
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      
      const response = await fetch(`http://localhost:8000/app2/submit-link/${params.id}/${buyerid}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: copiedLink }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send link to backend');
      }
  
      setCopiedLink('');
      toast.success('Link sent successfully');
    } catch (error:any) {
      console.error(error);
    }
  };
  
  return (
    <>
     <div className='flex justify-center mt-0 mb-2'>
    <form onSubmit={handleSubmit}>
        <input
          className='bg-white rounded p-2'
          type="text"
          value={copiedLink}
          onChange={handleInputChange}
          placeholder="Paste copied link here sendseller"
        />
        <button type="submit" className='bg-blue-300 rounded p-2 ml-3'>Submit</button>
      </form>

    </div>
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    >
    </div>
   
   </>
  );
}


export default Usermiddleware(Videocall);