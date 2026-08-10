import { MdEmail, MdLocationOn } from "react-icons/md";
import logo from "../../../assets/logo/logo.png";
import { FaWhatsapp } from "react-icons/fa";

const FooterMiddle = () => {
  return (
    <>
      <section className="border-b border-white/10 pb-10 sm:pb-12">
        <div
          className="
                grid
                grid-cols-1
                gap-10
                sm:grid-cols-2
                sm:gap-x-8
                sm:gap-y-12
                lg:grid-cols-4
                lg:gap-10
                xl:gap-14
              "
        >
          {/* ================= BRAND ================= */}
          <div className="w-full">
            <img
              src={logo}
              alt="Nayeam"
              className="w-28 object-contain sm:w-32 md:w-36"
            />

            <p
              className="
                    mt-4
                    max-w-xs
                    font-poppins
                    text-sm
                    leading-6
                    text-white/50
                    sm:mt-5
                    sm:leading-7
                  "
            >
              MERN Stack Developer building modern, responsive, scalable, and
              high-performance web applications.
            </p>

            {/* Available */}
            <div className="mt-5 flex items-center gap-2 sm:mt-6">
              <span className="relative flex h-3 w-3 shrink-0">
                <span
                  className="
                        absolute
                        inline-flex
                        h-full
                        w-full
                        animate-ping
                        rounded-full
                        bg-green-500
                        opacity-75
                      "
                />

                <span
                  className="
                        relative
                        inline-flex
                        h-3
                        w-3
                        rounded-full
                        bg-green-500
                      "
                />
              </span>

              <span className="font-poppins text-xs text-green-400 sm:text-sm">
                Available for work
              </span>
            </div>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="w-full">
            <h3 className="mb-5 font-poppins text-base font-semibold sm:mb-6 sm:text-lg">
              Quick Links
            </h3>

            <ul className="space-y-3 font-poppins text-sm text-white/50 sm:space-y-4">
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 hover:text-orange"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/skills"
                  className="transition-colors duration-300 hover:text-orange"
                >
                  My Skills
                </a>
              </li>

              <li>
                <a
                  href="/project_plan"
                  className="transition-colors duration-300 hover:text-orange"
                >
                  Project Plan
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="transition-colors duration-300 hover:text-orange"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="transition-colors duration-300 hover:text-orange"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* ================= TECHNOLOGIES ================= */}
          <div className="w-full">
            <h3 className="mb-5 font-poppins text-base font-semibold sm:mb-6 sm:text-lg">
              Technologies
            </h3>

            <ul className="space-y-3 font-poppins text-sm text-white/50 sm:space-y-4">
              <li className="transition-colors hover:text-orange">React.js</li>

              <li className="transition-colors hover:text-orange">Node.js</li>

              <li className="transition-colors hover:text-orange">
                Express.js
              </li>

              <li className="transition-colors hover:text-orange">MongoDB</li>

              <li className="transition-colors hover:text-orange">
                Tailwind CSS
              </li>

              <li className="transition-colors hover:text-orange">
                AI Integration
              </li>
            </ul>
          </div>

          {/* ================= CONTACT ================= */}
          <div className="w-full min-w-0">
            <h3 className="mb-5 font-poppins text-base font-semibold sm:mb-6 sm:text-lg">
              Contact
            </h3>

            <div className="space-y-5">
              {/* Email */}
              <a
                href="mailto:your@email.com"
                className="group flex min-w-0 items-start gap-3"
              >
                <MdEmail
                  className="
                        mt-1
                        shrink-0
                        text-xl
                        text-orange
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                />

                <div className="min-w-0">
                  <p className="text-xs text-white/40">Email</p>

                  <p
                    className="
                          mt-1
                          break-all
                          font-poppins
                          text-sm
                          text-white/70
                          transition-colors
                          group-hover:text-orange
                        "
                  >
                    your@email.com
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MdLocationOn className="mt-1 shrink-0 text-xl text-orange" />

                <div>
                  <p className="text-xs text-white/40">Location</p>

                  <p className="mt-1 font-poppins text-sm text-white/70">
                    Bangladesh
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801750497007"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-3"
              >
                <FaWhatsapp
                  className="
                        mt-1
                        shrink-0
                        text-xl
                        text-orange
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                />

                <div>
                  <p className="text-xs text-white/40">WhatsApp</p>

                  <p
                    className="
                          mt-1
                          font-poppins
                          text-sm
                          text-white/70
                          transition-colors
                          group-hover:text-orange
                        "
                  >
                    Let's Chat
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterMiddle;
