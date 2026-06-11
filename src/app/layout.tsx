"use client";
import "./globals.css";
import Navbar from './components/navbar/Navbar';
import LoginModal from "./components/models/LoginModel";
import SignupModal from "./components/models/signupmodel";
import { Providers } from "./redux/providers/providers";
import SearchModal from "./components/models/SearchModel";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isVideoCall = pathname?.includes("/Videocall/");
  const isHome = pathname === "/";

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
        <Providers>
          {!isVideoCall && <Navbar />}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {isVideoCall ? (
            <div className="pt-5">{children}</div>
          ) : isHome ? (
            <div>{children}</div>
          ) : (
            <div className="pt-20">{children}</div>
          )}
          <SearchModal />
          <LoginModal />
          <SignupModal />
        </Providers>
      </body>
    </html>
  );
}
