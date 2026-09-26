import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link, NavLink } from "react-router";

import logo from "../../assets/logo/logo.png";
import Container from "../Container";
import AiButton from "./AiButton";
import Login from "../auth/login";

const navLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "My Skills",
    path: "/skills",
  },
  {
    title: "Project Plan",
    path: "/project_plan",
  },
  {
    title: "Pricing",
    path: "/pricing",
  },
  {
    title: "Software",
    dropdown: [
      {
        title: "Vat Tax Calculator",
        path: "/software_development/vattaxcalculator",
      },
      {
        title: "Color Palette Extractor",
        path: "/software_development/colorpaletteextractor",
      },
      {
        title: "Resume Landing Page",
        path: "/software_development/resumelandingpage",
      },
      {
        title: "Sheet Grid",
        path: "/software_development/sheetgrid",
      },
      {
        title: "Crypto Market Table",
        path: "/software_development/cryptomarkettable",
      },
      {
        title: "AI Text Summarizer",
        path: "/software_development/aitextsummarizer",
      },
      {
        title: "Json Formatter",
        path: "/software_development/jsonformatter",
      },
      {
        title: "QR Code Generator",
        path: "/software_development/qrcodegenerator",
      },
      {
        title: "QR Code Scanner",
        path: "/software_development/qrcodescanner",
      },
      {
        title: "Word Counter",
        path: "/software_development/wordcounter",
      },
      {
        title: "Text Diff Checker",
        path: "/software_development/textdiffchecker",
      },
      {
        title: "Case Converter",
        path: "/software_development/caseconverter",
      },
      {
        title: "Percentage Calculator",
        path: "/software_development/percentagecalculator",
      },
      {
        title: "Gradient Generator",
        path: "/software_development/gradientgenerator",
      },
      {
        title: "Background Remover",
        path: "/software_development/backgroundremover",
      },
      {
        title: "Weather Dashboard",
        path: "/software_development/weatherdashboard",
      },
      {
        title: "Tri Calendar",
        path: "/software_development/tricalendar",
      },
      {
        title: "Image Converter",
        path: "/software_development/imageconverter",
      },
      {
        title: "Pdf Merge Split",
        path: "/software_development/pdfmergesplit",
      },
      {
        title: "Image Compressor",
        path: "/software_development/imagecompressor",
      },
      {
        title: "World Clock",
        path: "/software_development/worldclock",
      },
      {
        title: "Random Picker",
        path: "/software_development/randompicker",
      },
      {
        title: "Timer/StopWatch Tools",
        path: "/software_development/timertools",
      },
      {
        title: "Age Calculator",
        path: "/software_development/agecalculator",
      },
      {
        title: "Bangla Songkha to Kotha Converter",
        path: "/software_development/banglasongkhatokotha",
      },
      {
        title: "Color Converter",
        path: "/software_development/colorconverter",
      },
      {
        title: "Markdown Previewer",
        path: "/software_development/markdownpreviewer",
      },
      {
        title: "Password Generator",
        path: "/software_development/passwordgenerator",
      },
      {
        title: "Pomodoro Timer",
        path: "/software_development/pomodorotimer",
      },
      {
        title: "Regex Tester",
        path: "/software_development/regextester",
      },
      {
        title: "Unit Converter",
        path: "/software_development/unitconverter",
      },
    ],
  },
  {
    title: "Best Innovation",
    dropdown: [
      {
        title: "Dashboard",
        dropdown: [
          {
            title: "Travel Destination",
            path: "/bestinnovation/dashboard/traveldestination",
          },
        ],
      },
      {
        title: "Game",
        dropdown: [
          {
            title: "Connect Four",
            path: "/bestinnovation/game/connectfour",
          },
        ],
      },
    ],
  },
  {
    title: "Contact",
    path: "/get_in_touch",
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);

  // Desktop/mobile top-level mobile dropdown
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  // Mobile nested dropdown
  const [mobileNestedDropdownOpen, setMobileNestedDropdownOpen] =
    useState(null);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
    setMobileNestedDropdownOpen(null);
  };

  const openLogin = () => {
    closeMobileMenu();
    setLoginOpen(true);
  };

  const toggleMobileDropdown = (title) => {
    setMobileDropdownOpen((prev) => (prev === title ? null : title));

    // Close nested dropdown when changing parent dropdown
    setMobileNestedDropdownOpen(null);
  };

  const toggleMobileNestedDropdown = (title) => {
    setMobileNestedDropdownOpen((prev) => (prev === title ? null : title));
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileDropdownOpen(null);
        setMobileNestedDropdownOpen(null);
        setLoginOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileDropdownOpen(null);
        setMobileNestedDropdownOpen(null);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50
          w-full
          border-b
          border-white/[0.06]
          bg-[#080808]/75
          backdrop-blur-xl
        "
      >
        <Container>
          <nav
            aria-label="Main navigation"
            className="
              relative
              flex
              min-h-[64px]
              w-full
              items-center
              justify-between
              gap-3
              rounded-2xl
              bg-white/[0.03]
              px-2
              sm:min-h-[70px]
              sm:px-3
              lg:min-h-[76px]
              lg:px-4
              xl:px-5
            "
          >
            {/* =========================
                Logo
            ========================== */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              aria-label="Nayeam Seikh - Home"
              className="
                flex
                shrink-0
                items-center
                transition-transform
                duration-300
                hover:scale-105
              "
            >
              <img
                src={logo}
                alt="Nayeam Seikh"
                className="
                  block
                  h-auto
                  w-[88px]
                  object-contain
                  xs:w-[96px]
                  sm:w-[105px]
                  md:w-[112px]
                  lg:w-[120px]
                "
              />
            </Link>

            {/* =========================
                Desktop Navigation
            ========================== */}
            <ul
              className="
                hidden
                items-center
                gap-4
                lg:flex
                xl:gap-7
                2xl:gap-9
              "
            >
              {navLinks.map((item) => (
                <li key={item.title} className="relative">
                  {item.dropdown ? (
                    <div className="group relative">
                      {/* Dropdown Trigger */}
                      <button
                        type="button"
                        className="
                          flex
                          items-center
                          gap-1.5
                          whitespace-nowrap
                          py-2
                          font-poppins
                          text-sm
                          font-semibold
                          text-white01
                          transition-colors
                          duration-300
                          hover:text-orange
                          xl:text-base
                        "
                        aria-haspopup="true"
                      >
                        {item.title}

                        <FiChevronDown
                          className="
                            text-base
                            transition-transform
                            duration-300
                            group-hover:rotate-180
                          "
                        />
                      </button>

                      {/* =================================================
                          DESKTOP DROPDOWN
                          
                          IMPORTANT:
                          overflow-visible is required because
                          Best Innovation -> Game opens outside.
                      ================================================== */}
                      <div
                        className="
                          invisible
                          absolute
                          left-1/2
                          top-full
                          z-50
                          mt-2
                          w-[min(90vw,320px)]
                          -translate-x-1/2
                          translate-y-2
                          overflow-visible
                          rounded-2xl
                          border
                          border-white/[0.08]
                          bg-[#111111]/98
                          p-2
                          opacity-0
                          shadow-2xl
                          backdrop-blur-xl
                          transition-all
                          duration-300
                          group-hover:visible
                          group-hover:translate-y-0
                          group-hover:opacity-100
                        "
                      >
                        {/* =================================================
                            SOFTWARE

                            Only Software needs scrolling because it
                            contains many items.

                            Best Innovation does NOT get a scrollbar.
                        ================================================== */}
                        <div
                          className={
                            item.title === "Software"
                              ? `
                                max-h-[min(70vh,520px)]
                                overflow-y-auto
                                overscroll-contain
                                pr-1
                                scrollbar-thin
                              `
                              : ""
                          }
                        >
                          {item.dropdown.map((subItem) => {
                            {
                              /* =================================================
                                NESTED DROPDOWN
                            ================================================== */
                            }
                            if (subItem.dropdown) {
                              return (
                                <div
                                  key={subItem.title}
                                  className="group/nested relative"
                                >
                                  {/* Nested trigger */}
                                  <button
                                    type="button"
                                    className="
                                      flex
                                      w-full
                                      items-center
                                      justify-between
                                      rounded-xl
                                      px-4
                                      py-3
                                      text-left
                                      font-poppins
                                      text-sm
                                      text-white01
                                      transition-all
                                      duration-200
                                      hover:bg-white/[0.05]
                                      hover:text-orange
                                    "
                                    aria-haspopup="true"
                                  >
                                    <span>{subItem.title}</span>

                                    <FiChevronRight
                                      className="
                                        shrink-0
                                        text-base
                                        transition-transform
                                        duration-200
                                        group-hover/nested:translate-x-0.5
                                      "
                                    />
                                  </button>

                                  {/* =================================================
                                      NESTED DROPDOWN

                                      No margin between parent and child.
                                      This prevents hover from disappearing.

                                      No overflow wrapper around it.
                                  ================================================== */}
                                  <div
                                    className="
                                      invisible
                                      absolute
                                      left-full
                                      top-0
                                      z-[100]
                                      w-[220px]
                                      rounded-2xl
                                      border
                                      border-white/[0.08]
                                      bg-[#111111]/98
                                      p-2
                                      opacity-0
                                      shadow-2xl
                                      backdrop-blur-xl
                                      transition-all
                                      duration-200
                                      group-hover/nested:visible
                                      group-hover/nested:opacity-100
                                    "
                                  >
                                    {subItem.dropdown.map((nestedItem) => (
                                      <NavLink
                                        key={nestedItem.path}
                                        to={nestedItem.path}
                                        className={({ isActive }) =>
                                          `
                                            block
                                            rounded-xl
                                            px-4
                                            py-3
                                            font-poppins
                                            text-sm
                                            transition-all
                                            duration-200
                                            ${
                                              isActive
                                                ? "bg-orange/10 text-orange"
                                                : "text-white01 hover:bg-white/[0.05] hover:text-orange"
                                            }
                                          `
                                        }
                                      >
                                        {nestedItem.title}
                                      </NavLink>
                                    ))}
                                  </div>
                                </div>
                              );
                            }

                            {
                              /* =================================================
                                NORMAL DROPDOWN ITEM
                            ================================================== */
                            }
                            return (
                              <NavLink
                                key={subItem.path}
                                to={subItem.path}
                                className={({ isActive }) =>
                                  `
                                    block
                                    rounded-xl
                                    px-4
                                    py-3
                                    font-poppins
                                    text-sm
                                    transition-all
                                    duration-200
                                    ${
                                      isActive
                                        ? "bg-orange/10 text-orange"
                                        : "text-white01 hover:bg-white/[0.05] hover:text-orange"
                                    }
                                  `
                                }
                              >
                                {subItem.title}
                              </NavLink>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `
                          group
                          relative
                          block
                          whitespace-nowrap
                          py-2
                          font-poppins
                          text-sm
                          font-semibold
                          transition-colors
                          duration-300
                          xl:text-base
                          ${
                            isActive
                              ? "text-orange"
                              : "text-white01 hover:text-orange"
                          }
                        `
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.title}

                          <span
                            className={`
                              absolute
                              -bottom-0.5
                              left-0
                              h-[2px]
                              rounded-full
                              bg-orange
                              transition-all
                              duration-300
                              ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                            `}
                          />
                        </>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            {/* =========================
                Desktop Actions
            ========================== */}
            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                lg:flex
                xl:gap-3
              "
            >
              <AiButton onClick={openLogin} />

              <Link
                to="/get_in_touch"
                className="
                  inline-flex
                  items-center
                  justify-center
                  whitespace-nowrap
                  rounded-xl
                  bg-orange
                  px-4
                  py-2.5
                  font-poppins
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:bg-orange/90
                  xl:px-5
                "
              >
                Hire Me
              </Link>

              <Login />
            </div>

            {/* =========================
                Mobile Menu Button
            ========================== */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={
                mobileOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                !border-white/10
                !bg-white/[0.03]
                !text-xl
                !text-white
                transition-all
                duration-300
                !hover:border-orange
                !hover:text-orange
                sm:h-11
                sm:w-11
                sm:text-2xl
                lg:hidden
              "
            >
              {mobileOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </nav>

          {/* =========================
              Mobile Navigation
          ========================== */}
          <div
            id="mobile-navigation"
            className={`
              lg:hidden
              overflow-hidden
              transition-all
              duration-300
              ${
                mobileOpen
                  ? "pointer-events-auto max-h-[calc(100dvh-76px)] opacity-100"
                  : "pointer-events-none max-h-0 opacity-0"
              }
            `}
          >
            <nav
              aria-label="Mobile navigation"
              className="
                mt-2
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#111111]/98
                shadow-2xl
                backdrop-blur-xl
              "
            >
              {/* =====================================================
                  MOBILE SCROLL AREA
              ====================================================== */}
              <div
                className="
                  max-h-[calc(100dvh-90px)]
                  overflow-y-auto
                  overflow-x-hidden
                  overscroll-contain
                  [scrollbar-width:thin]
                  p-3
                  sm:p-4
                "
              >
                <ul className="flex flex-col gap-1">
                  {navLinks.map((item) => (
                    <li key={item.title}>
                      {item.dropdown ? (
                        <div>
                          {/* =================================================
                              TOP LEVEL MOBILE DROPDOWN
                          ================================================== */}
                          <button
                            type="button"
                            onClick={() => toggleMobileDropdown(item.title)}
                            className="
                              flex
                              w-full
                              items-center
                              justify-between
                              rounded-xl
                              px-4
                              py-3
                              text-left
                              font-poppins
                              text-sm
                              font-medium
                              text-white01
                              transition-all
                              duration-300
                              hover:bg-white/[0.04]
                              hover:text-orange
                              sm:py-3.5
                              sm:text-base
                            "
                            aria-expanded={mobileDropdownOpen === item.title}
                          >
                            <span>{item.title}</span>

                            <FiChevronDown
                              className={`
                                shrink-0
                                text-lg
                                transition-transform
                                duration-300
                                ${
                                  mobileDropdownOpen === item.title
                                    ? "rotate-180 text-orange"
                                    : ""
                                }
                              `}
                            />
                          </button>

                          {/* =================================================
                              TOP LEVEL CONTENT
                          ================================================== */}
                          <div
                            className={`
                              grid
                              transition-[grid-template-rows,opacity]
                              duration-300
                              ease-in-out
                              ${
                                mobileDropdownOpen === item.title
                                  ? "grid-rows-[1fr] opacity-100"
                                  : "grid-rows-[0fr] opacity-0"
                              }
                            `}
                          >
                            <div className="min-h-0 overflow-hidden">
                              <div
                                className="
                                  mt-1
                                  space-y-1
                                  rounded-xl
                                  bg-white/[0.02]
                                  p-1
                                "
                              >
                                {item.dropdown.map((subItem) => {
                                  {
                                    /* =================================================
                                      MOBILE NESTED DROPDOWN
                                  ================================================== */
                                  }
                                  if (subItem.dropdown) {
                                    return (
                                      <div key={subItem.title}>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            toggleMobileNestedDropdown(
                                              subItem.title,
                                            )
                                          }
                                          className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            rounded-lg
                                            px-4
                                            py-2.5
                                            text-left
                                            font-poppins
                                            text-sm
                                            text-gray-300
                                            transition-all
                                            duration-200
                                            hover:bg-white/[0.04]
                                            hover:text-orange
                                          "
                                          aria-expanded={
                                            mobileNestedDropdownOpen ===
                                            subItem.title
                                          }
                                        >
                                          <span>{subItem.title}</span>

                                          <FiChevronRight
                                            className={`
                                              text-base
                                              transition-transform
                                              duration-200
                                              ${
                                                mobileNestedDropdownOpen ===
                                                subItem.title
                                                  ? "rotate-90 text-orange"
                                                  : ""
                                              }
                                            `}
                                          />
                                        </button>

                                        {/* =================================================
                                            MOBILE NESTED CONTENT
                                        ================================================== */}
                                        <div
                                          className={`
                                            grid
                                            transition-[grid-template-rows,opacity]
                                            duration-300
                                            ease-in-out
                                            ${
                                              mobileNestedDropdownOpen ===
                                              subItem.title
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }
                                          `}
                                        >
                                          <div className="min-h-0 overflow-hidden">
                                            <div className="ml-3 mt-1 space-y-1 border-l border-white/[0.08] pl-2">
                                              {subItem.dropdown.map(
                                                (nestedItem) => (
                                                  <NavLink
                                                    key={nestedItem.path}
                                                    to={nestedItem.path}
                                                    onClick={closeMobileMenu}
                                                    className={({ isActive }) =>
                                                      `
                                                        block
                                                        rounded-lg
                                                        px-4
                                                        py-2.5
                                                        font-poppins
                                                        text-sm
                                                        transition-all
                                                        duration-200
                                                        ${
                                                          isActive
                                                            ? "bg-orange/10 text-orange"
                                                            : "text-gray-300 hover:bg-white/[0.04] hover:text-orange"
                                                        }
                                                      `
                                                    }
                                                  >
                                                    {nestedItem.title}
                                                  </NavLink>
                                                ),
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }

                                  {
                                    /* =================================================
                                      NORMAL MOBILE DROPDOWN ITEM
                                  ================================================== */
                                  }
                                  return (
                                    <NavLink
                                      key={subItem.path}
                                      to={subItem.path}
                                      onClick={closeMobileMenu}
                                      className={({ isActive }) =>
                                        `
                                          block
                                          rounded-lg
                                          px-4
                                          py-2.5
                                          font-poppins
                                          text-sm
                                          transition-all
                                          duration-200
                                          ${
                                            isActive
                                              ? "bg-orange/10 text-orange"
                                              : "text-gray-300 hover:bg-white/[0.04] hover:text-orange"
                                          }
                                        `
                                      }
                                    >
                                      {subItem.title}
                                    </NavLink>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <NavLink
                          to={item.path}
                          onClick={closeMobileMenu}
                          className={({ isActive }) =>
                            `
                              block
                              rounded-xl
                              px-4
                              py-3
                              font-poppins
                              text-sm
                              font-medium
                              transition-all
                              duration-300
                              sm:py-3.5
                              sm:text-base
                              ${
                                isActive
                                  ? "bg-orange/10 text-orange"
                                  : "text-white01 hover:bg-white/[0.04] hover:text-orange"
                              }
                            `
                          }
                        >
                          {item.title}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>

                {/* =====================================================
                    MOBILE ACTIONS
                ====================================================== */}
                <div
                  className="
                    mt-4
                    grid
                    gap-2.5
                    border-t
                    border-white/[0.08]
                    pt-4
                    sm:gap-3
                  "
                >
                  <AiButton />

                  <Link
                    to="/get_in_touch"
                    onClick={closeMobileMenu}
                    className="
                      flex
                      min-h-[46px]
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange
                      px-5
                      py-3
                      text-center
                      font-poppins
                      text-sm
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      hover:bg-orange/90
                      sm:min-h-[50px]
                      sm:text-base
                    "
                  >
                    Hire Me
                  </Link>

                  <button
                    type="button"
                    onClick={openLogin}
                    className="
                      flex
                      min-h-[46px]
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-orange
                      px-5
                      py-3
                      font-poppins
                      text-sm
                      font-semibold
                      text-orange
                      transition-all
                      duration-300
                      hover:bg-orange
                      hover:text-white
                      sm:min-h-[50px]
                      sm:text-base
                    "
                  >
                    Log In
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </Container>
      </header>

      {/* Login Modal */}
      {loginOpen && <Login onClick={() => setLoginOpen(false)} />}
    </>
  );
};

export default Header;
