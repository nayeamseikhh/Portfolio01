import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router";

const MobileNavigation = ({
  navLinks,
  mobileOpen,
  mobileDropdownOpen,
  mobileNestedDropdownOpen,
  toggleMobileDropdown,
  toggleMobileNestedDropdown,
  closeMobileMenu,
  children,
}) => {
  return (
    <div
      id="mobile-navigation"
      className={`
        lg:hidden overflow-hidden transition-all duration-300
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
          mt-2 overflow-hidden rounded-2xl
          border border-white/[0.08]
          bg-[#111111]/98
          shadow-2xl backdrop-blur-xl
        "
      >
        <div
          className="
            max-h-[calc(100dvh-90px)]
            overflow-y-auto overflow-x-hidden
            overscroll-contain
            p-3 sm:p-4
          "
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <MobileItem
                key={item.title}
                item={item}
                mobileDropdownOpen={mobileDropdownOpen}
                mobileNestedDropdownOpen={mobileNestedDropdownOpen}
                toggleMobileDropdown={toggleMobileDropdown}
                toggleMobileNestedDropdown={toggleMobileNestedDropdown}
                closeMobileMenu={closeMobileMenu}
              />
            ))}
          </ul>

          {children}
        </div>
      </nav>
    </div>
  );
};

/* =========================================================
   MOBILE ITEM
========================================================= */

const MobileItem = ({
  item,
  mobileDropdownOpen,
  mobileNestedDropdownOpen,
  toggleMobileDropdown,
  toggleMobileNestedDropdown,
  closeMobileMenu,
}) => {
  if (!item.dropdown) {
    return (
      <li>
        <NavLink
          to={item.path}
          onClick={closeMobileMenu}
          className={({ isActive }) =>
            `
              block rounded-xl px-4 py-3
              font-poppins text-sm font-medium
              transition-all duration-300
              sm:py-3.5 sm:text-base
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
    );
  }

  const isOpen = mobileDropdownOpen === item.title;

  return (
    <li>
      <button
        type="button"
        onClick={() => toggleMobileDropdown(item.title)}
        className="
          flex w-full items-center justify-between
          rounded-xl px-4 py-3 text-left
          font-poppins text-sm font-medium
          text-white01 transition-all duration-300
          hover:bg-white/[0.04] hover:text-orange
          sm:py-3.5 sm:text-base
        "
      >
        <span>{item.title}</span>

        <FiChevronDown
          className={`
            text-lg transition-transform duration-300
            ${isOpen ? "rotate-180 text-orange" : ""}
          `}
        />
      </button>

      <div
        className={`
          grid transition-[grid-template-rows,opacity]
          duration-300 ease-in-out
          ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-1 space-y-1 rounded-xl bg-white/[0.02] p-1">
            {item.dropdown.map((subItem) =>
              subItem.dropdown ? (
                <NestedMobileItem
                  key={subItem.title}
                  item={subItem}
                  mobileNestedDropdownOpen={mobileNestedDropdownOpen}
                  toggleMobileNestedDropdown={toggleMobileNestedDropdown}
                  closeMobileMenu={closeMobileMenu}
                />
              ) : (
                <MobileLink
                  key={subItem.path}
                  item={subItem}
                  closeMobileMenu={closeMobileMenu}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

/* =========================================================
   NESTED MOBILE ITEM
========================================================= */

const NestedMobileItem = ({
  item,
  mobileNestedDropdownOpen,
  toggleMobileNestedDropdown,
  closeMobileMenu,
}) => {
  const isOpen = mobileNestedDropdownOpen === item.title;

  return (
    <div>
      <button
        type="button"
        onClick={() => toggleMobileNestedDropdown(item.title)}
        className="
          flex w-full items-center justify-between
          rounded-lg px-4 py-2.5 text-left
          font-poppins text-sm text-gray-300
          transition-all duration-200
          hover:bg-white/[0.04] hover:text-orange
        "
      >
        <span>{item.title}</span>

        <FiChevronRight
          className={`
            text-base transition-transform duration-200
            ${isOpen ? "rotate-90 text-orange" : ""}
          `}
        />
      </button>

      <div
        className={`
          grid transition-[grid-template-rows,opacity]
          duration-300 ease-in-out
          ${
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="ml-3 mt-1 space-y-1 border-l border-white/[0.08] pl-2">
            {item.dropdown.map((nestedItem) => (
              <MobileLink
                key={nestedItem.path}
                item={nestedItem}
                closeMobileMenu={closeMobileMenu}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   MOBILE LINK
========================================================= */

const MobileLink = ({ item, closeMobileMenu }) => {
  return (
    <NavLink
      to={item.path}
      onClick={closeMobileMenu}
      className={({ isActive }) =>
        `
          block rounded-lg px-4 py-2.5
          font-poppins text-sm
          transition-all duration-200
          ${
            isActive
              ? "bg-orange/10 text-orange"
              : "text-gray-300 hover:bg-white/[0.04] hover:text-orange"
          }
        `
      }
    >
      {item.title}
    </NavLink>
  );
};

export default MobileNavigation;
