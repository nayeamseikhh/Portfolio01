import React from "react";
import { BsPinterest } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { RiFacebookCircleLine, RiTelegram2Fill } from "react-icons/ri";
import { SiGithub } from "react-icons/si";
import { TiSocialLinkedinCircular } from "react-icons/ti";

const SocialIcon = () => {
  return (
    <>
      <div className="flex items-start">
        <div className="h-30 w-[80%]   ">
          <TiSocialLinkedinCircular
            size={40}
            className="h-18 w-18 p-2 rounded-full bg-black02 border-2 border-transparent hover:border-orange transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          />
        </div>

        <div className="h-30 w-[80%]   ">
          <FaXTwitter
            size={40}
            className="h-18 w-18 p-4 rounded-full bg-black02 border-2 border-transparent hover:border-orange transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          />
        </div>

        <div className="h-30 w-[80%]   ">
          <RiFacebookCircleLine
            size={40}
            className="h-18 w-18 p-2 rounded-full bg-black02 border-2 border-transparent hover:border-orange transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          />
        </div>

        <div className="h-30 w-[80%]   ">
          <IoLogoInstagram
            size={40}
            className="h-18 w-18 p-2 rounded-full bg-black02 border-2 border-transparent hover:border-orange transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          />
        </div>

        <div className="h-30 w-[80%]   ">
          <BsPinterest
            size={40}
            className="h-18 w-18 p-4 rounded-full bg-black02 border-2 border-transparent hover:border-orange transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          />
        </div>
        <div className="h-30 w-[80%]   ">
          <SiGithub
            size={40}
            className="h-18 w-18 p-4 rounded-full bg-black02 border-2 border-transparent hover:border-orange transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105"
          />
        </div>
      </div>
    </>
  );
};

export default SocialIcon;
