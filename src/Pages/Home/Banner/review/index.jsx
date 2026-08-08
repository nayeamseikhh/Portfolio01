import React from "react";
import Container from "../../../../GlobalComponents/Container";

const Review = () => {
  return (
    <section
      aria-labelledby="testimonial-heading"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-1/2
          h-72
          w-72
          -translate-y-1/2
          rounded-full
          bg-orange/5
          blur-[100px]
        "
      />

      <Container>
        {/* Section Header */}
        <header className="mx-auto max-w-3xl text-center" data-aos="fade-up">
          <p
            className="
              mb-3
              font-poppins
              text-xs
              font-semibold
              uppercase
              tracking-[3px]
              text-orange
              sm:text-sm
            "
          >
            Testimonial
          </p>

          <h2
            id="testimonial-heading"
            className="
              font-poppins
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-white
              sm:text-4xl
              md:text-5xl
            "
          >
            What People <span className="text-white/35">Say About Me.</span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              font-poppins
              text-sm
              leading-7
              text-white/50
              sm:text-base
              sm:leading-8
            "
          >
            A few words from people who have experienced my work, communication,
            and approach to building modern web solutions.
          </p>
        </header>

        {/* Video Card */}
        <div
          className="
            mx-auto
            mt-10
            max-w-4xl
            sm:mt-14
          "
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <article
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-gray-800
              bg-white/[0.02]
              p-2
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-orange/50
              hover:shadow-[0_20px_60px_rgba(255,140,0,0.08)]
              sm:rounded-3xl
              sm:p-3
            "
          >
            {/* Video */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black sm:rounded-2xl">
              <iframe
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                "
                src="https://www.youtube.com/embed/j-KIVHKiT2I?si=raD_mkYNVwvDyFDW"
                title="Nayeam Seikh testimonial video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default Review;
