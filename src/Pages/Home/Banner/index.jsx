import React, { useEffect } from "react";
import Aos from "aos";
import { Link } from "react-router";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import MorphingView from "./animation";
import Container from "../../../GlobalComponents/Container";
import bannerImg from "../../../assets/banner/nayeam.png";
import cv from "../../../assets/cv/nayeam_resume.pdf";

const Banner = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="
        relative
        overflow-hidden
        bg-[#111111]
        text-white
      "
    >
      {/* Background decorations */}
      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-72
          w-72
          rounded-full
          bg-orange/10
          blur-[100px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-cyan-400/5
          blur-[120px]
        "
      />

      <Container>
        <div
          className="
            relative
            grid
            min-h-[calc(100vh-76px)]
            items-center
            gap-12
            py-20

            md:py-24

            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-16
            lg:py-28

            xl:min-h-[calc(100vh-80px)]
            xl:grid-cols-[1.15fr_0.85fr]
          "
        >
          {/* ================= LEFT CONTENT ================= */}
          <div data-aos="fade-right" className="relative z-10">
            {/* Availability */}
            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-gray-800
                bg-white/[0.025]
                px-4
                py-2
                font-poppins
                text-xs
                font-medium
                text-white/70
                sm:text-sm
              "
            >
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-green-500
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2.5
                    w-2.5
                    rounded-full
                    bg-green-500
                  "
                />
              </span>
              Available for work
            </div>

            {/* Small intro */}
            <p
              className="
                mb-4
                font-poppins
                text-sm
                font-medium
                uppercase
                tracking-[3px]
                text-orange
                sm:text-base
              "
            >
              Full MERN Stack Developer
            </p>

            {/* Main Heading */}
            <h1
              id="hero-title"
              className="
                max-w-4xl
                font-poppins
                text-5xl
                font-bold
                leading-[0.95]
                tracking-[-2px]

                sm:text-6xl
                sm:tracking-[-3px]

                md:text-7xl

                lg:text-[76px]

                xl:text-[88px]
              "
            >
              I'm
              <span className="text-orange"> Nayeam</span>
              <br />
              <span className="text-white/35">Seikh.</span>
            </h1>
            <MorphingView />

            {/* Description */}
            <div
              className="
                mt-8
                max-w-2xl
                font-poppins
                text-sm
                leading-7
                text-white/55

                sm:text-base
                sm:leading-8

                md:text-lg
              "
            >
              <p>
                I build modern, responsive, and scalable web applications with a
                strong focus on performance, clean architecture, and great user
                experience.
              </p>

              <p className="mt-3">
                Specialized in <span className="text-white/90">React.js</span>,{" "}
                <span className="text-white/90">Node.js</span>,{" "}
                <span className="text-white/90">Express.js</span>,{" "}
                <span className="text-white/90">MongoDB</span>,{" "}
                <span className="text-white/90">Tailwind CSS</span>, and{" "}
                <span className="text-orange">AI integration.</span>
              </p>
            </div>

            {/* Buttons */}
            <div
              className="
                mt-9
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:items-center
              "
            >
              <Link
                to="/get_in_touch"
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-orange
                  px-6
                  py-3.5
                  font-poppins
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-orange/90
                  hover:shadow-[0_15px_40px_rgba(255,140,0,0.2)]

                  sm:w-auto
                "
              >
                Get In Touch
                <FaArrowRight
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>

              <a
                href={cv}
                download
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-gray-700
                  bg-white/[0.02]
                  px-6
                  py-3.5
                  font-poppins
                  text-sm
                  font-semibold
                  text-white/80
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-orange
                  hover:text-orange

                  sm:w-auto
                "
              >
                Download CV
                <FaDownload
                  className="
                    text-sm
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                  "
                />
              </a>
            </div>

            {/* Experience / Tech info */}
            <div
              className="
                mt-12
                flex
                flex-wrap
                items-center
                gap-x-8
                gap-y-4
                border-t
                border-gray-800
                pt-6
              "
            >
              <div>
                <p className="font-poppins text-2xl font-bold text-white">
                  2024<span className="text-orange">+</span>
                </p>

                <p className="mt-1 font-poppins text-xs text-white/40">
                  Development Experience
                </p>
              </div>

              <div className="h-10 w-px bg-gray-800" />

              <div>
                <p className="font-poppins text-2xl font-bold text-white">
                  MERN
                </p>

                <p className="mt-1 font-poppins text-xs text-white/40">
                  Full Stack Development
                </p>
              </div>

              <div className="h-10 w-px bg-gray-800" />

              <div>
                <p className="font-poppins text-2xl font-bold text-white">AI</p>

                <p className="mt-1 font-poppins text-xs text-white/40">
                  Web Integration
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div
            data-aos="fade-left"
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[500px]
              items-center
              justify-center

              lg:mx-0
              lg:ml-auto
            "
          >
            {/* Outer frame */}
            <div
              className="
                relative
                w-full
                max-w-[430px]
                overflow-hidden
                rounded-[2rem]
                border
                border-gray-800
                bg-white/[0.025]
                p-3

                sm:p-4

                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-orange/50
              "
            >
              {/* Image */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[1.5rem]
                  bg-[#181818]
                "
              >
                <img
                  src={bannerImg}
                  alt="Nayeam Seikh - Full MERN Stack Developer"
                  className="
                    h-[420px]
                    w-full
                    object-cover
                    object-top

                    sm:h-[500px]

                    md:h-[550px]

                    lg:h-[560px]

                    transition-transform
                    duration-700
                    hover:scale-[1.03]
                  "
                />

                {/* Image overlay */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/60
                    via-transparent
                    to-transparent
                  "
                />
              </div>

              {/* Floating availability */}
              <div
                className="
                  absolute
                  left-6
                  top-6
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-gray-700
                  bg-[#151515]/90
                  px-4
                  py-2
                  backdrop-blur-md
                "
              >
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="font-poppins text-xs font-medium text-white/80">
                  Open to work
                </span>
              </div>

              {/* Floating arrow */}
              <div
                className="
                  absolute
                  bottom-6
                  right-6
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-orange
                  text-white
                  shadow-xl
                "
              >
                <FiArrowUpRight className="text-2xl" />
              </div>
            </div>

            {/* Decorative circle */}
            <div
              className="
                pointer-events-none
                absolute
                -bottom-10
                -right-8
                -z-10
                h-32
                w-32
                rounded-full
                border
                border-orange/20
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-3
                top-10
                -z-10
                h-20
                w-20
                rounded-full
                bg-orange/10
                blur-2xl
              "
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
