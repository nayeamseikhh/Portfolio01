import { useEffect } from "react";
import Container from "../../../GlobalComponents/Container";
import "aos/dist/aos.css";
import Aos from "aos";

import { FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { IoLogoCss3, IoLogoJavascript } from "react-icons/io";
import { RiTailwindCssFill } from "react-icons/ri";
import { AiOutlineAntDesign } from "react-icons/ai";
import { SiRedux } from "react-icons/si";

const skills = [
  { id: 1, icon: IoLogoJavascript, color: "hover:text-yellow-400" },
  { id: 2, icon: FaReact, color: "hover:text-sky-400" },
  { id: 3, icon: FaNodeJs, color: "hover:text-green-500" },
  { id: 4, icon: FaHtml5, color: "hover:text-orange-500" },
  { id: 5, icon: IoLogoCss3, color: "hover:text-blue-500" },
  { id: 6, icon: RiTailwindCssFill, color: "hover:text-cyan-400" },
  { id: 7, icon: AiOutlineAntDesign, color: "hover:text-blue-400" },
  { id: 8, icon: SiRedux, color: "hover:text-purple-500" },
];

const Experience = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section className="py-16 md:py-20">
      <Container>
        {/* Heading */}
        <div className="flex justify-center">
          <h2 className="relative text-lg sm:text-xl md:text-2xl font-semibold font-poppins text-white02 uppercase tracking-wider">
            Experience With
            <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-white02"></span>
          </h2>
        </div>

        {/* Skills */}
        <div
          className="mt-10 md:mt-14 flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4"
          data-aos="fade-up"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <div key={skill.id} className="flex items-center justify-center">
                <Icon
                  className={`text-white02 text-4xl sm:text-5xl md:text-6xl transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:scale-110 ${skill.color}`}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Experience;
