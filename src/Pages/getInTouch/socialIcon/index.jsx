import React from "react";
import { BsLinkedin, BsPinterest } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { RiFacebookCircleLine } from "react-icons/ri";
import { SiGithub } from "react-icons/si";

const SocialIcon = ({ contact }) => {
  const socials = [
    {
      id: 1,
      icon: <FaXTwitter />,
      label: "X",
      url: "https://x.com/nayeamseikh",
    },
    {
      id: 2,
      icon: <RiFacebookCircleLine />,
      label: "Facebook",
      url:
        contact?.socials?.facebook || "https://www.facebook.com/nayeamseikh1/",
    },
    {
      id: 3,
      icon: <IoLogoInstagram />,
      label: "Instagram",
      url: "",
    },
    {
      id: 4,
      icon: <BsPinterest />,
      label: "Pinterest",
      url: "https://www.pinterest.com/",
    },
    {
      id: 5,
      icon: <SiGithub />,
      label: "GitHub",
      url: contact?.socials?.github || "https://github.com/nayeamseikhh",
    },
    {
      id: 6,
      icon: <BsLinkedin />,
      label: "LinkedIn",
      url:
        contact?.socials?.linkedin ||
        "https://www.linkedin.com/in/nayeam-seikh/",
    },
  ];

  return (
    <div className="w-full">
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-3
          sm:gap-4
        "
      >
        {socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="
              group
              flex
              h-11
              w-11
              sm:h-12
              sm:w-12
              items-center
              justify-center
              rounded-full
              border
              border-gray-800
              bg-white/[0.03]
              text-white/70

              transition-all
              duration-300
              ease-in-out

              hover:-translate-y-1
              hover:border-orange
              hover:bg-orange/10
              hover:text-orange
              hover:shadow-[0_8px_25px_rgba(255,140,0,0.15)]
            "
          >
            <span
              className="
                text-lg
                sm:text-xl
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              {social.icon}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialIcon;
