"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import apiService, { profileApiservive } from "@/app/apiService";
import authMiddleware from "@/app/authMiddelware";
import { addUserProfile } from "../redux/slice/user-list-slice";
import { login, updateProfile } from "../redux/slice/authslice";

const ProfileSettings = () => {
  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const token = useSelector((state) => state.auth.token.access);
  const uid = useSelector((state) => state.auth.token.uid);
  const dispatch = useDispatch();

  const [newValue,setNewValue] = useState<boolean>(false)

  useEffect(() => {
    fetchUserData();
  }, [newValue]);

  const fetchUserData = async () => {
    try {
      const userDataResponse = await profileApiservive.get(
        `/api/UserProfileView/${uid}/`,
        token
      );
      setUserData(userDataResponse);
      // dispatch(addUserProfile(userData))
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveProfile = async () => {
    setNewValue(false)
    try {
      const formData = new FormData();
      formData.append("first_name", userData.first_name);
      formData.append("last_name", userData.last_name);
      formData.append("mobileno", userData.mobileno);
      formData.append("email", userData.email);
      console.log(profilePicture);
      if (profilePicture) {
        formData.append("profilephoto", profilePicture);
      }

      const response = await apiService.put(
        `/api/usersupdate/${uid}/`,
        formData,
        token
      );

      if (response) {
        console.log(response.token);
        dispatch(updateProfile(response));
        alert("Profile updated successfully");
        setIsEditMode(false);
        setNewValue(true)
      }
    } catch (error) {
      setNewValue(false)
      alert("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
    setError(null); // Clear error when input changes
  };

  return (
    <div className="rounded shadow-[#4689ab] bg-white mt-5 mb-5 ml-5 mr-5">
      <div className="flex m-2 flex-col lg:flex-row">
        <div className="lg:w-1/4 border-r border-gray-200">
          <div className="flex flex-col items-center text-center p-3 py-5">
            <div className="relative">
              <img
                className="rounded-full mt-5 w-36 h-36 object-cover"
                src={
                  profilePicture
                    ? URL.createObjectURL(profilePicture)
                    : (userData && userData.profilephoto) ||
                      "/images/defaultuser.png"
                }
                alt="Profile Picture"
              />
              {isEditMode && (
                <label
                  htmlFor="profilePictureInput"
                  className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </label>
              )}
              {isEditMode && (
                <input
                  id="profilePictureInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  name="profilephoto"
                  onChange={handleImageChange}
                />
              )}
            </div>
            <span className="font-bold mt-3 bg-blue-200 p-1 rounded ">
              {userData ? userData.first_name : ""}
            </span>
            <span className="text-gray-700 mt-2">
              {userData ? userData.email : ""}
            </span>
          </div>
        </div>
        <div className="lg:w-3/5 border-r border-gray-200">
          <div className="p-3 py-5">
            <h4 className="text-right mb-3 lg:text-left">Profile Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 mt-2"
                  htmlFor="first_name"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={userData ? userData.first_name : ""}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 mt-2"
                  htmlFor="last_name"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={userData ? userData.last_name : ""}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 mt-3"
                  htmlFor="mobileno"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="mobileno"
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={userData ? userData.mobileno : ""}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 mt-3"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="text"
                  className="form-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={userData ? userData.email : ""}
                  onChange={handleInputChange}
                  disabled={!isEditMode}
                />
              </div>
            </div>
            <div className="mt-5 text-center lg:text-left p-2">
              {!isEditMode ? (
                <button
                  className="btn profile-button text-white m-3 p-2"
                  type="button"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  className="btn profile-button text-white m-3 p-2"
                  type="button"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-1/4">
          <div className="p-3 py-5">
            <div className="flex justify-between items-center mb-3">
              <span>My Listing</span>
              <span className="border px-3 py-1 add-experience">
                {" "}
                <i className="fa fa-plus"></i>Click Me
              </span>
            </div>
            <div>
              <label className="labels">......................</label>
              <input
                type="text"
                className="form-input"
                value={userData ? userData.experience_designing : ""}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default authMiddleware(ProfileSettings);
