"use client";
import Modal from "./Modal";
import apiService from "@/app/apiService";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/redux/hooks/signuphook";
import useLoginModal from "@/app/redux/hooks/loginhook";
import CustomButton from "./CustomButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios";
interface SignupModalProps {
  label: string;
}

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobileno: string;
  role: number;
}

const SignupModal = () => {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    mobileno: "",
    role: 3,
  });
  const router = useRouter();
  const signupModal = useSignupModal();
  const loginmodel = useLoginModal();
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "role" ? parseInt(value) : value,
    });
  };

  const handleSignUp = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    const { email, password, mobileno } = formData;
    if (!email || !password || !mobileno) {
      toast.error("Please fill out all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 1 special symbol, 1 capital letter, 1 number, and be at least 8 characters long."
      );
      return;
    }
    const mobileRegex = /^[0-9]{9,10}$/;
    if (!mobileRegex.test(mobileno)) {
      toast.error("Please enter a valid mobile number (9 or 10 digits).");
      return;
    }

    try {
      const response = await apiService.post("/api/register/", formData);
      if (response.success) {
        toast.success("Successfully signed up");
        signupModal.close();
        loginmodel.open();
      }
    } catch (error: any) {
      if (
        error?.response?.data?.errors?.email[0] ==
        "user with this email already exists."
      ) {
        toast.error("User already exist with this email");
      } else {
        console.error("other issue in your code");
      }
    }
  };

  const content = (
    <>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            id="firstName"
            required
            onChange={handleChange}
            placeholder="First Name"
            type="text"
            name="first_name"
            value={formData.first_name}
            autoComplete="family-name"
            className="w-full required focus:bg-white bg-gray-100 h-[54px] px-4 border border-gray-300 rounded-xl"
          />
          <input
            required
            onChange={handleChange}
            placeholder="Last Name"
            type="text"
            name="last_name"
            value={formData.last_name}
            className="w-full required focus:bg-white bg-gray-100 h-[54px] px-4 border border-gray-300 rounded-xl"
          />
        </div>
        <input
          onChange={handleChange}
          required
          placeholder="Your e-mail address"
          type="email"
          name="email"
          value={formData.email}
          className="w-full  required focus:bg-white bg-gray-100 h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          onChange={handleChange}
          required
          name="password"
          value={formData.password}
          placeholder="Your password"
          type="password"
          className="w-full required focus:bg-white bg-gray-100 h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <input
          onChange={handleChange}
          required
          placeholder="mobile number"
          name="mobileno"
          value={formData.mobileno}
          autoComplete="number"
          type="number"
          className="w-full focus:bg-white bg-gray-100 h-[54px] px-4 border border-gray-300 rounded-xl"
        />

        <div className="flex justify-center">
          <div className="flex items-center mr-4">
            <input
              defaultChecked
              id="default-radio-1"
              type="radio"
              name="role"
              value={3}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Buyer
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              name="role"
              value={2}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Saler
            </label>
          </div>
        </div>

        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="p-5 bg-airbnb text-white rounded-xl opacity-80"
            >
              {error}
            </div>
          );
        })}

        <CustomButton label="Submit" onClick={handleSignUp} />
      </form>
    </>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign up"
      content={content}
    />
  );
};

export default SignupModal;
