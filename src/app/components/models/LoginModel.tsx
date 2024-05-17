"use client";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import Link from "next/link";
import { login } from "@/app/redux/slice/authslice";
import { useState } from "react";
import LoginModalStore from "@/app/redux/hooks/loginhook";
import CustomButton from "./CustomButton";
import apiService from "../../apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginModal = () => {
  const loginModal = LoginModalStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const formData = {
      email: email,
      password: password,
    };
    if (!email || !password) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   toast.error("Password must contain at least 1 special symbol, 1 capital letter, 1 number, and be at least 8 characters long.");
    //   return;
    // }
    try {
      const formData = { email, password };
      const response = await apiService.post("/api/login/", formData);
      if (response.success) {
        toast.success("Successfully logged in");
        const tokenValue = response.token.access;
        localStorage.setItem("token", tokenValue);
        dispatch(login([response.user, response.token]));
        loginModal.close();
      } else {
        toast.error("Login failed. Please check your email and password.");
      }
    } catch (error: any) {
      if (error.response?.data?.errors?.email) {
        const errorMessage = error.response.data.errors.email[0];
        if (errorMessage === "Email or Password is not correct match") {
          toast.error("Email or Password is not correct match");
        } else {
          toast.error(errorMessage);
        }
      } else {
        console.error("Other issue in your code:", error);
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  const handleForgotPasswordClick = () => {
    loginModal.close();
  };
  const content = (
    <form className="space-y-4">
      <input
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your e-mail address"
        type="email"
        className="w-full h-[54px] px-4 border focus:bg-white bg-gray-200 border-gray-300 rounded-xl"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
        className="w-full h-[54px] px-4 border border-gray-300 focus:bg-white bg-gray-200 rounded-xl"
      />
      <CustomButton label="Submit" onClick={handleSubmit} />

      <Link
        href="/sendpassmailreset"
        onClick={handleForgotPasswordClick}
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
      >
        Forgot Password?
      </Link>
    </form>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Log in"
      content={content}
    />
  );
};

export default LoginModal;
