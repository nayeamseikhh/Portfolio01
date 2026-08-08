import logo from "../../../assets/logo/logo.png";
import Container from "../../../GlobalComponents/Container";
import { FiArrowUpRight } from "react-icons/fi";

const WebSolution = () => {
  return (
    <section
      aria-labelledby="web-solution-title"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2
          h-96
          w-96
          -translate-y-1/2
          rounded-full
          bg-orange/5
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-cyan-400/5
          blur-[120px]
        "
      />

      <Container>
        <div
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-gray-800
            bg-white/[0.02]
            px-5
            py-12
            sm:px-8
            sm:py-14
            md:px-12
            lg:px-16
            lg:py-16
          "
        >
          {/* Decorative Code */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-3
              top-8
              select-none
              font-mono
              text-6xl
              font-bold
              leading-none
              text-orange/[0.08]
              sm:text-7xl
              lg:-left-5
              lg:text-8xl
            "
          >
            {"<"}
          </div>

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-4
              right-4
              select-none
              font-mono
              text-7xl
              font-bold
              leading-none
              text-orange/[0.08]
              sm:text-8xl
              lg:right-8
              lg:text-9xl
            "
          >
            {"/>"}
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            {/* Logo */}
            <div className="flex justify-center">
              <img
                src={logo}
                alt="Nayeam Seikh"
                className="
                  h-auto
                  w-28
                  object-contain
                  opacity-90
                  transition-transform
                  duration-300
                  hover:scale-105
                  sm:w-32
                "
              />
            </div>

            {/* Small Label */}
            <p
              className="
                mt-7
                font-poppins
                text-xs
                font-semibold
                uppercase
                tracking-[4px]
                text-orange
                sm:text-sm
              "
            >
              Let's build something great
            </p>

            {/* Heading */}
            <h2
              id="web-solution-title"
              className="
                mx-auto
                mt-5
                max-w-4xl
                font-poppins
                text-3xl
                font-bold
                leading-[1.1]
                tracking-tight
                text-white

                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              Professional Web Solutions for{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-orange
                  via-amber-400
                  to-orange-300
                  bg-clip-text
                  text-transparent
                "
              >
                Your Business Growth
              </span>
            </h2>

            {/* Divider */}
            <div className="mx-auto mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gray-800 sm:w-16" />

              <span className="h-1.5 w-1.5 rounded-full bg-orange" />

              <span className="h-px w-10 bg-gray-800 sm:w-16" />
            </div>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-7
                max-w-4xl
                font-poppins
                text-sm
                leading-7
                text-white/55

                sm:text-base
                sm:leading-8

                lg:text-lg
              "
            >
              I'm a{" "}
              <span className="font-semibold text-white/90">
                MERN Stack Developer
              </span>{" "}
              passionate about building high-performance, scalable, and
              responsive web applications. My expertise includes{" "}
              <span className="text-white/80">
                React.js, Node.js, Express.js, MongoDB, Redux Toolkit, Tailwind
                CSS, Firebase, REST APIs, and modern JavaScript.
              </span>{" "}
              I focus on writing clean, reusable, and maintainable code while
              creating intuitive user experiences that bring ideas to life.
              Since 2024, I've been continuously expanding my expertise by
              building real-world projects and modern web solutions.
            </p>

            {/* CTA */}
            <div className="mt-9 flex justify-center">
              <a
                href="/get_in_touch"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-orange
                  px-6
                  py-3.5
                  font-poppins
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:bg-orange/90
                  hover:shadow-[0_15px_40px_rgba(255,140,0,0.2)]

                  sm:px-7
                "
              >
                Let's Build Yours Too
                <FiArrowUpRight
                  className="
                    text-lg
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WebSolution;
