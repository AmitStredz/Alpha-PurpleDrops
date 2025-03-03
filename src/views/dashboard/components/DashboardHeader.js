import React, { useState } from "react";
import { FaDiscord, FaUserAlt } from "react-icons/fa";
import { TbMoonFilled } from "react-icons/tb";
import { IoFolderOpenOutline } from "react-icons/io5";
import { CiServer } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { ImStatsBars2 } from "react-icons/im";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ sideBarIsOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <div className="border-slate-400 bg-white border-b-[1px] font-aclonica">
        <header className="flex justify-between items-center mx-6 md:mx-10 p-4 px-2 ">
          <div className="text-xl md:text-2xl inline text-alphaGreen font-semibold">
            <span
              className="cursor-pointer mr-4 text-black"
              onClick={sideBarIsOpen}
            >
              {"☰"}
            </span>
            <h1 className="inline text-green-500">PurpleDrops robotics</h1>
          </div>
          <div className="hidden md:inline-block text-black">
            <div className="flex justify-between gap-5 items-center font-semibold">
              
              <TbMoonFilled className="inline text-3xl cursor-pointer" />
              <FaUserAlt className="inline text-3xl cursor-pointer" />
              <FaDiscord className="inline text-3xl cursor-pointer" />
              <span className="mr-7 cursor-pointer border bg-green-500 rounded-lg p-2 px-4" onClick={() => handleLogout()}>
                Logout
              </span>
            </div>
          </div>
        </header>
      </div>

      {/* Sidebar */}
      {/* <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleNavbar}
      ></div> */}
    </div>
  );
};

export default DashboardHeader;
