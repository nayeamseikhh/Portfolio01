import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router";

const DesktopNavigation = ({ navLinks }) => {
  return (
    <ul
      className="
        hidden items-center gap-4
        lg:flex xl:gap-7 2xl:gap-9
      "
    >
      {navLinks.map((item) => (
        <li key={item.title} className="relative">
          {item.dropdown ? (
            <Dropdown item={item} />
          ) : (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `
                  group relative block whitespace-nowrap
                  py-2 font-poppins text-sm font-semibold
                  transition-colors duration-300 xl:text-base
                  ${isActive ? "text-orange" : "text-white01 hover:text-orange"}
                `
              }
            >
              {({ isActive }) => (
                <>
                  {item.title}

                  <span
                    className={`
                      absolute -bottom-0.5 left-0
                      h-[2px] rounded-full bg-orange
                      transition-all duration-300
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
  );
};

/* =========================================================
   DROPDOWN
========================================================= */

const Dropdown = ({ item }) => {
  return (
    <div className="group relative">
      <button
        type="button"
        className="
          flex items-center gap-1.5
          whitespace-nowrap py-2
          font-poppins text-sm font-semibold
          text-white01 transition-colors
          duration-300 hover:text-orange
          xl:text-base
        "
      >
        {item.title}

        <FiChevronDown className="text-base transition-transform duration-300 group-hover:rotate-180" />
      </button>

      <div
        className="
          invisible absolute left-1/2 top-full z-50 mt-2
          w-[min(90vw,320px)]
          -translate-x-1/2 translate-y-2
          overflow-visible rounded-2xl
          border border-white/[0.08]
          bg-[#111111]/98 p-2
          opacity-0 shadow-2xl backdrop-blur-xl
          transition-all duration-300
          group-hover:visible
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <div
          className={
            item.title === "Software"
              ? "max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain pr-1 scrollbar-thin"
              : ""
          }
        >
          {item.dropdown.map((subItem) =>
            subItem.dropdown ? (
              <NestedDropdown key={subItem.title} item={subItem} />
            ) : (
              <DropdownLink key={subItem.path} item={subItem} />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   NESTED DROPDOWN
========================================================= */

const NestedDropdown = ({ item }) => {
  return (
    <div className="group/nested relative">
      <button
        type="button"
        className="
          flex w-full items-center justify-between
          rounded-xl px-4 py-3 text-left
          font-poppins text-sm text-white01
          transition-all duration-200
          hover:bg-white/[0.05] hover:text-orange
        "
      >
        <span>{item.title}</span>

        <FiChevronRight className="text-base" />
      </button>

      <div
        className="
          invisible absolute left-full top-0 z-[100]
          w-[220px] rounded-2xl
          border border-white/[0.08]
          bg-[#111111]/98 p-2
          opacity-0 shadow-2xl
          backdrop-blur-xl
          transition-all duration-200
          group-hover/nested:visible
          group-hover/nested:opacity-100
        "
      >
        {item.dropdown.map((nestedItem) => (
          <DropdownLink key={nestedItem.path} item={nestedItem} />
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   DROPDOWN LINK
========================================================= */

const DropdownLink = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `
          block rounded-xl px-4 py-3
          font-poppins text-sm
          transition-all duration-200
          ${
            isActive
              ? "bg-orange/10 text-orange"
              : "text-white01 hover:bg-white/[0.05] hover:text-orange"
          }
        `
      }
    >
      {item.title}
    </NavLink>
  );
};

export default DesktopNavigation;
