import React, { useRef } from "react";
import Container from "../../GlobalComponents/Container";
import nayeamImg from "../../../src/assets/myImages/na.jpg";
import { GoLocation, GoMail } from "react-icons/go";
import { MdLocationPin, MdOutlineAlternateEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const GetInTouch = () => {
  return (
    <>
      <Container>
        <div className="dark:text-white my-20 mb-200">
          <div className="grid grid-cols-2 justify-between">
            <div>
              <img src={nayeamImg} alt="" />
            </div>
            <div className="flex flex-col items-center ">
              <div className="h-30 w-[80%]">
                <div className="flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl transition-all items-center text-center p-6">
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

                <div className=" flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl transition-all items-center text-center p-6 my-20">
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

                <div className=" flex gap-x-10 border border-gray-800  hover:border-orange bg-transparent rounded-2xl transition-all items-center text-center p-6 my-20">
                  <div>
                    <MdOutlineAlternateEmail
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
              </div>
            </div>
          </div>

          <div>
            <div className="my-20">
              <h6 className="text-4xl">
                🚀 Hi, I'm Nayeam Seikh – Full MERN Stack Developer. <br />
              </h6>
              <p className="text-base">
                Looking for a high-performance, modern, and scalable web
                solution? You’re in the right place! I am a Full MERN Stack
                Developer with front-end and back-end development expertise. ✅
                What I Offer: ✔ Custom Web Development Using MERN Stack
                (MongoDB, Express.js, React.js, Node.js) ✔ Full-Stack Web
                Applications – From frontend to backend, I build it all ✔ API
                Development & Integration ✔ Real-time Web Applications ✔
                Database Design & Management (MongoDB) ✔ User Authentication &
                Authorization ✔ Secure & Scalable Backend Solutions and More..
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default GetInTouch;
