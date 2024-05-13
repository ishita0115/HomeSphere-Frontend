"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MenuLink from "./MenuLink";
// import LogoutButton from "../LogoutButton";
import LogoutButton from "../models/logoutmodel";
import useLoginModal from "@/app/redux/hooks/loginhook";
import useSignupModal from "@/app/redux/hooks/signuphook";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { RootState } from "@/app/redux/store/store";
import { profileApiservive } from "@/app/apiService";
interface UserNavProps {
  userId?: string | null;
}

const UserNav: React.FC<UserNavProps> = ({ userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [isOpen, setIsOpen] = useState(false);
  const userDataAfterLogin = useSelector((state: any) => state.auth.users);
  console.log("user after login ", userDataAfterLogin.first_name);
  const userauthenticate = useSelector((state: any) => state.auth);
  const uid = useSelector((state: any) => state.auth.token.uid);
  const token = useSelector((state: any) => state.auth.token.access);
  const userprofile = useSelector((state: any) => state.auth.users.profilephoto);
  return (
    <div className="p-2 relative hover:bg-[#0082cc] inline-block border rounded-full">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {userprofile ? (
          <img
            src={userprofile}
            alt="Profile Picture"
            className="rounded-full w-8 h-8 "
          />
        ) : (
          <FaUserCircle
            className=""
            style={{ width: "28px", height: "28px" }}
          />
        )}
      </button>

      {isOpen && (
        <div className="w-[220px] absolute top-[60px] right-0 bg-white border rounded-xl shadow-md flex flex-col cursor-pointer">
          {userauthenticate.isAuthenticated ? (
            <>
              <MenuLink
                label="My profile"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myprofile");
                }}
              />
              <MenuLink
                label="Listing"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/DetailHome");
                }}
              />
              {userDataAfterLogin.role === 2 ||
              userDataAfterLogin.role === 1 ? (
                <MenuLink
                  label="Add Listing"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/addlistingform");
                  }}
                />
              ) : (
                console.log("You are not a seller")
              )}
            {userDataAfterLogin.role === 2 ||
              userDataAfterLogin.role === 1 ? (
                <MenuLink
                  label="request visit home"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/Bokkingrequest");
                  }}
                />
              ) : (
                console.log("You are not a seller")
              )}
              <MenuLink
                label="My favorites"
                onClick={() => {
                  setIsOpen(false);
                  router.push("/myfavourite");
                }}
              />
                {
              userDataAfterLogin.role === 1 ? (
              <MenuLink
                label="Contact Messages"
                onClick={() => {
                  router.push(`/admindashbord`);
                }}
              />
            ) : (
              console.log("..")
            )}
            {userDataAfterLogin.role === 3 ||
              userDataAfterLogin.role === 1 ? (
              <MenuLink
                label="My reservations"
                onClick={() => {
                  router.push(`/myreservation/${uid}`);
                }}
              />
            ) : (
              console.log("myreservation")
            )}
            
              <LogoutButton />
            </>
          ) : (
            <>
              <MenuLink
                label="Log in"
                onClick={() => {
                  setIsOpen(false);
                  loginModal.open();
                }}
              />

              <MenuLink
                label="Sign up"
                onClick={() => {
                  setIsOpen(false);
                  signupModal.open();
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserNav;
