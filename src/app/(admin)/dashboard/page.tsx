"use client";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function DashboardLayout() {
  const [allVisitors, setAllVisitors] = useState([]);
  const token = useSelector((state) => state.auth.token.access);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/userslist/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAllVisitors(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Add token to the dependency array

  return (
    <div>
      <div className="flex gap-4">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Sales</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">$54232</strong>
              <span className="text-sm text-green-500 pl-2">+343</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
            <IoPieChart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Expenses</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">$3423</strong>
              <span className="text-sm text-green-500 pl-2">-343</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
            <IoPeople className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Customers</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">12313</strong>
              <span className="text-sm text-red-500 pl-2">-30</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
            <IoCart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Total Orders</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">16432</strong>
              <span className="text-sm text-red-500 pl-2">-43</span>
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div>
        <h2>All Users:</h2>
        <div className="flex gap-4 overflow-x-auto">
          <table className="min-w-screen divide-y divide-gray-200 w-1/2 max-h-40 overflow-y-scroll">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">All Sellers</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 rounded">
              {allVisitors.map((user, index) => (
                <tr key={index}>
                  {user.role === 2 && (
                    <td className="px-6 py-4 whitespace-nowrap">{user.first_name} {user.last_name} {user.email}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <table className="min-w-screen divide-y divide-gray-200 w-1/2 max-h-80 overflow-y-scroll">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">All Buyers</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allVisitors.map((user, index) => (
                <tr key={index}>
                  {user.role === 3 && (
                    <td className="px-6 py-4 whitespace-nowrap">{user.first_name} {user.last_name} {user.email}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BoxWrapper({ children }) {
  return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
