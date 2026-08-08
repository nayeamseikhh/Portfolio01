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
  {
    id: 1,
    name: "JavaScript",
    icon: IoLogoJavascript,
  },
  {
    id: 2,
    name: "React.js",
    icon: FaReact,
  },
  {
    id: 3,
    name: "Node.js",
    icon: FaNodeJs,
  },
  {
    id: 4,
    name: "HTML5",
    icon: FaHtml5,
  },
  {
    id: 5,
    name: "CSS3",
    icon: IoLogoCss3,
  },
  {
    id: 6,
    name: "Tailwind CSS",
    icon: RiTailwindCssFill,
  },
  {
    id: 7,
    name: "Ant Design",
    icon: AiOutlineAntDesign,
  },
  {
    id: 8,
    name: "Redux",
    icon: SiRedux,
  },
];

const Experience = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section
      aria-labelledby="experience-title"
      className="
        relative
        overflow-hidden
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-96
          w-96
          -translate-y-1/2
          rounded-full
          bg-orange/5
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-0
          h-80
          w-80
          rounded-full
          bg-cyan-400/5
          blur-[120px]
        "
      />

      <Container>
        <div className="relative">
          {/* Decorative Code */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-3
              -top-6
              select-none
              font-mono
              text-6xl
              font-bold
              leading-none
              text-orange/[0.07]
              sm:text-7xl
              lg:-left-6
              lg:text-8xl
            "
          >
            {"<"}
          </span>

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-5
              right-0
              select-none
              font-mono
              text-6xl
              font-bold
              leading-none
              text-orange/[0.07]
              sm:text-7xl
              lg:right-4
              lg:text-8xl
            "
          >
            {"/>"}
          </span>

          {/* Section Heading */}
          <header
            className="relative z-10 mx-auto max-w-3xl text-center"
            data-aos="fade-up"
          >
            <p
              className="
                font-poppins
                text-xs
                font-semibold
                uppercase
                tracking-[4px]
                text-orange
                sm:text-sm
              "
            >
              My Tech Stack
            </p>

            <h2
              id="experience-title"
              className="
                mt-4
                font-poppins
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-white

                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              Experience With{" "}
              <span className="text-white/35">Modern Technologies.</span>
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                font-poppins
                text-sm
                leading-7
                text-white/50
                sm:text-base
                sm:leading-8
              "
            >
              Technologies and tools I use to build modern, responsive, and
              high-performance web applications.
            </p>
          </header>

          {/* Skills Grid */}
          <div
            className="
              relative
              z-10
              mx-auto
              mt-10
              grid
              max-w-5xl
              grid-cols-2
              gap-3

              sm:mt-12
              sm:grid-cols-4
              sm:gap-4

              lg:gap-5
            "
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {skills.map((skill) => {
              const Icon = skill.icon;

              return (
                <article
                  key={skill.id}
                  className="
                    group
                    relative
                    flex
                    min-h-[135px]
                    flex-col
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-800
                    bg-white/[0.02]
                    p-5

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-orange/60
                    hover:bg-white/[0.04]
                    hover:shadow-[0_15px_40px_rgba(255,140,0,0.08)]
                  "
                >
                  {/* Hover Glow */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-20
                      w-20
                      rounded-full
                      bg-orange/10
                      opacity-0
                      blur-2xl
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* Icon */}
                  <Icon
                    aria-hidden="true"
                    className="
                      relative
                      z-10
                      text-4xl
                      text-white/60
                      transition-all
                      duration-300

                      group-hover:scale-110
                      group-hover:text-orange

                      sm:text-5xl
                    "
                  />

                  {/* Name */}
                  <h3
                    className="
                      relative
                      z-10
                      mt-4
                      font-poppins
                      text-xs
                      font-medium
                      text-white/60
                      transition-colors
                      duration-300
                      group-hover:text-white
                      sm:text-sm
                    "
                  >
                    {skill.name}
                  </h3>

                  {/* Bottom Accent */}
                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-[2px]
                      w-0
                      -translate-x-1/2
                      bg-orange
                      transition-all
                      duration-300
                      group-hover:w-10
                    "
                  />
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Experience;
