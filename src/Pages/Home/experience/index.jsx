import React, { useEffect } from "react";
import Container from "../../../GlobalComponents/Container";
import { FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { IoLogoCss3, IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { AiOutlineAntDesign } from "react-icons/ai";
import { SiRedux } from "react-icons/si";
import "aos/dist/aos.css";
import Aos from "aos";

const Experience = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);
  // <Link className="relative group">
  //   <h4 className="relative">
  //     Home
  //     <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
  //   </h4>
  // </Link>;
  return (
    <Container>
      <div className="mt-20 text-white02 font-poppins font-semibold flex justify-center text-xl relative ">
        <h6 className="text-white02 font-poppins font-semibold relative">
          EXPERIENCE WITH
          <span className="absolute left-0 -bottom-2 h-0.5 bg-white02 transition-all duration-300 w-full"></span>
        </h6>
      </div>
      <div className="mt-12 flex justify-center gap-x-12 ">
        <IoLogoJavascript className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer " />
        <FaReact className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer" />
        <FaNodeJs className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer" />
        <FaHtml5 className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer" />
        <IoLogoCss3 className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer" />
        <RiTailwindCssFill className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer" />
        <AiOutlineAntDesign className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer" />
        <SiRedux className="text-white02 text-5xl transition-all duration-500 hover:text-orange cursor-pointer" />
      </div>
      {/* <div>
        <div
          className="bg-amber-700 rounded-lg shadow-lg p-6 mb-10"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="200"
        >
          <h2 className="text-2xl font-bold mb-4">Awesome Feature</h2>
          <p className="text-gray-600">
            This feature does something really cool when you scroll down.
          </p>
        </div>
      </div> */}
    </Container>
  );
};

export default Experience;
