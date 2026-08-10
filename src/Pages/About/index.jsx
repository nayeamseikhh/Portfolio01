import React from "react";
import { Link } from "react-router";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaCode,
  FaServer,
  FaMobileAlt,
} from "react-icons/fa";
import {
  MdOutlineDesignServices,
  MdSecurity,
  MdSpeed,
  MdApi,
} from "react-icons/md";

const About = () => {
  const skills = [
    {
      icon: <FaReact />,
      title: "React.js",
      description:
        "Building modern, reusable, responsive and interactive user interfaces.",
    },
    {
      icon: <FaNodeJs />,
      title: "Node.js",
      description:
        "Creating scalable backend systems and high-performance server applications.",
    },
    {
      icon: <FaServer />,
      title: "Express.js",
      description:
        "Developing clean REST APIs, authentication systems and backend services.",
    },
    {
      icon: <FaDatabase />,
      title: "MongoDB",
      description:
        "Designing flexible database structures and managing application data.",
    },
    {
      icon: <FaCode />,
      title: "JavaScript",
      description:
        "Writing clean, maintainable and efficient JavaScript applications.",
    },
    {
      icon: <MdApi />,
      title: "API Integration",
      description:
        "Connecting applications with third-party APIs and external services.",
    },
  ];

  const services = [
    "Custom Web Development",
    "Full-Stack MERN Applications",
    "REST API Development",
    "Authentication & Authorization",
    "Responsive Website Development",
    "Database Design & Management",
    "AI Integration",
    "Performance Optimization",
  ];

  return (
    <main className="bg-[#171312] text-white min-h-screen pt-24 pb-20">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[550px]">
          {/* Left */}
          <div>
            <p className="text-[#F28C28] text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase mb-5">
              About Me
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Building digital
              <br />
              <span className="text-gray-400">experiences that</span>
              <br />
              <span className="text-[#F28C28]">make an impact.</span>
            </h1>

            <p className="text-gray-400 leading-7 mt-7 max-w-xl text-sm sm:text-base">
              I'm Nayeam Seikh, a Full-Stack MERN Developer focused on building
              modern, responsive, secure, and scalable web applications. I enjoy
              turning ideas into real-world digital products with clean
              architecture and intuitive user experiences.
            </p>

            <p className="text-gray-400 leading-7 mt-4 max-w-xl text-sm sm:text-base">
              Since 2024, I've been working with technologies like React,
              Node.js, Express.js, MongoDB, Tailwind CSS and AI integrations to
              create reliable and high-performance web applications.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/get_in_touch"
                className="inline-flex items-center justify-center rounded-lg bg-[#F28C28] px-6 py-3 font-semibold text-white transition hover:bg-orange-500"
              >
                Let's Work Together
              </Link>

              <Link
                to="/skills"
                className="inline-flex items-center justify-center rounded-lg border border-[#F28C28] px-6 py-3 font-semibold text-[#F28C28] transition hover:bg-[#F28C28] hover:text-white"
              >
                Explore My Skills
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-3xl border border-gray-800 bg-[#1F1F1F] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-14 w-14 rounded-full bg-[#F28C28]/10 flex items-center justify-center">
                  <FaCode className="text-[#F28C28] text-2xl" />
                </div>

                <div>
                  <h3 className="text-xl font-bold">Full-Stack Developer</h3>

                  <p className="text-gray-500 text-sm mt-1">
                    MERN Stack • AI Integration
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <span className="text-gray-400">Experience</span>
                  <span className="font-semibold text-white">Since 2024</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <span className="text-gray-400">Specialization</span>
                  <span className="font-semibold text-white">MERN Stack</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                  <span className="text-gray-400">Development</span>
                  <span className="font-semibold text-white">
                    Frontend + Backend
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Availability</span>

                  <span className="flex items-center gap-2 text-green-400 font-medium">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                    Available for work
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full border border-[#F28C28]/30 hidden sm:block"></div>

            <div className="absolute -bottom-5 -left-5 w-16 h-16 rounded-full bg-[#F28C28]/5 hidden sm:block"></div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F28C28]">
              2024
            </h3>
            <p className="text-gray-500 mt-2 text-sm">Started Development</p>
          </div>

          <div className="bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F28C28]">
              MERN
            </h3>
            <p className="text-gray-500 mt-2 text-sm">Full Stack</p>
          </div>

          <div className="bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F28C28]">
              100%
            </h3>
            <p className="text-gray-500 mt-2 text-sm">Responsive Design</p>
          </div>

          <div className="bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-[#F28C28]">
              AI
            </h3>
            <p className="text-gray-500 mt-2 text-sm">Modern Integration</p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MY STORY
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Story */}
          <div>
            <p className="text-[#F28C28] text-xs tracking-[0.3em] uppercase font-semibold mb-4">
              My Journey
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold">
              From learning code
              <br />
              <span className="text-gray-400">to building products.</span>
            </h2>

            <div className="mt-7 space-y-5 text-gray-400 leading-7 text-sm sm:text-base">
              <p>
                My journey into web development started with curiosity about how
                websites and applications work. What started with HTML, CSS and
                JavaScript gradually became a passion for building complete web
                applications.
              </p>

              <p>
                I moved into the MERN stack to understand both frontend and
                backend development. Today, I work with React, Node.js,
                Express.js and MongoDB to create complete full-stack
                applications.
              </p>

              <p>
                I'm also exploring AI integration, APIs and modern development
                techniques to build applications that are smarter, faster and
                more useful.
              </p>
            </div>
          </div>

          {/* Development Philosophy */}
          <div className="bg-[#1F1F1F] border border-gray-800 rounded-3xl p-7 sm:p-9">
            <p className="text-[#F28C28] text-xs tracking-[0.3em] uppercase font-semibold">
              My Approach
            </p>

            <h3 className="text-2xl sm:text-3xl font-bold mt-4">
              How I build websites
            </h3>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F28C28]/10 flex items-center justify-center">
                  <MdOutlineDesignServices className="text-[#F28C28] text-xl" />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Clean & Modern UI
                  </h4>

                  <p className="text-gray-500 text-sm mt-1 leading-6">
                    Simple, attractive and user-friendly interfaces designed for
                    real users.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F28C28]/10 flex items-center justify-center">
                  <MdSpeed className="text-[#F28C28] text-xl" />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Performance Focused
                  </h4>

                  <p className="text-gray-500 text-sm mt-1 leading-6">
                    Fast-loading applications with optimized components and
                    efficient code.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-[#F28C28]/10 flex items-center justify-center">
                  <MdSecurity className="text-[#F28C28] text-xl" />
                </div>

                <div>
                  <h4 className="font-semibold text-white">
                    Secure Architecture
                  </h4>

                  <p className="text-gray-500 text-sm mt-1 leading-6">
                    Authentication, authorization, validation and secure API
                    development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          TECH STACK
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-24">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#F28C28] text-xs tracking-[0.3em] uppercase font-semibold">
            Technologies
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            Tools I use to build
            <span className="text-gray-400"> great products.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="group bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F28C28]/50"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F28C28]/10 flex items-center justify-center text-[#F28C28] text-2xl group-hover:bg-[#F28C28] group-hover:text-white transition duration-300">
                {skill.icon}
              </div>

              <h3 className="text-xl font-semibold mt-5">{skill.title}</h3>

              <p className="text-gray-500 text-sm leading-6 mt-2">
                {skill.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          WHAT I OFFER
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-24">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-[#F28C28] text-xs tracking-[0.3em] uppercase font-semibold">
              What I Offer
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Everything you need to
              <br />
              <span className="text-gray-400">build your next idea.</span>
            </h2>

            <p className="text-gray-500 leading-7 mt-6 max-w-xl">
              Whether you need a landing page, a complete SaaS application, REST
              API or AI-powered feature, I can help turn your idea into a
              production-ready digital experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-gray-300"
              >
                <span className="w-2 h-2 rounded-full bg-[#F28C28] shrink-0"></span>

                <span className="text-sm sm:text-base">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-24">
        <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-[#1F1F1F] p-7 sm:p-10 lg:p-14">
          {/* Decorative */}
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#F28C28]/5"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-[#F28C28] text-xs tracking-[0.3em] uppercase font-semibold">
                Let's Work Together
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                Have a project in mind?
                <br />
                <span className="text-gray-400">
                  Let's build something great.
                </span>
              </h2>

              <p className="text-gray-500 mt-4 max-w-xl text-sm leading-6">
                I'm available for freelance projects, collaborations and
                exciting web development opportunities.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                to="/get_in_touch"
                className="rounded-lg bg-[#F28C28] px-6 py-3 font-semibold text-white hover:bg-orange-500 transition"
              >
                Get In Touch →
              </Link>

              <a
                href="/Nayeam-Seikh-CV.pdf"
                download
                className="rounded-lg border border-[#F28C28] px-6 py-3 font-semibold text-[#F28C28] hover:bg-[#F28C28] hover:text-white transition"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
