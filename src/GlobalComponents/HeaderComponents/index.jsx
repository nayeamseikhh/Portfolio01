import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
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
    title: "Software Development",
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
    ],
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/get_in_touch",
  },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdownOpen(false);
  };

  const openLogin = () => {
    closeMobileMenu();
    setLoginOpen(true);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileDropdownOpen(false);
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
        setMobileDropdownOpen(false);
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

                      {/* Desktop Dropdown */}
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
                          overflow-hidden
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
                        <div
                          className="
                            max-h-[min(70vh,520px)]
                            overflow-y-auto
                            overscroll-contain
                            pr-1
                            scrollbar-thin
                          "
                        >
                          {item.dropdown.map((subItem) => (
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
                          ))}
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
                border-white/10
                bg-white/[0.03]
                text-xl
                text-white
                transition-all
                duration-300
                hover:border-orange
                hover:text-orange
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
              overflow-hidden
              transition-all
              duration-300
              lg:hidden
              ${
                mobileOpen
                  ? "pointer-events-auto max-h-[calc(100vh-76px)] opacity-100"
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
              <div
                className="
                  max-h-[calc(100vh-90px)]
                  overflow-y-auto
                  overscroll-contain
                  p-3
                  sm:p-4
                "
              >
                <ul className="flex flex-col gap-1">
                  {navLinks.map((item) => (
                    <li key={item.title}>
                      {item.dropdown ? (
                        <div>
                          {/* Mobile Dropdown Trigger */}
                          <button
                            type="button"
                            onClick={() =>
                              setMobileDropdownOpen((prev) => !prev)
                            }
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
                            aria-expanded={mobileDropdownOpen}
                          >
                            <span>{item.title}</span>

                            <FiChevronDown
                              className={`
                                shrink-0
                                text-lg
                                transition-transform
                                duration-300
                                ${
                                  mobileDropdownOpen
                                    ? "rotate-180 text-orange"
                                    : ""
                                }
                              `}
                            />
                          </button>

                          {/* Mobile Dropdown Items */}
                          <div
                            className={`
                              overflow-hidden
                              transition-all
                              duration-300
                              ${
                                mobileDropdownOpen
                                  ? "max-h-[600px] opacity-100"
                                  : "max-h-0 opacity-0"
                              }
                            `}
                          >
                            <div className="mt-1 space-y-1 rounded-xl bg-white/[0.02] p-1">
                              {item.dropdown.map((subItem) => (
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
                              ))}
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

                {/* =========================
                    Mobile Actions
                ========================== */}
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
                  <AiButton onClick={openLogin} />

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
