import React from "react";

const GetInTouchText = () => {
  const services = [
    "Custom Web Development Using MERN Stack",
    "Full-Stack Web Applications",
    "API Development & Integration",
    "Real-time Web Applications",
    "Database Design & Management",
    "User Authentication & Authorization",
    "Secure & Scalable Backend Solutions",
  ];

  return (
    <section className="w-full mb-10 sm:mb-12 md:mb-14 lg:mb-16 xl:mb-20">
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
        Let's build something great
      </p>

      {/* Main Heading */}
      <h2
        className="
          max-w-4xl
          font-poppins
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          xl:text-7xl
          font-bold
          leading-[1.1]
          tracking-tight
          text-white02
        "
      >
        Hi, I'm Nayeam Seikh.
        <br />
        <span
          className="
            text-white/40
            transition-colors
            duration-300
            hover:text-white/60
          "
        >
          Full MERN Stack Developer.
        </span>
      </h2>

      {/* Description */}
      <div
        className="
          mt-7
          sm:mt-8
          md:mt-10
          max-w-3xl
          font-poppins
          text-sm
          sm:text-base
          md:text-lg
          leading-7
          sm:leading-8
          text-white/60
        "
      >
        <p>
          Looking for a high-performance, modern, and scalable web solution?
          You're in the right place.
        </p>

        <p className="mt-4">
          I build responsive, secure, and scalable web applications with modern
          frontend and backend technologies, focusing on clean architecture and
          great user experiences.
        </p>
      </div>

      {/* What I Offer */}
      <div className="mt-10 sm:mt-12 md:mt-14">
        <h3
          className="
            mb-6
            font-poppins
            text-lg
            sm:text-xl
            md:text-2xl
            font-semibold
            text-white02
          "
        >
          What I Offer
        </h3>

        {/* Services */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-x-8
            gap-y-4
            md:gap-x-12
            md:gap-y-5
            max-w-5xl
          "
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="
                group
                flex
                items-start
                gap-3
                font-poppins
                text-sm
                sm:text-base
                md:text-lg
                leading-7
                text-white/55
                transition-all
                duration-300
                hover:translate-x-1
                hover:text-orange-500
              "
            >
              <span
                className="
                  mt-[10px]
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-orange
                  transition-transform
                  duration-300
                  group-hover:scale-150
                "
              />

              <span>{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom statement */}
      <p
        className="
          mt-10
          sm:mt-12
          max-w-3xl
          font-poppins
          text-sm
          sm:text-base
          md:text-lg
          leading-7
          text-white/40
        "
      >
        From idea to deployment, I help turn concepts into reliable and
        production-ready digital experiences.
      </p>
    </section>
  );
};

export default GetInTouchText;
