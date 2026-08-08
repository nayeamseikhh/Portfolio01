import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaDatabase,
} from "react-icons/fa";

const skills = [
  {
    name: "HTML",
    icon: FaHtml5,
    percent: 95,
    description:
      "Semantic and accessible HTML structures built for clean, scalable interfaces.",
  },
  {
    name: "CSS",
    icon: FaCss3Alt,
    percent: 90,
    description:
      "Responsive layouts, animations, and modern styling with clean CSS architecture.",
  },
  {
    name: "JavaScript",
    icon: FaJsSquare,
    percent: 90,
    description:
      "Modern JavaScript development focused on reusable logic and interactive experiences.",
  },
  {
    name: "React",
    icon: FaReact,
    percent: 90,
    description:
      "Component-driven interfaces built with reusable and maintainable React architecture.",
  },
  {
    name: "Node.js",
    icon: FaNodeJs,
    percent: 85,
    description:
      "Scalable backend services and REST APIs using Node.js and Express.",
  },
  {
    name: "MongoDB",
    icon: FaDatabase,
    percent: 85,
    description:
      "Flexible database solutions with MongoDB, Mongoose, and efficient data modeling.",
  },
];

const SkillCard = () => {
  return (
    <section className="relative overflow-hidden bg-[#121212] px-4 py-24 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-[400px]
          w-[400px]
          -translate-x-1/2
          rounded-full
          bg-orange/5
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
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
            My Skills
          </p>

          <h2
            className="
              mt-4
              font-poppins
              text-3xl
              font-bold
              leading-tight
              text-white
              sm:text-4xl
              md:text-5xl
            "
          >
            Technologies I <span className="text-white/30">Work With.</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              font-poppins
              text-sm
              leading-7
              text-white/45
              sm:text-base
              sm:leading-8
            "
          >
            A collection of technologies and tools I use to build modern,
            responsive, and scalable web applications.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-6
          "
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;

            return (
              <article
                key={skill.name}
                className="
                  group
                  relative
                  flex
                  min-h-[260px]
                  flex-col
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  p-6
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-orange/40
                  hover:bg-white/[0.04]
                  hover:shadow-[0_20px_60px_rgba(255,140,0,0.07)]
                "
              >
                {/* Number */}
                <span
                  className="
                    absolute
                    right-5
                    top-5
                    font-mono
                    text-xs
                    font-medium
                    text-white/20
                    transition-colors
                    duration-300
                    group-hover:text-orange/60
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-black/30
                    transition-all
                    duration-300
                    group-hover:border-orange/40
                    group-hover:bg-orange/10
                  "
                >
                  <Icon
                    className="
                      text-3xl
                      text-white/70
                      transition-all
                      duration-300
                      group-hover:scale-110
                      group-hover:text-orange
                    "
                  />
                </div>

                {/* Title + Percentage */}
                <div className="mt-6 flex items-center justify-between">
                  <h3
                    className="
                      font-poppins
                      text-xl
                      font-semibold
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-orange
                    "
                  >
                    {skill.name}
                  </h3>

                  <span className="font-poppins text-sm font-semibold text-white/50">
                    {skill.percent}%
                  </span>
                </div>

                {/* Progress */}
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                  <div
                    style={{ width: `${skill.percent}%` }}
                    className="
                      h-full
                      rounded-full
                      bg-orange
                      transition-all
                      duration-1000
                      ease-out
                    "
                  />
                </div>

                {/* Description */}
                <p
                  className="
                    mt-5
                    font-poppins
                    text-sm
                    leading-6
                    text-white/40
                  "
                >
                  {skill.description}
                </p>

                {/* Bottom Accent */}
                <div
                  className="
                    mt-auto
                    pt-6
                  "
                >
                  <div className="h-px w-full bg-white/[0.06]" />

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-poppins text-[10px] uppercase tracking-[2px] text-white/25">
                      Proficiency
                    </span>

                    <span className="h-1.5 w-1.5 rounded-full bg-orange/70" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillCard;
