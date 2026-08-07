import React from "react";
import Container from "../Container";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaWhatsapp,
  FaArrowRight,
} from "react-icons/fa";

import { MdEmail, MdLocationOn } from "react-icons/md";
import FooterTopCard from "./footerTopCard";
import FooterBottom from "./footerBottom";
import FooterMiddle from "./FooterMiddle";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#121212] text-white">
      <Container>
        <div>
          {/* ================= CTA ================= */}
          <FooterTopCard />

          {/* ================= MAIN FOOTER ================= */}
          <FooterMiddle />

          {/* ================= BOTTOM FOOTER ================= */}
          <FooterBottom />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
