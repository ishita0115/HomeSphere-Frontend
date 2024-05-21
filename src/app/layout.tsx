"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/navbar/Navbar';
import LoginModal from "./components/models/LoginModel";
import SignupModal from "./components/models/signupmodel";
import { Providers } from "./redux/providers/providers";
import SearchModal from "./components/models/SearchModel";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {usePathname, useRouter } from 'next/navigation'
import { Metadata } from "next";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  // const router = useRouter();
  // const pathname = "";
  const pathname = usePathname()
  const isMyListingPage = pathname.includes("/Videocall/");
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        {!isMyListingPage &&  <Navbar />}
          <ToastContainer />
          {isMyListingPage ? <div className="pt-5">
            {children}
          </div > : <div className="pt-32">
            {children}
          </div >}
          <SearchModal />
          <LoginModal />
          <SignupModal />
        </Providers>
      </body>
    </html>
  );
}
