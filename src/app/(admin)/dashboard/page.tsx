"use client";
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { profileApiservive } from "@/app/apiService";
import AdminMiddleware from "../AdminMiddleware";
import Horizontalchart from "../Horizontalchart";

function DashboardLayout() {
  const [allVisitors, setAllVisitors] = useState([]);
  const [allBookings, setBookings] = useState([]);
  const token = useSelector((state: any) => state.auth.token.access);
  const uid = useSelector((state: any) => state.auth.token.uid);
  const [fetchedProperties, setFetchedProperties] = useState<any[]>([]);
  const [deletehome, setDeleteHome] = useState<any[]>([]);
  const [subscibeuser,setsubscibeuser] = useState<any[]>([]);
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
        console.log(response.results.data)
        setFetchedProperties(response.results.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/app2/bookingsget/";
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
        setDeleteHome(response);
      } catch (error) {
        console.error("Error fetching deleted listings:", error);
      }
    };

    fetchDeletedListings();
  }, [uid]);
  useEffect(() => {
    const fetchDeletedListings = async () => {
      try {
        let url = "/razorpayapp/usersallsubscibe/";
        const response = await profileApiservive.get(url, token);
        console.log(response)
        setsubscibeuser(response);
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
      
      <div>
      <h2 className="text-lg font-semibold mb-4">Home List</h2>
      <div className="max-h-80 overflow-y-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-100 sticky top-0">
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
                Country
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                City
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                price
              </th>
              
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
              Sale Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Owner Name
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fetchedProperties.map((Home, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {" "}
                  <img
                    className="rounded-full mt-5 w-14 h-14 object-cover"
                    src={
                      Home.image1
                    }
                    alt="Profile Picture"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {Home.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{Home.country}</td>
                <td className="px-6 py-4 whitespace-nowrap">{Home.city}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹ {Home.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{Home.sale_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{Home.user_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      <h2 className="text-lg font-semibold mb-4 mt-5">Subscribed User Data</h2>
      <div className="max-h-80 overflow-y-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-orange-300 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                index
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                First Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Last Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
              >
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {subscibeuser.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index +1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.Firstname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.lastname}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Horizontalchart/>
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
          <thead className="bg-blue-100 sticky top-0">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Profile
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
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
