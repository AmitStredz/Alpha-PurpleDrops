import React from "react";
import checkImg from "..//assets/check.png";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdError } from "react-icons/md";

export default function FailureModal({ message1, message2, onClose }) {
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 flex text-black font-aclonica justify-center items-center backdrop-blur-xl z-[100]"
      data-aos="fade-in"
    >
      <div
        className="fixed flex flex-col gap-5  items-center bg-white rounded-3xl shadow-lg p-10 w-[30rem] text-center max-w-4xl"
        data-aos="zoom-in"
      >
        <div className="flex w-full justify-end">
          <IoMdCloseCircleOutline
            size={30}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <MdError size={50} color="red" />

        <span className="text-red-500 text-[32px]">Error</span>
        <div className="flex flex-col gap-2">
          <span>{message1}</span>
          {message2 && <span className="text-[12px]">{message2}</span>}
        </div>
      </div>
    </div>
  );
}
