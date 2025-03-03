import React, { useState } from "react";
import loginBg from "./assets/loginBg.png";
import { FaInstagram } from "react-icons/fa";
import { TbBrandThreads } from "react-icons/tb";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { useAuth } from "../auth/AuthProvider";
import { BASE_URL, SIGN_UP_URL } from "../../api/api";
import { RotatingLines } from "react-loader-spinner";
import ConfirmModal from "../../components/modals/confirmModal";
import FailureModal from "../../components/modals/failureModal";
// import
export default function SignupPage() {
  let [passWordType, setPasswordType] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isFailureModal, setIsFailureModal] = useState(false);
  // const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
  });

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    if (
      inputs.username !== "" &&
      inputs.password !== "" &&
      inputs.phone_number !== "" &&
      inputs.email !== ""
    ) {
      console.log("inpts", inputs);

      try {
        const response = await axios.post(
          `${BASE_URL}/api/users/signup/`,
          inputs
        );
        console.log("response: ", response);

        if (response.status.toString().startsWith("2")) {
          setInputs({
            username: "",
            email: "",
            phone_number: "",
            password: "",
          });

          const data = response.data;
          setSuccessMessage(data.message);

          if (data?.message === "Signup successful") {
            setIsSuccessModal(true);
          } else {
            setIsFailureModal(true);
          }
        }
      } catch (err) {
        let errors = [];

        let errorData = err.response.data;

        if (errorData.username) {
          console.debug("adding username errors");
          errors.push(...errorData.username);
        }

        if (errorData.email) {
          console.debug("adding email errors");
          errors.push(...errorData.email);
        }

        if (errorData.phone_number) {
          console.debug("adding phone_number errors");
          errors.push(...errorData.phone_number);
        }

        const joinedString = errors.join(" \n");

        setErrorMessage(joinedString);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setErrorMessage("Please fill in all the details");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalOnClose = () => {
    setIsSuccessModal(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen h-full w-screen sm:p-10 bg-cover bg-center bg-no-repeat text-white bg-black background-imag">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 max-sm:pt-20">
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
            Hey! Welcome <span className="wave-emoji">👋</span>
          </h1>
          <p className="text-gray-400 mb-8  text-center">
            Register your account to get started today..!
          </p>

          <form className="space-y-4 " onSubmit={handleSubmitEvent}>
            <div>
              <label className="block  mb-1 text-[12px]" htmlFor="username">
                Username*
              </label>
              <input
                name="username"
                type="text"
                value={inputs.username}
                onChange={handleInput}
                className="w-full px-4 p-3 rounded-3xl border bg-transparent  outline-none "
                placeholder="Username"
              />
            </div>

            <div>
              <label className="block  mb-1 text-[12px]" htmlFor="email">
                Email*
              </label>
              <input
                name="email"
                type="email"
                value={inputs.email}
                onChange={handleInput}
                className="w-full px-4 py-3 rounded-3xl border bg-transparent outline-none "
                placeholder="xyz@gmail.com"
              />
            </div>

            <div>
              <label className="block  mb-1 text-[12px]" htmlFor="phone">
                Phone Number*
              </label>
              <div className="flex rounded-3xl">
                <div className="flex items-center bg-gray-700 px-3 rounded-l-3xl">
                  <span className="">🇮🇳</span>
                </div>
                <input
                  name="phone_number"
                  type="text"
                  value={inputs.phone_number}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-r-3xl border bg-transparent outline-none  "
                  placeholder="+00 0000000000"
                />
              </div>
            </div>

            <div>
              <label className="block  mb-1 text-[12px]" htmlFor="password">
                Password*
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={passWordType ? "password" : "text"}
                  value={inputs.password}
                  onChange={handleInput}
                  className="w-full px-4 py-3 rounded-3xl border bg-transparent  outline-none "
                  placeholder="********"
                />
                <span
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer"
                  onClick={() => setPasswordType(!passWordType)}
                >
                  👁️
                </span>
              </div>
              {errorMessage && (
                <span className="text-red-500 text-[12px]">{errorMessage}</span>
              )}
            </div>

            <button
              type="submit"
              // onClick={handleSubmitEvent}
              className="flex justify-center w-full bg-green-500  py-2 rounded-3xl hover:bg-green-600 transition font-bold"
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
                <span> Sign Up</span>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/login" className="text-green-500 hover:underline">
              Log In
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center mt-8 space-x-4 ">
            <div>
              <i className="fab fa-instagram"></i>
            </div>
            <div>
              <i className="fab fa-facebook"></i>
            </div>
            <div>
              <i className="fab fa-twitter"></i>
            </div>
            <div>
              <i className="fab fa-google"></i>
            </div>
          </div>
        </div>
      </div>
      <img
        alt="logo"
        src="/logo.png"
        className="absolute top-5 sm:top-10 left-5 sm:left-10 w-14 sm:w-20"
      ></img>
      <div className="max-sm:hidden absolute flex justify-between bottom-10 left-10 sm:gap-[20rem]">
        <div>© 2025 PurpleDrops All Rights Reserved.</div>
        <div className="flex gap-4 text-black">
          <div className="bg-white rounded-full p-2">
            <FaInstagram />
          </div>
          <div className="bg-white rounded-full p-2">
            <FaXTwitter />
          </div>
          <div className="bg-white rounded-full p-2">
            <FiFacebook />
          </div>
          <div className="bg-white rounded-full p-2">
            <TbBrandThreads />
          </div>
        </div>
      </div>

      {isSuccessModal && (
        <ConfirmModal
          title="Signup Successfull"
          message1="Please login in to proceed."
          isClose={true}
          onClose={() => handleModalOnClose()}
        />
      )}
      {isFailureModal && (
        <FailureModal
        
          message1="Some error occurred."
          message2="Please try again."
          onClose={() => handleModalOnClose()}
        />
      )}
    </div>
  );
}
