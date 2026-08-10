import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router";

const FooterBottom = () => {
  return (
    <>
      <section
        className="
              flex
              flex-col
              items-center
              gap-5
              py-6
              text-center
              sm:py-7
              md:flex-row
              md:justify-between
              md:text-left
            "
      >
        {/* Copyright */}
        <p className="order-3 font-poppins text-xs text-white/40 md:order-1 md:text-sm">
          © {new Date().getFullYear()} Nayeam Seikh. All Rights Reserved.
        </p>

        {/* Social Icons */}
        <div className="order-1 flex items-center justify-center gap-2.5 sm:gap-3 md:order-2">
          <a
            href="https://github.com/nayeamseikhh"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  text-white/60
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange
                  hover:bg-orange
                  hover:text-white
                  sm:h-10 sm:w-10
                "
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/nayeam-seikh/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  text-white/60
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange
                  hover:bg-orange
                  hover:text-white
                  sm:h-10 sm:w-10
                "
          >
            <FaLinkedinIn />
          </a>

          <a
            href="https://facebook.com/nayeamseikh1"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  text-white/60
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange
                  hover:bg-orange
                  hover:text-white
                  sm:h-10 sm:w-10
                "
          >
            <FaFacebookF />
          </a>

          <a
            href="https://wa.me/8801750497007"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-full
                  border border-white/10
                  bg-white/[0.03]
                  text-white/60
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange
                  hover:bg-orange
                  hover:text-white
                  sm:h-10 sm:w-10
                "
          >
            <FaWhatsapp />
          </a>
        </div>

        {/* Privacy */}
        <div
          className="
                order-2
                flex
                flex-wrap
                justify-center
                gap-4
                font-poppins
                text-xs
                text-white/40
                sm:gap-5
                md:order-3
                md:justify-end
              "
        >
          <Link to="/privacy-policy">
            <p>Privacy Policy</p>
          </Link>

          <a href="#" className="transition-colors hover:text-orange">
            Terms of Use
          </a>
        </div>
      </section>
    </>
  );
};

export default FooterBottom;
