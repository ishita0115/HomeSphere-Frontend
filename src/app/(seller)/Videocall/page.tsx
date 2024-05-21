// 'use client'
// import * as React from 'react';
// import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
// import { useEffect, useRef } from 'react';

// function randomID(len: number) {
//   let result = '';
//   if (result) return result;
 
//   var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
//     maxPos = chars.length,
//     i;
//   len = len || 5;
//   for (i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }
//   return result;
// }


// function generateToken(tokenServerUrl: string, userID: string) {

//   return fetch(
//     `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
//     {
//       method: 'GET',
//     }
//   ).then((res) => res.json());
// }

// export function getUrlParams(
//   url: string = window.location.href
// ): URLSearchParams {
//   let urlStr = url.split('?')[1];
//   return new URLSearchParams(urlStr);
// }

// async function requestMediaPermissions() {
//   try {
//     await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     return true;
//   } catch (err) {
//     console.error("Permission denied: ", err);
//     alert("Please grant permissions for camera and microphone in your browser settings and reload the page.");
//     return false;
//   }
// }

// async function checkDevices() {
//   const devices = await navigator.mediaDevices.enumerateDevices();
//   const hasVideoInput = devices.some(device => device.kind === 'videoinput');
//   const hasAudioInput = devices.some(device => device.kind === 'audioinput');
  
//   if (!hasVideoInput || !hasAudioInput) {
//     alert("We can't detect your devices. Please check your devices and allow us access your devices in your browser's address bar. Then reload this page and try again.");
//     return false;
//   }
  
//   return true;
// }

// export default function App() {
//   const roomID = getUrlParams().get('roomID') || randomID(5);
//   const userID = randomID(5);
//   const userName = randomID(5);
//   const containerRef = useRef(null);
//   useEffect(() => {
//          if (typeof window !== 'undefined' && containerRef.current) {
//   let myMeeting = async (element: HTMLDivElement) => {
   
//     const { token } = await generateToken(
//       'https://nextjs-token.vercel.app/api',
//       userID
//     );
//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
//       1484647939,
//       token,
//       roomID,
//       userID,
//       userName
//     );

//     const zp = ZegoUIKitPrebuilt.create(kitToken);
 
//     zp.joinRoom({
//       container: element,
//       sharedLinks: [
//         {
//           name: 'Personal link',
//           url:
//             window.location.origin +
//             window.location.pathname +
//             '?roomID=' +
//             roomID,
//         },
//       ],
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall, 
//       },
//     });
//   };
//   myMeeting(containerRef.current);
//     }
//   }, [roomID]);
//   return (
//     <div
//       className="myCallContainer"
//       ref={containerRef}
//       style={{ width: '100vw', height: '100vh' }}
//     ></div>
//   );
// }



'use client';
import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

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

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}





export default function Videocall() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const containerRef = useRef(null);

  useEffect(() => {
    const initializeVideoCall = async () => {
      if (typeof window !== 'undefined' && containerRef.current) {
        // Request media permissions and check devices


        // Generate Kit Token
        const appID = 1220834105;
        const serverSecret = "6a6d633486cd77671e102d90b60e1362";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

        // Create instance object from Kit Token
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Start the call
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

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
