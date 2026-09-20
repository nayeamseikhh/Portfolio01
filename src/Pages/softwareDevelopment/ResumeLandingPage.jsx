import React from "react";

import {
  Mail,
  Phone,
  Download,
  GraduationCap,
  Briefcase,
  ArrowUpRight,
} from "lucide-react";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import nayeamImage from "../../assets/banner/nayeam.png";

const ResumeLandingPage = () => {
  // =========================
  // SKILLS
  // =========================
  const skillGroups = [
    {
      title: "Frontend",
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Tailwind CSS",
        "Ant Design",
        "ShadCN",
        "Redux",
      ],
    },
    {
      title: "Backend",
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "REST API",
        "Firebase",
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        "Git",
        "GitHub",
        "JWT",
        "Cookies",
        "Sessions",
        "Cloudinary",
        "Vercel",
        "Render",
      ],
    },
  ];

  // =========================
  // EXPERIENCE
  // =========================
  const experience = [
    {
      year: "2024 — Present",
      title: "Full MERN Stack Developer",
      company: "Freelance / Personal Projects",
      description:
        "Building modern, responsive and scalable web applications using React, Node.js, Express.js and MongoDB.",
    },
    {
      year: "2024",
      title: "Frontend Developer",
      company: "Web Development Projects",
      description:
        "Created responsive interfaces with React, Tailwind CSS, Ant Design and modern frontend technologies.",
    },
  ];

  // =========================
  // EDUCATION
  // =========================
  const education = [
    {
      year: "2022 — Present",
      title: "Computer Science / Web Development",
      description:
        "Focused on programming, web development, software engineering and modern JavaScript technologies.",
    },
  ];

  // =========================
  // DOWNLOAD CV
  // =========================
  const handleDownloadCV = () => {
    const link = document.createElement("a");

    link.href = "/assets/cv/nayeam_resume.pdf";
    link.download = "Nayeam_Seikh_Resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0D] px-4 py-25 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* =========================================
            HERO SECTION
        ========================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141416] p-6 shadow-2xl sm:p-8 md:p-10">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F59E0B]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#F59E0B]/5 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
            {/* =========================================
                PROFILE IMAGE
            ========================================== */}
            <div className="mx-auto shrink-0 md:mx-0">
              <div
                className="
                  relative
                  h-32
                  w-32
                  rounded-full
                  bg-gradient-to-br
                  from-[#F59E0B]
                  to-[#7C3E00]
                  p-[3px]
                  sm:h-36
                  sm:w-36
                  md:h-40
                  md:w-40
                "
              >
                {/* Image container */}
                <div
                  className="
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-[#1A1A1D]
                  "
                >
                  <img
                    src={nayeamImage}
                    alt="MD. Nayeam Seikh"
                    className="
                      block
                      h-full
                      w-full
                      object-cover
                      object-center
                    "
                  />
                </div>

                {/* Available Badge */}
                <span
                  className="
                    absolute
                    -bottom-1
                    right-1
                    flex
                    items-center
                    gap-1.5
                    whitespace-nowrap
                    rounded-full
                    border
                    border-white/10
                    bg-[#1A1A1D]
                    px-2.5
                    py-1
                    text-[11px]
                    text-[#8FE3A1]
                    shadow-lg
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Open to work
                </span>
              </div>
            </div>

            {/* =========================================
                HERO CONTENT
            ========================================== */}
            <div className="flex-1 text-center md:text-left">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-[#F59E0B]">
                Hello, I'm
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                MD. Nayeam Seikh
              </h1>

              <h2 className="mt-2 text-lg font-medium text-gray-300 sm:text-xl">
                Full MERN Stack Developer
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 md:mx-0">
                I build modern, responsive and scalable web applications using
                React, Node.js, Express.js, MongoDB and modern UI technologies.
              </p>

              {/* Contact */}
              <div className="mt-6 flex flex-col items-center gap-3 text-sm text-gray-400 sm:flex-row sm:flex-wrap md:items-start">
                <a
                  href="mailto:nayeamseikh1@gmail.com"
                  className="flex items-center gap-2 transition hover:text-[#F59E0B]"
                >
                  <Mail size={16} />
                  nayeamseikh1@gmail.com
                </a>

                <span className="hidden text-gray-700 sm:block">•</span>

                <a
                  href="tel:+8801750497007"
                  className="flex items-center gap-2 transition hover:text-[#F59E0B]"
                >
                  <Phone size={16} />
                  +880 1750-497007
                </a>
              </div>

              {/* Buttons */}
              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <button
                  onClick={handleDownloadCV}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-[#F59E0B]
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-black
                    transition
                    hover:bg-[#FFB52E]
                    hover:shadow-lg
                    hover:shadow-[#F59E0B]/20
                  "
                >
                  <Download size={17} />
                  Download CV
                </button>

                <a
                  href="https://github.com/nayeamseikhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:border-[#F59E0B]/50
                    hover:bg-white/10
                  "
                >
                  <FaGithub size={16} />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/nayeam-seikh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:border-[#F59E0B]/50
                    hover:bg-white/10
                  "
                >
                  <FaLinkedinIn size={16} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            SKILLS
        ========================================== */}
        <section className="mt-8">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#F59E0B]">
              My expertise
            </p>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#141416]
                  p-5
                  transition
                  hover:border-[#F59E0B]/30
                "
              >
                <h3 className="mb-4 text-lg font-semibold">{group.title}</h3>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-lg
                        border
                        border-white/10
                        bg-white/5
                        px-3
                        py-1.5
                        text-xs
                        text-gray-300
                        transition
                        hover:border-[#F59E0B]/40
                        hover:text-[#F59E0B]
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            EDUCATION & EXPERIENCE
        ========================================== */}
        <section className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Education */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F59E0B]/10
                  text-[#F59E0B]
                "
              >
                <GraduationCap size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Background
                </p>

                <h2 className="text-2xl font-bold">Education</h2>
              </div>
            </div>

            <div className="space-y-4">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#141416]
                    p-5
                  "
                >
                  <span className="text-xs font-medium text-[#F59E0B]">
                    {item.year}
                  </span>

                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#F59E0B]/10
                  text-[#F59E0B]
                "
              >
                <Briefcase size={20} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Professional
                </p>

                <h2 className="text-2xl font-bold">Experience</h2>
              </div>
            </div>

            <div className="space-y-4">
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#141416]
                    p-5
                  "
                >
                  <span className="text-xs font-medium text-[#F59E0B]">
                    {item.year}
                  </span>

                  <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">{item.company}</p>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================
            CTA
        ========================================== */}
        <section
          className="
            relative
            mt-12
            overflow-hidden
            rounded-3xl
            border
            border-[#F59E0B]/20
            bg-[#141416]
            p-7
            text-center
            sm:p-10
          "
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-[#F59E0B]/10 blur-3xl" />

          <div className="relative z-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#F59E0B]">
              Let's work together
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Have a project in mind?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
              I'm available for freelance projects, web applications, MERN stack
              development and AI-integrated websites.
            </p>

            <a
              href="/get_in_touch"
              className="
                mx-auto
                mt-6
                flex
                w-fit
                items-center
                gap-2
                rounded-xl
                bg-[#F59E0B]
                px-6
                py-3
                text-sm
                font-semibold
                text-black
                transition
                hover:bg-[#FFB52E]
              "
            >
              Get in touch
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>

        {/* =========================================
            FOOTER
        ========================================== */}
        <footer className="py-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} MD. Nayeam Seikh. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default ResumeLandingPage;
