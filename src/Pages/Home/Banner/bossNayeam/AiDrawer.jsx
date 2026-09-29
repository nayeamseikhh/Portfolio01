import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import AiSearch from "./aiSearch";

const AiDrawer = ({ open, setOpen }) => {
  const [quickQuery, setQuickQuery] = useState("");

  // =========================================================
  // QUICK AI ACTION
  // =========================================================
  const handleQuickAction = (query) => {
    setQuickQuery("");

    // Small delay allows the same button to be clicked again
    // with the same query.
    requestAnimationFrame(() => {
      setQuickQuery(query);
    });
  };

  // =========================================================
  // CLEAR QUICK QUERY AFTER AiSearch RECEIVES IT
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
              ? "visible pointer-events-auto opacity-100"
              : "invisible pointer-events-none opacity-0"
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
          <div className="min-w-0 flex-1">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange/10
                  text-lg
                "
              >
                🤖
              </span>

              <div className="min-w-0">
                <h2
                  className="
                    truncate
                    font-poppins
                    text-base
                    font-semibold
                    leading-tight
                    text-white01
                    sm:text-lg
                    md:text-xl
                  "
                >
                  Ask AI
                </h2>

                <p
                  className="
                    truncate
                    font-poppins
                    text-[10px]
                    leading-tight
                    text-white02/50
                    sm:text-xs
                  "
                >
                  AI Portfolio Assistant
                </p>
              </div>
            </div>
          </div>

          {/* Close */}
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
            <FiX size={20} />
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
          "
        >
          <div
            className="
              min-w-0
              space-y-5
              px-4
              py-5

              sm:space-y-6
              sm:px-5
              sm:py-6

              md:px-6
              md:py-7

              lg:px-7
            "
          >
            {/* =================================================
                HERO
            ================================================== */}
            <div>
              <span
                className="
                  mb-3
                  inline-flex
                  rounded-full
                  border
                  border-orange/20
                  bg-orange/10
                  px-3
                  py-1
                  font-poppins
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-orange
                  sm:text-xs
                "
              >
                AI Assistant
              </span>

              <h3
                className="
                  max-w-[460px]
                  font-poppins
                  text-2xl
                  font-bold
                  leading-[1.15]
                  text-white
                  sm:text-3xl
                  md:text-[34px]
                  lg:text-4xl
                "
              >
                What are you looking to create?
              </h3>

              <p
                className="
                  mt-3
                  max-w-[450px]
                  font-poppins
                  text-sm
                  leading-6
                  text-white02/60
                  sm:text-[15px]
                  md:text-base
                "
              >
                I'm your AI assistant. Ask anything about my portfolio,
                projects, skills, experience, or development tools.
              </p>
            </div>

            {/* =================================================
                BUILD MY WEBSITE
            ================================================== */}
            <button
              type="button"
              onClick={() =>
                handleQuickAction(
                  "Tell me how Nayeam can help build a modern, responsive, professional website. Explain his web development services, technologies, design capabilities, and what kind of websites he can create.",
                )
              }
              className="
                group
                w-full
                rounded-2xl
                border
                border-violet-400/20
                bg-orange
                p-4
                text-left
                text-white
                shadow-[0_12px_35px_rgba(139,92,246,0.15)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-orange/0
                hover:shadow-[0_18px_45px_rgba(139,92,246,0.22)]
                active:scale-[0.99]
                sm:p-5
              "
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4
                    className="
                      font-poppins
                      text-sm
                      font-semibold
                      sm:text-base
                    "
                  >
                    🚀 Build my website
                  </h4>

                  <p
                    className="
                      mt-1
                      font-poppins
                      text-xs
                      text-violet-100/80
                      sm:text-sm
                    "
                  >
                    Ask AI how Nayeam can build it
                  </p>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-white/10
                    px-2.5
                    py-1
                    font-poppins
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-white/80
                  "
                >
                  AI
                </span>
              </div>
            </button>

            {/* =================================================
                QUICK ACCESS
            ================================================== */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4
                  className="
                    font-poppins
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.14em]
                    text-white02/50
                  "
                >
                  Quick Access
                </h4>

                <span
                  className="
                    font-poppins
                    text-[10px]
                    text-white02/30
                  "
                >
                  Explore
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2.5
                  xs:grid-cols-3
                  sm:gap-3
                "
              >
                {/* =================================================
                    PROJECTS
                ================================================== */}
                <button
                  type="button"
                  onClick={() =>
                    handleQuickAction(
                      "Tell me about Nayeam's projects. Describe his major projects, what each project does, the technologies used, his role, and the problems each project solves.",
                    )
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-3
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-orange/30
                    hover:bg-orange/[0.06]

                    xs:block
                    xs:p-4
                    xs:text-center
                  "
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/[0.05]
                      text-lg
                      transition-all
                      duration-300
                      group-hover:bg-orange/10
                      xs:mx-auto
                    "
                  >
                    💼
                  </span>

                  <p
                    className="
                      font-poppins
                      text-sm
                      font-medium
                      text-white02
                      transition-colors
                      group-hover:text-white
                      xs:mt-3
                    "
                  >
                    Projects
                  </p>
                </button>

                {/* =================================================
                    SCALE
                ================================================== */}
                <button
                  type="button"
                  onClick={() =>
                    handleQuickAction(
                      "Explain Nayeam's technical skills and development capabilities. Tell me what technologies he works with, how he approaches scalable web applications, performance, responsive design, frontend, backend, APIs, and modern development.",
                    )
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-3
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-orange/30
                    hover:bg-orange/[0.06]

                    xs:block
                    xs:p-4
                    xs:text-center
                  "
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/[0.05]
                      text-lg
                      transition-all
                      duration-300
                      group-hover:bg-orange/10
                      xs:mx-auto
                    "
                  >
                    📈
                  </span>

                  <p
                    className="
                      font-poppins
                      text-sm
                      font-medium
                      text-white02
                      transition-colors
                      group-hover:text-white
                      xs:mt-3
                    "
                  >
                    Scale
                  </p>
                </button>

                {/* =================================================
                    RESUME
                ================================================== */}
                <button
                  type="button"
                  onClick={() =>
                    handleQuickAction(
                      "Give me a professional overview of Nayeam's resume. Summarize his experience, education, technical skills, development background, projects, achievements, and professional profile based on the portfolio information available to you.",
                    )
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    p-3
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-orange/30
                    hover:bg-orange/[0.06]

                    xs:block
                    xs:p-4
                    xs:text-center
                  "
                >
                  <span
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/[0.05]
                      text-lg
                      transition-all
                      duration-300
                      group-hover:bg-orange/10
                      xs:mx-auto
                    "
                  >
                    📄
                  </span>

                  <p
                    className="
                      font-poppins
                      text-sm
                      font-medium
                      text-white02
                      transition-colors
                      group-hover:text-white
                      xs:mt-3
                    "
                  >
                    Resume
                  </p>
                </button>
              </div>
            </div>

            <div className="h-4" />
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
