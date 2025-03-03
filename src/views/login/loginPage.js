import React, { useState } from "react";
import loginBg from "./assets/loginBg.png";
import { FaInstagram } from "react-icons/fa";
import { TbBrandThreads } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { BASE_URL } from "../../api/api";

import "./login.css";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import ConfirmModal from "../../components/modals/confirmModal";
// import
export default function SignupPage() {
  const [passwordType, setpasswordType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    email_or_phone: "",
    password: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    console.log("inpts", inputs);

    if (!inputs.email_or_phone || !inputs.password) {
      setErrorMessage("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email_or_phone)) {
      setErrorMessage("Please enter a valid email");
      setIsLoading(false);

      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login/`, inputs);
      console.log("loginResponse: ", response?.data);
      const data = response?.data;

      if (response?.data?.token) {
        localStorage.setItem("userData", JSON.stringify(data));
        if (data.plan == null || data.plan === "") {
          setIsSuccessModal(true);
          setTimeout(() => {
            setIsSuccessModal(false);
            auth.setToken(data?.token);

            navigate("/");
          }, 2000);
        } else {
          setIsSuccessModal(true);
          setTimeout(() => {
            setIsSuccessModal(false);
            auth.setToken(data?.token);

            navigate("/dashboard");
          }, 2000);
        }
      }
    } catch (err) {
      console.log("error occurred:", err?.response?.data?.error);
      if (err?.response?.data?.error) {
        setErrorMessage(err?.response?.data?.error);
      }
      // setErrorMessage(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center sm:justify-between  sm:h-screen min-h-screen  w-screen sm:p-10 bg-cover bg-center bg-no-repeat text-white bg-black background-imag">
      {/* Left Section */}
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16 max-sm:pt-20">
          <div className="text-2xl sm:text-4xl md:text-5xl">
            Get started <br /> with{" "}
            <span className="text-green-500 font-semibold font-poppins">
            PurpleDrops Robotics LLP
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center p-4 sm:p-6 md:p-0">
          <div className="p-3 sm:p-8 md:p-10 rounded-3xl shadow-lg border w-[30rem]">
            <h1 className="text-2xl md:text-3xl  font-semibold text-center">
              Welcome Back <span className="wave-emoji">👋</span>
            </h1>
            <p className="text-gray-400 mb-8  text-center">
              Login your account to get started..!
            </p>

            <form className="space-y-4 " onSubmit={handleSubmitEvent}>
              {/* <div>
              <label className="block  mb-1 text-[12px]" htmlFor="username">
                Username*
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 p-3 rounded-3xl border bg-transparent  outline-none "
                placeholder="Hariharan .S"
              />
            </div> */}

              <div>
                <label className="block  mb-1 text-[12px]" htmlFor="email">
                  Email*
                </label>
                <input
                  name="email_or_phone"
                  type="email"
                  value={inputs.email_or_phone}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-3xl border bg-transparent outline-none "
                  placeholder="xyz@gmail.com"
                />
              </div>

              {/* <div>
              <label className="block  mb-1 text-[12px]" htmlFor="phone">
                Phone Number*
              </label>
              <div className="flex rounded-3xl">
                <div className="flex items-center bg-gray-700 px-3 rounded-l-3xl">
                  <span className="">🇮🇳</span>
                </div>
                <input
                  id="phone"
                  type="text"
                  className="w-full px-4 py-3 rounded-r-3xl border bg-transparent outline-none  "
                  placeholder="+91 97913 36435"
                />
              </div>
            </div> */}

              <div>
                <label className="block  mb-1 text-[12px]" htmlFor="password">
                  Password*
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={passwordType ? "password" : "text"}
                    value={inputs.password}
                    onChange={handleInput}
                    className="w-full px-4 py-3 rounded-3xl border bg-transparent  outline-none "
                    placeholder="********"
                  />
                  <span
                    className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer"
                    onClick={() => setpasswordType(!passwordType)}
                  >
                    👁️
                  </span>
                </div>
              </div>
              {errorMessage && (
                <span className="text-[12px] text-red-500">{errorMessage}</span>
              )}

              <button
                type="submit"
                className={`flex justify-center w-full  py-2 rounded-3xl hover:bg-green-600 transition font-bold ${
                  isLoading ? "px-16 bg-green-300" : "bg-green-500"
                }`}
              >
                {isLoading ? (
                  <RotatingLines
                    visible={true}
                    height="40"
                    width="40"
                    color="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span> Log In</span>
                )}
              </button>
            </form>

            <div className="text-center mt-6">
              <span className="text-gray-400">Don’t have an account? </span>
              <Link to="/signup" className="text-green-500 hover:underline">
                Sign Up
              </Link>
            </div>

            {/* Social Icons */}
            {/* <div className="flex justify-center mt-8 space-x-4 text-white bg-white w-full h-full ">
            <button className="bg-white w-96 h-96">
              <i className="fab fa-instagram"></i>
            </button>
            <button >
              <i className="fab fa-facebook"></i>
            </button>
            <button >
              <i className="fab fa-twitter"></i>
            </button>
            <button >
              <i className="fab fa-google"></i>
            </button>
          </div> */}
          </div>
        </div>
      </div>
      <img
        alt="logo"
        src="/logo.png"
        className="absolute top-5 sm:top-10 left-5 sm:left-10 w-14 sm:w-20"
      ></img>
      <div className=" flex flex-col sm:flex-row items-center gap-3  justify-between p-3 sm:px-32 sm:gap-[20rem]">
        <div className="text-[12px] max-sm:order-last sm:text-[16px]">© 2025 PurpleDrops All Rights Reserved.</div>
        <div className="flex gap-4  text-black">
          <button className="bg-white rounded-full p-2">
            <FaInstagram />
          </button>
          <button className="bg-white rounded-full p-2">
            <FaXTwitter />
          </button>
          <button className="bg-white rounded-full p-2">
            <FiFacebook />
          </button>
          <button className="bg-white rounded-full p-2">
            <TbBrandThreads />
          </button>
        </div>
      </div>
      {isSuccessModal && (
        <ConfirmModal title="Login Successfull" isClose={false} />
      )}
    </div>
  );
}
