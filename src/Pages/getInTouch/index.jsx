import React, { useRef } from "react";
import Container from "../../GlobalComponents/Container";
import nayeamImg from "../../../src/assets/myImages/nayeam.png";
import { GoLocation, GoMail } from "react-icons/go";
import {
  MdLocationPin,
  MdOutlineAlternateEmail,
  MdOutlineMail,
} from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { RiTelegram2Fill } from "react-icons/ri";
import SocialIcon from "./socialIcon";
import GetInTouchText from "./getInTouchText";
import RelationalPart from "./relationalPart";

const GetInTouch = () => {
  return (
    <>
      <Container>
        <div className="dark:text-white my-20  ">
          {/* left part */}
          <div className="grid grid-cols-2 justify-between  text-white02">
            <div className="border hover:border-orange bg-transparent rounded-2xl  items-center text-center p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105">
              <img src={nayeamImg} alt="nayeam Images" />
            </div>

            {/* right Part  */}
            <div className="flex flex-col items-center ">
              <div className="h-30 w-[80%]">
                {/* address  */}
                <div className="flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl  items-center text-center p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105">
                  <div>
                    <MdLocationPin
                      size={40}
                      className="h-full p-4 w-full bg-black02 rounded-full"
                    />
                  </div>
                  <div>
                    <h6 className="text-4xl font-bold text-orange font-poppins text-start">
                      Address
                    </h6>
                    <p className="text-lg font-semibold font-poppins">
                      Rajshahi, Bangladesh
                    </p>
                  </div>
                </div>
                {/* Phone  */}
                <div className=" flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl items-center text-center p-6 my-20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105">
                  <div>
                    <FaPhoneAlt
                      size={40}
                      className="h-full p-4 w-full bg-black02 rounded-full"
                    />
                  </div>
                  <div>
                    <h6 className="text-4xl font-bold text-orange font-poppins text-start">
                      Phone
                    </h6>
                    <p className="text-lg font-semibold font-poppins">
                      +8801750497007
                    </p>
                  </div>
                </div>
                {/* Email  */}
                <div className=" flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl  items-center text-center p-6 my-20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105">
                  <div>
                    <MdOutlineMail
                      size={40}
                      className="h-full p-4 w-full bg-black02 rounded-full"
                    />
                  </div>
                  <div>
                    <h6 className="text-4xl font-bold text-orange font-poppins text-start">
                      Email
                    </h6>
                    <p className="text-lg font-semibold font-poppins">
                      nayeamseikh1@gmail.com
                    </p>
                  </div>
                </div>
                {/* Whats App  */}
                <div className=" flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl  items-center text-center p-6 my-20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105">
                  <div>
                    <FaWhatsapp
                      size={40}
                      className="h-full p-4 w-full bg-black02 rounded-full"
                    />
                  </div>
                  <div>
                    <h6 className="text-4xl font-bold text-orange font-poppins text-start">
                      Whats App
                    </h6>
                    <p className="text-lg font-semibold font-poppins text-start">
                      +8801750497007
                    </p>
                  </div>
                </div>
                {/* Telegram  */}
                <div className=" flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl  items-center text-center p-6 my-20 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-105">
                  <div>
                    <RiTelegram2Fill
                      size={40}
                      className="h-full p-4 w-full bg-black02 rounded-full"
                    />
                  </div>
                  <div>
                    <h6 className="text-4xl font-bold text-orange font-poppins text-start">
                      Telegram
                    </h6>
                    <p className="text-lg font-semibold font-poppins text-start">
                      +8801750497007
                    </p>
                  </div>
                </div>
                <SocialIcon />
              </div>
            </div>
          </div>

          <GetInTouchText />
        </div>
        <RelationalPart />
      </Container>
    </>
  );
};

export default GetInTouch;
