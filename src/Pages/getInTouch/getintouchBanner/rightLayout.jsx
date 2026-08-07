import React from "react";
import { MdLocationPin, MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { RiTelegram2Fill } from "react-icons/ri";
import SocialIcon from "../socialIcon";

const RightLayout = () => {
  return (
    <div className="w-full">
      {/* Small Heading */}
      <p
        className="
          mb-4
          font-poppins
          text-xs
          sm:text-sm
          font-medium
          uppercase
          tracking-[2px]
          sm:tracking-[3px]
          text-orange
        "
      >
        Get in touch
      </p>

      {/* Main Heading */}
      <h2
        className="
          font-poppins
          text-3xl
          sm:text-4xl
          md:text-5xl
          font-bold
          leading-tight
          tracking-tight
          text-white02
        "
      >
        Let's talk.
        <br />
        <span className="text-white/40">I'm always open to new ideas.</span>
      </h2>

      {/* Description */}
      <p
        className="
          mt-5
          sm:mt-6
          max-w-xl
          font-poppins
          text-sm
          sm:text-base
          md:text-lg
          leading-7
          sm:leading-8
          text-white/55
        "
      >
        Have a project, idea, or collaboration in mind? Feel free to reach out.
        I'm available for freelance projects, web development opportunities, and
        exciting collaborations.
      </p>

      {/* Contact Information */}
      <div className="mt-8 sm:mt-10 space-y-5">
        {/* Address */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=Rajshahi,Bangladesh"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-center
            gap-4
            transition-all
            duration-300
            hover:translate-x-1
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/[0.04]
              border
              border-gray-800
              transition-all
              duration-300
              group-hover:border-orange
              group-hover:bg-orange/10
            "
          >
            <MdLocationPin className="text-xl text-orange" />
          </div>

          <div>
            <p
              className="
                font-poppins
                text-xs
                uppercase
                tracking-wider
                text-white/40
              "
            >
              Location
            </p>

            <p
              className="
                mt-1
                font-poppins
                text-sm
                sm:text-base
                font-medium
                text-white/80
                transition-colors
                duration-300
                group-hover:text-orange
              "
            >
              Rajshahi, Bangladesh
            </p>
          </div>
        </a>

        {/* Phone */}
        <a
          href="tel:+8801750497007"
          className="
            group
            flex
            items-center
            gap-4
            transition-all
            duration-300
            hover:translate-x-1
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/[0.04]
              border
              border-gray-800
              transition-all
              duration-300
              group-hover:border-orange
              group-hover:bg-orange/10
            "
          >
            <FaPhoneAlt className="text-base text-orange" />
          </div>

          <div>
            <p
              className="
                font-poppins
                text-xs
                uppercase
                tracking-wider
                text-white/40
              "
            >
              Phone
            </p>

            <p
              className="
                mt-1
                font-poppins
                text-sm
                sm:text-base
                font-medium
                text-white/80
                transition-colors
                duration-300
                group-hover:text-orange
              "
            >
              +880 1750 497007
            </p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:nayeamseikh1@gmail.com"
          className="
            group
            flex
            items-center
            gap-4
            transition-all
            duration-300
            hover:translate-x-1
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/[0.04]
              border
              border-gray-800
              transition-all
              duration-300
              group-hover:border-orange
              group-hover:bg-orange/10
            "
          >
            <MdOutlineMail className="text-xl text-orange" />
          </div>

          <div className="min-w-0">
            <p
              className="
                font-poppins
                text-xs
                uppercase
                tracking-wider
                text-white/40
              "
            >
              Email
            </p>

            <p
              className="
                mt-1
                break-all
                font-poppins
                text-sm
                sm:text-base
                font-medium
                text-white/80
                transition-colors
                duration-300
                group-hover:text-orange
              "
            >
              nayeamseikh1@gmail.com
            </p>
          </div>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/8801750497007"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-center
            gap-4
            transition-all
            duration-300
            hover:translate-x-1
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/[0.04]
              border
              border-gray-800
              transition-all
              duration-300
              group-hover:border-orange
              group-hover:bg-orange/10
            "
          >
            <FaWhatsapp className="text-xl text-orange" />
          </div>

          <div>
            <p
              className="
                font-poppins
                text-xs
                uppercase
                tracking-wider
                text-white/40
              "
            >
              WhatsApp
            </p>

            <p
              className="
                mt-1
                font-poppins
                text-sm
                sm:text-base
                font-medium
                text-white/80
                transition-colors
                duration-300
                group-hover:text-orange
              "
            >
              +880 1750 497007
            </p>
          </div>
        </a>

        {/* Telegram */}
        <a
          href="https://t.me/nayeamseikh1"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            items-center
            gap-4
            transition-all
            duration-300
            hover:translate-x-1
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white/[0.04]
              border
              border-gray-800
              transition-all
              duration-300
              group-hover:border-orange
              group-hover:bg-orange/10
            "
          >
            <RiTelegram2Fill className="text-xl text-orange" />
          </div>

          <div>
            <p
              className="
                font-poppins
                text-xs
                uppercase
                tracking-wider
                text-white/40
              "
            >
              Telegram
            </p>

            <p
              className="
                mt-1
                font-poppins
                text-sm
                sm:text-base
                font-medium
                text-white/80
                transition-colors
                duration-300
                group-hover:text-orange
              "
            >
              @nayeamseikh1
            </p>
          </div>
        </a>
      </div>

      {/* Social */}
      <div
        className="
          mt-9
          sm:mt-10
          border-t
          border-gray-800
          pt-7
          sm:pt-8
        "
      >
        <p
          className="
            mb-4
            font-poppins
            text-xs
            uppercase
            tracking-[2px]
            text-white/40
          "
        >
          Follow me
        </p>

        <SocialIcon />
      </div>
    </div>
  );
};

export default RightLayout;
