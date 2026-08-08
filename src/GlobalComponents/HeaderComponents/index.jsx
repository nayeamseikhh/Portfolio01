import { useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link, NavLink } from "react-router";

import logo from "../../assets/logo/logo.png";
import Container from "../Container";
import DarkMode from "./DarkMode";
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

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className="
        fixed
        top-0
        z-50
        w-full
        border-b
        border-white/[0.04]
        bg-transparent
        backdrop-blur-xl
      "
    >
      <Container>
        <nav
          aria-label="Main navigation"
          className="
            relative
            flex
            min-h-[76px]
            items-center
            justify-between

            rounded-2xl
            bg-white/[0.03]

            px-2
            sm:px-3
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
              shrink-0
              -ml-1
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
                w-[105px]
                object-contain
                sm:w-[115px]
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
              gap-7
              lg:flex
              xl:gap-9
            "
          >
            {navLinks.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    group
                    relative
                    block
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
              </li>
            ))}
          </ul>

          {/* =========================
              Desktop Actions
          ========================== */}
          <div
            className="
              hidden
              items-center
              gap-2
              lg:flex
              xl:gap-3
            "
          >
            {/* AI */}
            <AiButton onClick={() => setLoginOpen(true)} />

            {/* Hire Me */}
            <Link to="/get_in_touch">
              <button>Hire Me</button>
            </Link>

            {/* Login */}
            <button
              type="button"
              onClick={() => setLoginOpen(true)}
              className="button02"
            >
              Log In
            </button>

            {/* Dark Mode */}
            <DarkMode />
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
              items-center
              justify-center

              rounded-xl
              border
              border-gray-800

              text-2xl
              text-white

              transition-all
              duration-300

              hover:border-orange
              hover:text-orange

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

            ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <nav
            aria-label="Mobile navigation"
            className="
              mt-2
              rounded-2xl
              border
              border-gray-800
              bg-[#151515]/95
              p-3
              backdrop-blur-xl
            "
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <li key={item.title}>
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
                </li>
              ))}
            </ul>

            {/* Mobile Actions */}
            <div
              className="
                mt-4
                grid
                gap-3
                border-t
                border-gray-800
                pt-4
              "
            >
              <AiButton onClick={() => setLoginOpen(true)} />

              <Link
                to="/get_in_touch"
                onClick={closeMobileMenu}
                className="
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
                "
              >
                Hire Me
              </Link>

              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  setLoginOpen(true);
                }}
                className="
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
                "
              >
                Log In
              </button>

              <div className="flex justify-center pt-1">
                <DarkMode />
              </div>
            </div>
          </nav>
        </div>
      </Container>

      {/* Login Modal */}
      {loginOpen && <Login onClick={() => setLoginOpen(false)} />}
    </header>
  );
};

export default Header;
