import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";
import AiSearch from "./aiSearch";

const AiDrawer = ({ open, setOpen }) => {
  // Prevent background scrolling while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close drawer with Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  return (
    <>
      {/* =========================
          Overlay
      ========================== */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`
          fixed inset-0 z-[9998]
          bg-black/60 backdrop-blur-[3px]
          transition-all duration-300
          ${
            open
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
      />

      {/* =========================
          Drawer
      ========================== */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Ask AI"
        className={`
          fixed right-0 top-0 z-[9999]
          flex h-dvh flex-col
          overflow-hidden
          border-l border-white/[0.08]
          bg-black02
          shadow-[-20px_0_60px_rgba(0,0,0,0.45)]
          transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]

          /* Mobile */
          w-full

          /* Small phones */
          xs:w-full

          /* Tablets */
          sm:w-[420px]

          /* Desktop */
          md:w-[460px]
          lg:w-[480px]
          xl:w-[500px]
          2xl:w-[520px]

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* =========================
            Header
        ========================== */}
        <header
          className="
            flex shrink-0 items-center justify-between
            border-b border-white/[0.08]
            px-4 py-4
            sm:px-5 sm:py-5
            md:px-6
          "
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span
                className="
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-xl
                  bg-orange/10
                  text-lg
                  sm:h-10 sm:w-10
                "
              >
                🤖
              </span>

              <div className="min-w-0">
                <h2
                  className="
                    truncate
                    font-poppins
                    text-base font-semibold text-white01
                    sm:text-lg
                    md:text-xl
                  "
                >
                  Ask AI
                </h2>

                <p className="font-poppins text-[10px] text-white02/50 sm:text-xs">
                  AI Portfolio Assistant
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close AI assistant"
            className="
              ml-3 flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-xl
              border border-white/[0.08]
              bg-white/[0.03]
              text-white02
              transition-all duration-200
              hover:border-orange/40
              hover:bg-orange/10
              hover:text-orange
              active:scale-95
              sm:h-10 sm:w-10
            "
          >
            <FiX size={20} />
          </button>
        </header>

        {/* =========================
            Scrollable Body
        ========================== */}
        <main
          className="
            min-h-0 flex-1
            overflow-y-auto
            overscroll-contain
            scrollbar-thin
          "
        >
          <div
            className="
              space-y-5
              px-4 py-5
              sm:space-y-6
              sm:px-5 sm:py-6
              md:px-6 md:py-7
              lg:px-7
            "
          >
            {/* Hero */}
            <div>
              <span
                className="
                  mb-3 inline-flex
                  rounded-full
                  border border-orange/20
                  bg-orange/10
                  px-3 py-1
                  font-poppins
                  text-[10px] font-semibold uppercase
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
                  text-2xl font-bold leading-[1.15]
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
                  text-sm leading-6
                  text-white02/60
                  sm:text-[15px]
                  md:text-base
                "
              >
                I'm your AI assistant. Ask anything about my portfolio,
                projects, skills, experience, or development tools.
              </p>
            </div>

            {/* =========================
                Main CTA
            ========================== */}
            <button
              type="button"
              className="
                group
                w-full
                rounded-2xl
                border border-violet-400/20
                bg-violet-500
                p-4
                text-left
                text-white
                shadow-[0_12px_35px_rgba(139,92,246,0.15)]
                transition-all duration-300

                hover:-translate-y-0.5
                hover:bg-violet-600
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
                      text-sm font-semibold
                      sm:text-base
                    "
                  >
                    🚀 Build my website
                  </h4>

                  <p
                    className="
                      mt-1
                      font-poppins
                      text-xs text-violet-100/80
                      sm:text-sm
                    "
                  >
                    Most popular
                  </p>
                </div>

                <span
                  className="
                    shrink-0
                    rounded-full
                    bg-white/10
                    px-2.5 py-1
                    font-poppins
                    text-[9px] font-semibold uppercase
                    tracking-wider
                    text-white/80
                  "
                >
                  AI
                </span>
              </div>
            </button>

            {/* =========================
                Quick Actions
            ========================== */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h4
                  className="
                    font-poppins
                    text-xs font-semibold
                    uppercase tracking-[0.14em]
                    text-white02/50
                  "
                >
                  Quick Access
                </h4>

                <span className="font-poppins text-[10px] text-white02/30">
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
                {/* Projects */}
                <button
                  type="button"
                  className="
                    group
                    flex items-center gap-3
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.025]
                    p-3
                    text-left
                    transition-all duration-300

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
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-white/[0.05]
                      text-lg
                      transition-all duration-300
                      group-hover:bg-orange/10
                      xs:mx-auto
                    "
                  >
                    💼
                  </span>

                  <p
                    className="
                      font-poppins
                      text-sm font-medium
                      text-white02
                      transition-colors
                      group-hover:text-white
                      xs:mt-3
                    "
                  >
                    Projects
                  </p>
                </button>

                {/* Skills */}
                <button
                  type="button"
                  className="
                    group
                    flex items-center gap-3
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.025]
                    p-3
                    text-left
                    transition-all duration-300

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
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-white/[0.05]
                      text-lg
                      transition-all duration-300
                      group-hover:bg-orange/10
                      xs:mx-auto
                    "
                  >
                    👨‍💻
                  </span>

                  <p
                    className="
                      font-poppins
                      text-sm font-medium
                      text-white02
                      transition-colors
                      group-hover:text-white
                      xs:mt-3
                    "
                  >
                    Skills
                  </p>
                </button>

                {/* Resume */}
                <button
                  type="button"
                  className="
                    group
                    flex items-center gap-3
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.025]
                    p-3
                    text-left
                    transition-all duration-300

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
                      flex h-10 w-10 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-white/[0.05]
                      text-lg
                      transition-all duration-300
                      group-hover:bg-orange/10
                      xs:mx-auto
                    "
                  >
                    📄
                  </span>

                  <p
                    className="
                      font-poppins
                      text-sm font-medium
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

            {/* Additional spacing so content isn't hidden behind search */}
            <div className="h-24 sm:h-28" />
          </div>
        </main>

        {/* =========================
            Search Footer
        ========================== */}
        <footer
          className="
            shrink-0
            border-t border-white/[0.08]
            bg-black02/95
            p-3
            backdrop-blur-xl
            sm:p-4
            md:p-5
          "
        >
          <AiSearch />
        </footer>
      </aside>
    </>
  );
};

export default AiDrawer;
