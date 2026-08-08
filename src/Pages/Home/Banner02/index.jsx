import React from "react";
import Container from "../../../GlobalComponents/Container";
import { FaArrowRight, FaCode } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router";

const Banner02 = () => {
  const technologies = [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "AI Integration",
  ];

  return (
    <section
      aria-labelledby="banner02-heading"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-72
          w-72
          -translate-y-1/2
          rounded-full
          bg-orange/5
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-80
          w-80
          rounded-full
          bg-cyan-400/5
          blur-3xl
        "
      />

      <Container>
        {/* Main card */}
        <div
          className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-gray-800
            bg-white/[0.02]
            px-5
            py-8
            transition-all
            duration-500
            hover:border-orange/40
            sm:px-8
            sm:py-10
            md:px-10
            md:py-12
            lg:px-14
            lg:py-14
          "
        >
          {/* Top orange line */}
          <div
            className="
              absolute
              left-0
              top-0
              h-[2px]
              w-0
              bg-orange
              transition-all
              duration-700
              group-hover:w-full
            "
          />

          {/* Code decoration */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-6
              top-5
              select-none
              font-mono
              text-5xl
              font-bold
              text-orange/[0.06]
              sm:right-10
              sm:text-7xl
              lg:right-14
              lg:text-8xl
            "
          >
            {"</>"}
          </div>

          <div
            className="
              relative
              z-10
              grid
              gap-10
              lg:grid-cols-[1.2fr_0.8fr]
              lg:items-center
              lg:gap-16
            "
          >
            {/* Left Content */}
            <div>
              {/* Small label */}
              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  font-poppins
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[3px]
                  text-orange
                  sm:text-sm
                "
              >
                <FaCode className="text-sm" />
                Full Stack Development
              </div>

              {/* Heading */}
              <h2
                id="banner02-heading"
                className="
                  max-w-3xl
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
                Turning ideas into
                <span className="text-orange"> powerful web experiences.</span>
              </h2>

              {/* Description */}
              <p
                className="
                  mt-5
                  max-w-2xl
                  font-poppins
                  text-sm
                  leading-7
                  text-white/55
                  sm:mt-6
                  sm:text-base
                  sm:leading-8
                  md:text-lg
                "
              >
                I build modern, responsive, and scalable web applications
                focused on clean architecture, performance, usability, and
                real-world business needs.
              </p>

              {/* CTA */}
              <div className="mt-7 sm:mt-8">
                <Link
                  to="/get_in_touch"
                  className="
                    group/btn
                    inline-flex
                    items-center
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
                    hover:shadow-[0_12px_35px_rgba(255,140,0,0.22)]
                  "
                >
                  Let's Work Together
                  <FaArrowRight
                    className="
                      transition-transform
                      duration-300
                      group-hover/btn:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>

            {/* Right Side */}
            <div
              className="
                relative
                rounded-2xl
                border
                border-gray-800
                bg-black/20
                p-5
                sm:p-6
                lg:p-7
              "
            >
              {/* Small heading */}
              <p
                className="
                  font-poppins
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-white/35
                "
              >
                What I work with
              </p>

              {/* Technology list */}
              <ul
                className="
                  mt-5
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                {technologies.map((technology) => (
                  <li
                    key={technology}
                    className="
                      group/tech
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-gray-800
                      bg-white/[0.02]
                      px-4
                      py-3
                      font-poppins
                      text-sm
                      font-medium
                      text-white/70
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-orange/50
                      hover:bg-orange/[0.04]
                      hover:text-white
                    "
                  >
                    <FiCheckCircle
                      className="
                        shrink-0
                        text-orange
                        transition-transform
                        duration-300
                        group-hover/tech:scale-110
                      "
                    />

                    <span>{technology}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom status */}
              <div
                className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  border-t
                  border-gray-800
                  pt-5
                "
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                <span
                  className="
                    font-poppins
                    text-xs
                    font-medium
                    text-white/45
                  "
                >
                  Available for freelance projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner02;
