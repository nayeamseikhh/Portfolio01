import { Phone, MapPin } from "lucide-react";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full overflow-hidden bg-[#1d3022] text-[#f7ead4]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:px-8 sm:py-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr] lg:gap-8 lg:px-10 lg:py-14">
        {/* Brand */}
        <div className="min-w-0">
          <a href="#" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4b86b] text-2xl sm:h-12 sm:w-12">
              🌴
            </div>

            <div>
              <h2 className="font-bengali text-xl font-extrabold sm:text-2xl">
                গুড়ের হাট
              </h2>
              <p className="mt-1 text-[9px] tracking-[0.2em] text-[#d4b782]">
                GURER HAAT
              </p>
            </div>
          </a>

          <p className="mt-4 max-w-sm font-bengali text-sm leading-7 text-white/65 sm:mt-5 text-xs sm:text-sm">
            খাঁটি স্বাদের দেশি ঠিকানা। বাংলার ঐতিহ্যকে ভালোবেসে, আপনার পরিবারের
            জন্য শীতের মিষ্টি স্বাদের আয়োজন।
          </p>

          <p className="mt-4 text-xs text-[#e4b86b] sm:text-sm">
            Founded by Nayeam Sheikh
          </p>
        </div>

        {/* Quick Links */}
        <div className="min-w-0">
          <h3 className="font-bengali text-base font-bold sm:text-lg">
            দ্রুত লিংক
          </h3>

          <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5">
            <a
              className="block min-h-10 text-sm sm:text-base transition-colors hover:text-[#e4b86b] hover:underline"
              href="#"
            >
              হোম
            </a>
            <a
              className="block min-h-10 text-sm sm:text-base transition-colors hover:text-[#e4b86b] hover:underline"
              href="#categories"
            >
              ক্যাটাগরি
            </a>
            <a
              className="block min-h-10 text-sm sm:text-base transition-colors hover:text-[#e4b86b] hover:underline"
              href="#products"
            >
              আমাদের পণ্য
            </a>
            <a
              className="block min-h-10 text-sm sm:text-base transition-colors hover:text-[#e4b86b] hover:underline"
              href="#story"
            >
              আমাদের গল্প
            </a>
          </div>
        </div>

        {/* Products */}
        <div className="min-w-0">
          <h3 className="font-bengali text-base font-bold sm:text-lg">
            আমাদের পণ্য
          </h3>

          <div className="mt-4 flex flex-col items-start gap-3 sm:mt-5">
            <a
              className="font-bengali block min-h-10 text-sm sm:text-base transition-colors hover:text-[#e4b86b] hover:underline"
              href="#products"
            >
              ঝোলা খেজুরের গুড়
            </a>
            <a
              className="font-bengali block min-h-10 text-sm sm:text-base transition-colors hover:text-[#e4b86b] hover:underline"
              href="#products"
            >
              পাটালি গুড়
            </a>
            <a
              className="font-bengali block min-h-10 text-sm sm:text-base transition-colors hover:text-[#e4b86b] hover:underline"
              href="#products"
            >
              দানাদার গুড়
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="min-w-0">
          <h3 className="font-bengali text-base font-bold sm:text-lg">
            যোগাযোগ
          </h3>

          <div className="mt-4 space-y-4 sm:mt-5">
            <p className="flex items-start gap-3 text-sm sm:text-base">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[#e4b86b]" />
              <span className="break-words">Rajshahi-বাংলাদেশ</span>
            </p>

            <p className="flex items-start gap-3 text-sm sm:text-base">
              <Phone size={18} className="mt-0.5 shrink-0 text-[#e4b86b]" />
              <span className="font-bengali break-words">01750497007</span>
            </p>

            <div className="flex flex-wrap gap-3 pt-1 sm:pt-2">
              <a
                href="https://www.facebook.com/profile.php?id=61595115760608"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#e4b86b] hover:bg-white/10 hover:text-[#e4b86b]"
              >
                <FaFacebook size={17} />
              </a>

              <a
                href="https://www.instagram.com/nayeamseikh/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-[#e4b86b] hover:bg-white/10 hover:text-[#e4b86b]"
              >
                <FaInstagram size={17} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 px-4 py-6 text-center text-xs leading-6 text-white/50 sm:px-6 sm:py-8">
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()} Gurer Haat. All rights reserved.
        </p>

        <p className="mt-1 text-xs sm:text-sm">
          <span className="text-[#e4b86b]">Made with love</span> in Bangladesh
          🇧🇩
        </p>
      </div>
    </footer>
  );
};

export default Footer;
