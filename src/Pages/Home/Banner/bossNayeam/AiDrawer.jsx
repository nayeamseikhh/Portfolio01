import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCode,
  FiFileText,
  FiLayers,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router";

import AiSearch from "./aiSearch";

const AiDrawer = ({ open, setOpen }) => {
  const [quickQuery, setQuickQuery] = useState("");

  const navigate = useNavigate();

  // =========================================================
  // QUICK AI ACTION
  // =========================================================
  // KEEPING YOUR ORIGINAL WORKING AI LOGIC UNCHANGED
  const handleQuickAction = (query) => {
    setQuickQuery("");

    requestAnimationFrame(() => {
      setQuickQuery(query);
    });
  };

  // =========================================================
  // PAGE NAVIGATION
  // =========================================================
  // ONLY USED BY THE 4 DESIGN CARDS
  const handlePageNavigation = (path) => {
    setOpen(false);
    navigate(path);
  };

  // =========================================================
  // CLEAR QUICK QUERY
  // =========================================================
  const handleQuickQueryHandled = () => {
    setQuickQuery("");
  };

  // =========================================================
  // LOCK BACKGROUND SCROLL
  // =========================================================
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // =========================================================
  // ESCAPE KEY
  // =========================================================
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  // =========================================================
  // QUICK SUGGESTIONS
  // =========================================================
  const suggestions = [
    {
      id: "website",
      icon: FiCode,
      title: "Build a website",
      description: "Explore web development services",

      // PAGE LINK
      path: "/get_in_touch",

      // KEEP AI QUERY
      query:
        "Tell me how Nayeam can help build a modern, responsive, professional website. Explain his web development services, technologies, design capabilities, and what kind of websites he can create.",
    },

    {
      id: "projects",
      icon: FiBriefcase,
      title: "Explore projects",
      description: "See projects and technologies",

      // PAGE LINK
      path: "/project_plan",

      // KEEP AI QUERY
      query:
        "Tell me about Nayeam's projects. Describe his major projects, what each project does, the technologies used, his role, and the problems each project solves.",
    },

    {
      id: "skills",
      icon: FiLayers,
      title: "Technical skills",
      description: "Explore development capabilities",

      // PAGE LINK
      path: "/skills",

      // KEEP AI QUERY
      query:
        "Explain Nayeam's technical skills and development capabilities. Tell me what technologies he works with, how he approaches scalable web applications, performance, responsive design, frontend, backend, APIs, and modern development.",
    },

    {
      id: "resume",
      icon: FiFileText,
      title: "View my profile",
      description: "Explore experience and background",

      // PAGE LINK
      path: "/about",

      // KEEP AI QUERY
      query:
        "Give me a professional overview of Nayeam's resume. Summarize his experience, education, technical skills, development background, projects, achievements, and professional profile based on the portfolio information available to you.",
    },
  ];

  // =========================================================
  // PORTAL
  // =========================================================
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      {/* =====================================================
          OVERLAY
      ====================================================== */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`
          fixed
          inset-0
          z-[9998]
          bg-black/60
          backdrop-blur-[3px]
          transition-opacity
          duration-300

          ${
            open
              ? "pointer-events-auto visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      />

      {/* =====================================================
          DRAWER
      ====================================================== */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Ask AI"
        className={`
          fixed
          inset-y-0
          right-0
          z-[9999]

          grid
          h-[100dvh]
          min-h-0

          grid-rows-[auto_minmax(0,1fr)_auto]

          overflow-hidden

          border-l
          border-white/[0.08]

          bg-black02

          shadow-[-20px_0_60px_rgba(0,0,0,0.45)]

          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          w-full
          sm:w-[420px]
          md:w-[460px]
          lg:w-[480px]
          xl:w-[500px]
          2xl:w-[520px]

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* =====================================================
            HEADER
        ====================================================== */}
        <header
          className="
            flex
            min-w-0
            shrink-0
            items-center
            justify-between

            border-b
            border-white/[0.08]

            bg-black02

            px-4
            py-3.5

            sm:px-5
            sm:py-4

            md:px-6
            md:py-5
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            {/* AI ICON */}
            <div
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-orange/20
                bg-orange/10
                text-orange
              "
            >
              <span
                className="
                  absolute
                  inset-0
                  bg-orange/10
                  blur-xl
                "
              />

              <span className="relative text-lg">✦</span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  className="
                    truncate
                    font-poppins
                    text-base
                    font-semibold
                    leading-tight
                    text-white01
                    sm:text-lg
                  "
                >
                  Ask AI
                </h2>

                <span
                  className="
                    rounded-full
                    border
                    border-orange/20
                    bg-orange/10
                    px-2
                    py-0.5
                    font-poppins
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-orange
                  "
                >
                  Beta
                </span>
              </div>

              <p
                className="
                  mt-0.5
                  truncate
                  font-poppins
                  text-[10px]
                  leading-tight
                  text-white02/50
                  sm:text-xs
                "
              >
                Nayeam's AI portfolio assistant
              </p>
            </div>
          </div>

          {/* CLOSE */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close AI assistant"
            className="
              ml-3
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.03]
              text-white02
              transition-all
              duration-200
              hover:border-orange/40
              hover:bg-orange/10
              hover:text-orange
              active:scale-95

              sm:h-10
              sm:w-10
            "
          >
            <FiX size={19} />
          </button>
        </header>

        {/* =====================================================
            BODY
        ====================================================== */}
        <main
          className="
            min-h-0
            min-w-0
            overflow-y-auto
            overflow-x-hidden
            overscroll-contain

            [scrollbar-width:thin]
            [scrollbar-color:rgba(224,130,45,0.35)_transparent]

            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-orange/30
          "
        >
          <div
            className="
              min-w-0
              px-4
              py-6

              sm:px-5
              sm:py-7

              md:px-6
              md:py-8

              lg:px-7
            "
          >
            {/* =================================================
                HERO
            ================================================== */}
            <section>
              {/* SMALL LABEL */}
              <div
                className="
                  mb-4
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-orange
                  "
                />

                <span
                  className="
                    font-poppins
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-orange
                    sm:text-xs
                  "
                >
                  AI Assistant
                </span>
              </div>

              {/* TITLE */}
              <h3
                className="
                  max-w-[440px]
                  font-poppins
                  text-[28px]
                  font-bold
                  leading-[1.12]
                  tracking-tight
                  text-white

                  sm:text-3xl
                  md:text-[34px]
                  lg:text-4xl
                "
              >
                What can I help you
                <span className="text-orange"> explore?</span>
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-4
                  max-w-[430px]
                  font-poppins
                  text-sm
                  leading-6
                  text-white02/55

                  sm:text-[15px]
                "
              >
                Ask me anything about Nayeam's projects, skills, experience,
                services, or development work.
              </p>
            </section>

            {/* =================================================
                DIVIDER
            ================================================== */}
            <div
              className="
                my-7
                h-px
                w-full
                bg-gradient-to-r
                from-orange/20
                via-white/[0.08]
                to-transparent
              "
            />

            {/* =================================================
                SUGGESTIONS HEADER
            ================================================== */}
            <div className="mb-3.5 flex items-center justify-between">
              <div>
                <h4
                  className="
                    font-poppins
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white
                  "
                >
                  Try asking
                </h4>

                <p
                  className="
                    mt-1
                    font-poppins
                    text-[10px]
                    text-white02/35
                  "
                >
                  Quick suggestions
                </p>
              </div>

              <span
                className="
                  rounded-full
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  px-2.5
                  py-1
                  font-poppins
                  text-[9px]
                  text-white02/35
                "
              >
                4 suggestions
              </span>
            </div>

            {/* =================================================
                SUGGESTION CARDS
            ================================================== */}
            <div
              className="
                grid
                grid-cols-1
                gap-2.5

                xs:grid-cols-2
                sm:gap-3
              "
            >
              {suggestions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    // =================================================
                    // ONLY THIS ACTION IS CHANGED
                    // 4 CARDS NOW GO TO THEIR OWN PAGE
                    // =================================================
                    onClick={() => handlePageNavigation(item.path)}
                    className="
                      group
                      relative
                      min-w-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      p-4
                      text-left

                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:border-orange/25
                      hover:bg-orange/[0.045]

                      active:scale-[0.98]

                      sm:p-4
                    "
                  >
                    {/* HOVER GLOW */}
                    <span
                      className="
                        pointer-events-none
                        absolute
                        -right-8
                        -top-8
                        h-20
                        w-20
                        rounded-full
                        bg-orange/0
                        blur-2xl
                        transition-all
                        duration-500
                        group-hover:bg-orange/10
                      "
                    />

                    <div className="relative">
                      {/* ICON + ARROW */}
                      <div className="mb-4 flex items-center justify-between">
                        <span
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/[0.07]
                            bg-white/[0.04]
                            text-white02
                            transition-all
                            duration-300
                            group-hover:border-orange/20
                            group-hover:bg-orange/10
                            group-hover:text-orange
                          "
                        >
                          <Icon size={17} />
                        </span>

                        <FiArrowUpRight
                          className="
                            text-white02/20
                            transition-all
                            duration-300
                            group-hover:-translate-y-0.5
                            group-hover:translate-x-0.5
                            group-hover:text-orange
                          "
                          size={16}
                        />
                      </div>

                      {/* TITLE */}
                      <h5
                        className="
                          font-poppins
                          text-sm
                          font-semibold
                          text-white
                          transition-colors
                          group-hover:text-orange
                        "
                      >
                        {item.title}
                      </h5>

                      {/* DESCRIPTION */}
                      <p
                        className="
                          mt-1.5
                          font-poppins
                          text-[11px]
                          leading-5
                          text-white02/40
                          transition-colors
                          group-hover:text-white02/60
                        "
                      >
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* =================================================
                FREE SPACE / INFO
            ================================================== */}
            <div
              className="
                mt-6
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.015]
                p-4
              "
            >
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-orange/10
                    text-orange
                  "
                >
                  ✦
                </div>

                <div className="min-w-0">
                  <p
                    className="
                      font-poppins
                      text-xs
                      font-medium
                      text-white02/70
                    "
                  >
                    Or ask me anything
                  </p>

                  <p
                    className="
                      mt-1
                      font-poppins
                      text-[10px]
                      leading-5
                      text-white02/30
                    "
                  >
                    Type your own question below and I'll search for an answer.
                  </p>
                </div>
              </div>
            </div>

            <div className="h-3" />
          </div>
        </main>

        {/* =====================================================
            AI SEARCH FOOTER
        ====================================================== */}
        <footer
          className="
            relative
            z-50
            min-w-0
            shrink-0

            border-t
            border-white/[0.08]

            bg-black02

            px-3
            py-3

            shadow-[0_-15px_35px_rgba(0,0,0,0.35)]

            sm:px-4
            sm:py-4

            md:px-5
            md:py-5

            pb-[calc(0.75rem+env(safe-area-inset-bottom))]
          "
        >
          {/* =================================================
              THIS IS YOUR ORIGINAL WORKING AI SEARCH
              COMPLETELY UNCHANGED
          ================================================== */}
          <AiSearch
            quickQuery={quickQuery}
            onQuickQueryHandled={handleQuickQueryHandled}
          />
        </footer>
      </aside>
    </>,
    document.body,
  );
};

export default AiDrawer;
