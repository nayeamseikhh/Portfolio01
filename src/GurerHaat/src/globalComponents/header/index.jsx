import { Menu, X, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const Header = ({ cart = [], menuOpen, setMenuOpen, goToProducts }) => {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);

  // Supports both parent-controlled and internal mobile menu state.
  const isMenuOpen =
    typeof menuOpen === "boolean" ? menuOpen : internalMenuOpen;

  const toggleMenu = () => {
    if (typeof setMenuOpen === "function") {
      setMenuOpen(!isMenuOpen);
    } else {
      setInternalMenuOpen((prev) => !prev);
    }
  };

  const closeMenu = () => {
    if (typeof setMenuOpen === "function") {
      setMenuOpen(false);
    } else {
      setInternalMenuOpen(false);
    }
  };

  const navItems = [
    { label: "হোম", href: "#" },
    { label: "ক্যাটাগরি", href: "#categories" },
    { label: "আমাদের পণ্য", href: "#products" },
    { label: "আমাদের গল্প", href: "#story" },
  ];

  const handleOrderClick = () => {
    closeMenu();

    if (typeof goToProducts === "function") {
      goToProducts();
    } else {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCartClick = () => {
    closeMenu();
    document
      .getElementById("cart")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9ddca] bg-[#fffaf1]/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8 xl:gap-8">
        {/* Brand */}
        <a
          href="#"
          onClick={closeMenu}
          aria-label="গুড়ের হাট - হোম"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c7a66a] bg-[#f2e5ca] text-xl sm:h-12 sm:w-12 sm:text-2xl">
            🌴
          </div>

          <div className="min-w-0">
            <h1 className="font-bengali whitespace-nowrap text-lg font-extrabold leading-tight tracking-tight text-[#4c2c19] sm:text-2xl">
              গুড়ের হাট
            </h1>
            <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#92734d] sm:text-[9px] sm:tracking-[0.22em]">
              GURER HAAT
            </p>
          </div>
        </a>

        {/* Desktop and tablet navigation */}
        <nav
          aria-label="প্রধান নেভিগেশন"
          className="hidden items-center gap-4 lg:flex xl:gap-8"
        >
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap text-sm transition-colors duration-200 hover:text-[#a16c27] ${
                index === 0 ? "font-semibold text-[#4c2c19]" : "text-[#786958]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={handleCartClick}
            aria-label={`কার্ট দেখুন, ${cart.length}টি আইটেম`}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5d5bc] text-[#4c2c19] transition hover:bg-[#f4ead8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b6429] sm:h-11 sm:w-11"
          >
            <ShoppingBag size={19} aria-hidden="true" />

            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9b6429] px-1 text-[10px] font-bold text-white">
                {cart.length > 99 ? "99+" : cart.length}
              </span>
            )}
          </button>

          {/* Order button on larger screens */}
          <button
            type="button"
            onClick={handleOrderClick}
            className="hidden items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#29432d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f3523] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b6429] focus-visible:ring-offset-2 sm:flex lg:px-5"
          >
            অর্ডার করুন
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e5d5bc] text-[#4c2c19] transition hover:bg-[#f4ead8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b6429] sm:h-11 sm:w-11 lg:hidden"
          >
            {isMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive mobile navigation */}
      <div
        id="mobile-navigation"
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out lg:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav className="min-h-0 overflow-hidden border-t border-[#e9ddca] bg-[#fffaf1]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-sm transition-colors hover:bg-[#f4ead8] hover:text-[#a16c27] ${
                  index === 0
                    ? "font-semibold text-[#4c2c19]"
                    : "text-[#786958]"
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile order button */}
            <button
              type="button"
              onClick={handleOrderClick}
              className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#29432d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1f3523] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b6429] focus-visible:ring-offset-2"
            >
              অর্ডার করুন
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
