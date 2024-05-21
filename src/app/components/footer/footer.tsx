
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import apiService, { sendpodtdata } from "@/app/apiService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Footer = () => {
  const [message, setMessage] = useState("");
  const senderId = useSelector((state: any) => state.auth.token.uid);
  const token = useSelector((state: any) => state.auth.token.access);
  const [aftermsg, setAfterMsg] = useState<any>(null); 
  const [status, setStatus] = useState("");
  const handleMessageSubmit = async () => {
    try {
      const response = await sendpodtdata.post(
        "/api/contact/",
        { sender: senderId, message },
        token
      );
      console.log(response.data);
      if (response.data) {
        toast.success("Successfully send message");
      }
      setMessage("");
      setAfterMsg(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  
    if (aftermsg) {
      fetchMessageStatus();
    }
  }, [aftermsg]); 
  const fetchMessageStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/contact/${aftermsg?.id}/status/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      setStatus(response.data.status);
    
    } catch (error) {
      console.error(error); 
    }
  };
  return (
    <footer className="bg-white pt-8 mt-10 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-3">
        <div className="col-span-1 lg:col-span-1 sm:col-span-1">
          <div className="logo">
            <img src="/images/logo.jpg" alt="" className="w-32" />
            <h2 className="text-lg font-semibold mt-4">
              Do You Need Help With Anything?
            </h2>
            <p className="text-gray-500 mt-2">
              Receive updates, hot deals, tutorials, discounts sent straight to
              your inbox every month.
            </p>
            <div className="input flex mt-4 mb-4">
              <textarea
                className="bg-gray-200 px-4 py-2 rounded-l-md w-full lg:w-auto"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-[#0082cc] text-white px-4 py-2 rounded-r-md lg:ml-4"
                onClick={handleMessageSubmit}
              >
                Send Message
              </button>
            </div>
            {status && <div className="text-sm">{status}</div>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-1 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 mt-3">Explore</h3>
            <ul className="space-y-4 md:text-sm sm:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  🏠 Home Page
                </Link>
              </li>
              <li>
                <Link
                  href="/aboutus"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  🏢 About Page
                </Link>
              </li>
              <li>
                <Link
                  href="/contactus"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  📞 Contact Page
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  📰 Single Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 text-center ">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 mt-3">Company</h3>
            <ul className="space-y-4 md:text-sm sm:text-sm">
              <li>
                <Link
                  href="/about-us"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  🏢 About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  📝 Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  💰 Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-lg font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300"
                >
                  🔑 Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="bg-[#0082cc] text-white text-center py-4">
        <div className="container mx-auto">Welcome to HomeSphere</div>
      </section>

      <div className="legal text-center py-4 bg-gray-800 text-gray-500">
        <span>© 2024 HomeSphere. Designed By Ishita Chovatiya.</span>
      </div>
    </footer>
  );
};

export default Footer;
