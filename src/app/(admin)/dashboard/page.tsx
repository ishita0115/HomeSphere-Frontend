"use client";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { profileApiservive } from "@/app/apiService";
import AdminMiddleware from "../AdminMiddleware";
function DashboardLayout() {
  const [allVisitors, setAllVisitors] = useState([]);
  const [allBookings, setBookings] = useState([]);
  const token = useSelector((state: any) => state.auth.token.access);
  const uid = useSelector((state: any) => state.auth.token.uid);
  const [fetchedProperties, setFetchedProperties] = useState([]);
  const [deletehome, setdeletehome] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let url = "/api/userslist/";
        const response = await profileApiservive.get(url, token);
        setAllVisitors(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/app2/ManageListingView/";
        const response = await profileApiservive.get(url, token);
        setFetchedProperties(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/app2/bookings/";
        const response = await profileApiservive.get(url, token);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uid]);

  useEffect(() => {
    const fetchDeletedListings = async () => {
      try {
        let url = "/app2/AllTrashdata/";
        const response = await profileApiservive.get(url, token);
        setdeletehome(response);
      } catch (error) {
        console.error("Error fetching deleted listings:", error);
      }
    };

    fetchDeletedListings();
  }, [uid]);

  return (
    <div className="p-8">
      <div className="grid grid-cols-4 gap-4">
        <BoxWrapper color="bg-orange-600">
          <IoPieChart className="text-2xl text-white" />
          <div className="pl-4">
            <span className="text-sm text-gray-700 font-light">Total Home</span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {fetchedProperties.length}
              </strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper color="bg-yellow-400">
          <IoPeople className="text-2xl text-white" />
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Current Bookings
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {allBookings.length}
              </strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper color="bg-yellow-400">
          <IoBagHandle className="text-2xl text-white" />
          <div className="pl-4">
            <span className="text-sm text-gray-700 font-light">
              Total Users
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {allVisitors.length - 1}
              </strong>
              <span className="text-sm text-green-500 pl-2">
                Buyer and Seller
              </span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper color="bg-green-600">
          <IoCart className="text-2xl text-white" />
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Trash Home
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {deletehome.length}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-8 overflow-x-auto">
          <UserTable title="All Sellers" role={2} data={allVisitors} />
          <UserTable title="All Buyers" role={3} data={allVisitors} />
        </div>
      </div>
    </div>
  );
}

interface BoxWrapperProps {
  children: React.ReactNode;
  color: string;
}

function BoxWrapper({ children, color }: BoxWrapperProps) {
  return (
    <div
      className={`bg-white rounded-sm p-4 border border-gray-200 flex items-center ${color}`}
    >
      {children}
    </div>
  );
}

interface UserTableProps {
  title: string;
  role: number;
  data: any[];
}
function UserTable({ title, role, data }: UserTableProps) {
  const filteredUsers = data.filter((user) => user.role === role);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="max-h-80 overflow-y-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Profile
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {" "}
                  <img
                    className="rounded-full mt-5 w-14 h-14 object-cover"
                    src={
                      user.profilephoto
                        ? user && user.profilephoto
                        : "/images/defaultuser.png"
                    }
                    alt="Profile Picture"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMiddleware(DashboardLayout);
