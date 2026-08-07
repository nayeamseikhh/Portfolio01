import { FaArrowRight } from "react-icons/fa";

const FooterTopCard = () => {
  return (
    <section className="w-full py-10 sm:py-12 md:py-16 font-poppins">
      {/* Main CTA Card */}
      <div
        className="
            relative
            w-full
            overflow-hidden

            rounded-2xl
            border
            border-gray-800
            bg-white/[0.02]

            px-5
            py-8

            sm:px-7
            sm:py-10

            md:px-9
            md:py-12

            lg:px-10
            lg:py-14

            transition-all
            duration-300

            hover:border-orange/50
          "
      >
        {/* Decorative circles */}
        <div
          className="
              pointer-events-none
              absolute
              -bottom-20
              -left-20

              h-40
              w-40

              rounded-full
              bg-cyan-400/10
              blur-3xl

              sm:h-52
              sm:w-52

              md:h-60
              md:w-60
            "
        />

        <div
          className="
              pointer-events-none
              absolute
              -right-20
              -top-20

              h-40
              w-40

              rounded-full
              bg-orange/5
              blur-3xl

              sm:h-52
              sm:w-52
            "
        />

        {/* Content */}
        <div
          className="
              relative
              z-10

              flex
              flex-col

              gap-8

              lg:flex-row
              lg:items-center
              lg:justify-between

              lg:gap-10
            "
        >
          {/* CTA Content */}
          <div className="w-full lg:max-w-2xl">
            <p
              className="
                  mb-3

                  font-poppins
                  text-xs
                  font-medium
                  uppercase

                  tracking-[2px]

                  text-orange

                  sm:text-sm
                  sm:tracking-[3px]
                "
            >
              Let's work together
            </p>

            <h2
              className="
                  font-poppins
                  text-2xl
                  font-bold
                  leading-tight

                  sm:text-3xl

                  md:text-4xl

                  lg:text-4xl

                  xl:text-5xl
                "
            >
              Have a project in mind?
              <br />
              <span className="text-white/60">
                Let's build something great.
              </span>
            </h2>

            <p
              className="
                  mt-4
                  max-w-xl

                  font-poppins
                  text-sm
                  leading-6

                  text-white/60

                  sm:mt-5
                  sm:leading-7

                  md:text-base
                "
            >
              I'm available for freelance projects, collaborations, and exciting
              web development opportunities.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="
                flex
                w-full
                flex-col
                gap-3

                sm:flex-row
                sm:flex-wrap

                lg:w-auto
                lg:shrink-0
              "
          >
            {/* Get In Touch */}
            <button
              className="
                  group

                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-orange

                  px-5
                  py-3

                  font-poppins
                  text-sm
                  font-semibold
                  text-white

                  transition-all
                  duration-300

                  hover:-translate-y-1

                  hover:shadow-[0_10px_30px_rgba(255,140,0,0.25)]

                  sm:w-auto
                  sm:px-6
                  sm:py-3.5
                "
            >
              Get In Touch
              <FaArrowRight
                className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-1
                  "
              />
            </button>

            {/* Download CV */}
            <button
              className="
                  w-full

                  rounded-xl

                  border
                  border-orange

                  px-5
                  py-3

                  font-poppins
                  text-sm
                  font-semibold
                  text-orange

                  transition-all
                  duration-300

                  hover:bg-orange
                  hover:text-white

                  sm:w-auto
                  sm:px-6
                  sm:py-3.5
                "
            >
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterTopCard;
