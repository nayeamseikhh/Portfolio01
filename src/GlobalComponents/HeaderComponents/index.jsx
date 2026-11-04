import { useEffect, useState } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";

import logo from "../../assets/logo/logo.png";
import Container from "../Container";
import AiButton from "./AiButton";
import navLinks from "./navLinks";
import ProfileMenu from "./ProfileMenu";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [mobileNestedDropdownOpen, setMobileNestedDropdownOpen] =
    useState(null);

  // Firebase auth
  useEffect(() => {
    return onAuthStateChanged(auth, setCurrentUser);
  }, []);

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdownOpen(null);
    setMobileNestedDropdownOpen(null);
  };

  const toggleDropdown = (title) => {
    setMobileDropdownOpen((prev) => (prev === title ? null : title));
    setMobileNestedDropdownOpen(null);
  };

  const toggleNestedDropdown = (title) => {
    setMobileNestedDropdownOpen((prev) => (prev === title ? null : title));
  };

  // Escape + desktop resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMobileMenu();
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) closeMobileMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hireMe = (
    <Link
      to="/get_in_touch"
      onClick={closeMobileMenu}
      className="
        flex min-h-[46px] items-center justify-center
        rounded-xl bg-orange px-5 py-3
        font-poppins text-sm font-semibold text-white
        transition-all duration-300 hover:bg-orange/90
        sm:min-h-[50px] sm:text-base
      "
    >
      Hire Me
    </Link>
  );

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50 w-full
        border-b border-white/[0.06]
        bg-[#080808]/75 backdrop-blur-xl
      "
    >
      <Container>
        <nav
          aria-label="Main navigation"
          className="
            relative flex min-h-[64px] w-full items-center
            justify-between gap-3 rounded-2xl bg-white/[0.03]
            px-2 sm:min-h-[70px] sm:px-3
            lg:min-h-[76px] lg:px-4 xl:px-5
          "
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            aria-label="Nayeam Seikh - Home"
            className="flex shrink-0 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo}
              alt="Nayeam Seikh"
              className="
                block h-auto w-[88px] object-contain
                xs:w-[96px] sm:w-[105px]
                md:w-[112px] lg:w-[120px]
              "
            />
          </Link>

          {/* Desktop navigation */}
          <DesktopNavigation navLinks={navLinks} />

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
            <AiButton />
            {hireMe}
            <ProfileMenu currentUser={currentUser} />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border !border-white/10 !bg-white/[0.03]
              !text-xl !text-white transition-all duration-300
              !hover:border-orange !hover:text-orange
              sm:h-11 sm:w-11 sm:text-2xl lg:hidden
            "
          >
            {mobileOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
          </button>
        </nav>

        {/* Mobile navigation */}
        <MobileNavigation
          navLinks={navLinks}
          mobileOpen={mobileOpen}
          mobileDropdownOpen={mobileDropdownOpen}
          mobileNestedDropdownOpen={mobileNestedDropdownOpen}
          toggleMobileDropdown={toggleDropdown}
          toggleMobileNestedDropdown={toggleNestedDropdown}
          closeMobileMenu={closeMobileMenu}
        >
          <div
            className="
              mt-4 grid gap-2.5 border-t
              border-white/[0.08] pt-4 sm:gap-3
            "
          >
            <AiButton />
            {hireMe}

            <ProfileMenu
              currentUser={currentUser}
              mobile
              onCloseMobile={closeMobileMenu}
            />
          </div>
        </MobileNavigation>
      </Container>
    </header>
  );
};

export default Header;
