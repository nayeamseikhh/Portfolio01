import React, { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const slides = [
  {
    title: "NATURE",
    name: "MOUNTAINS",
    description:
      "Escape into majestic mountains, peaceful valleys and breathtaking landscapes shaped by nature.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "WATERFALL",
    description:
      "Feel the power and beauty of cascading water surrounded by lush forests and untouched wilderness.",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "FOREST",
    description:
      "Walk through peaceful green forests where sunlight, trees and fresh air create a magical atmosphere.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "LAKE",
    description:
      "Discover crystal-clear lakes reflecting mountains, clouds and the quiet beauty of the surrounding landscape.",
    image:
      "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "SUNSET",
    description:
      "Watch golden sunlight disappear beyond the horizon and transform the landscape into a peaceful dream.",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "OCEAN",
    description:
      "Experience the endless blue ocean, dramatic waves and peaceful coastal landscapes under an open sky.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "VALLEY",
    description:
      "Explore misty valleys surrounded by towering peaks, green hills and spectacular natural scenery.",
    image:
      "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "FLOWERS",
    description:
      "A colorful natural world filled with wildflowers, soft sunlight and beautiful seasonal landscapes.",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "MISTY HILLS",
    description:
      "Discover quiet mountain hills covered in mist, clouds and deep green forests.",
    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=2000&q=90",
  },
  {
    title: "NATURE",
    name: "RIVER",
    description:
      "Follow a peaceful river flowing through forests and mountains beneath a beautiful open sky.",
    image:
      "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=2000&q=90",
  },
];

const AUTO_PLAY = 7000;

export default function BeautifulNature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
    setAnimationKey((current) => current + 1);
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
    setAnimationKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(nextSlide, AUTO_PLAY);

    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [nextSlide, previousSlide]);

  return (
    <section className="w-full bg-white px-3 !py-30 xs:px-4 xs:py-8 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
      <div className="mx-auto w-full max-w-[1800px]">
        {/* =====================================================
            SLIDER
        ====================================================== */}
        <div
          className="
            relative
            h-[520px]
            w-full
            overflow-hidden
            rounded-[18px]
            bg-black
            shadow-[0_25px_70px_rgba(0,0,0,0.28)]
            sm:h-[580px]
            sm:rounded-[22px]
            md:h-[620px]
            md:rounded-[24px]
            lg:h-[670px]
            xl:h-[710px]
            2xl:h-[750px]
            2xl:rounded-[28px]
          "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* =================================================
              SLIDES
          ================================================== */}
          {slides.map((slide, index) => {
            const relativeIndex =
              (index - activeIndex + slides.length) % slides.length;

            const isActive = relativeIndex === 0;
            const isNext = relativeIndex === 1;
            const isNextTwo = relativeIndex === 2;
            const isNextThree = relativeIndex === 3;

            let slideClass =
              "absolute transition-all duration-1000 ease-in-out";

            if (isActive) {
              slideClass += `
                left-0
                top-0
                z-20
                h-full
                w-full
                translate-x-0
                scale-100
                opacity-100
              `;
            } else if (isNext) {
              slideClass += `
                left-[67%]
                top-[80%]
                z-30
                h-[250px]
                w-[180px]
                -translate-y-[70%]
                scale-100
                opacity-100
              `;
            } else if (isNextTwo) {
              slideClass += `
                left-[calc(67%+200px)]
                top-[80%]
                z-20
                h-[250px]
                w-[180px]
                -translate-y-[70%]
                scale-100
                opacity-100
              `;
            } else if (isNextThree) {
              slideClass += `
                left-[calc(67%+400px)]
                top-[80%]
                z-10
                h-[250px]
                w-[180px]
                -translate-y-[70%]
                scale-100
                opacity-100
              `;
            } else {
              slideClass += `
                left-[calc(67%+800px)]
                top-[80%]
                z-0
                h-[250px]
                w-[180px]
                -translate-y-[70%]
                opacity-0
              `;
            }

            return (
              <div
                key={`${slide.name}-${index}`}
                className={`${slideClass} overflow-hidden rounded-[20px] bg-cover bg-center shadow-[0_25px_50px_rgba(0,0,0,0.35)]`}
                style={{
                  backgroundImage: `url("${slide.image}")`,
                }}
              >
                {/* Dark overlay */}
                <div
                  className={`
                    absolute
                    inset-0
                    ${
                      isActive
                        ? "bg-gradient-to-r from-black/70 via-black/30 to-black/10"
                        : "bg-black/20"
                    }
                  `}
                />

                {/* =================================================
                    ACTIVE CONTENT
                ================================================== */}
                {isActive && (
                  <div
                    key={`${animationKey}-${activeIndex}`}
                    className="
                      absolute
                      left-5
                      top-1/2
                      z-30
                      w-[calc(100%-40px)]
                      -translate-y-1/2
                      text-left
                      text-white
                      sm:left-10
                      sm:w-[520px]
                      md:left-14
                      md:w-[600px]
                      lg:left-20
                      lg:w-[680px]
                      xl:left-24
                      xl:w-[720px]
                    "
                  >
                    {/* Title */}
                    <div
                      className="
                        nature-slide-title
                        text-4xl
                        font-extrabold
                        uppercase
                        leading-none
                        tracking-tight
                        text-[#14ff72]
                        drop-shadow-[0_5px_15px_rgba(0,0,0,0.45)]
                        xs:text-5xl
                        sm:text-6xl
                        md:text-7xl
                        lg:text-8xl
                      "
                    >
                      {slide.title}
                    </div>

                    {/* Name */}
                    <div
                      className="
                        nature-slide-name
                        mt-1
                        text-4xl
                        font-extrabold
                        uppercase
                        leading-none
                        tracking-tight
                        text-white
                        drop-shadow-[3px_5px_8px_rgba(0,0,0,0.65)]
                        xs:text-5xl
                        sm:text-6xl
                        md:text-7xl
                        lg:text-8xl
                      "
                    >
                      {slide.name}
                    </div>

                    {/* Description */}
                    <p
                      className="
                        nature-slide-description
                        mt-4
                        max-w-[620px]
                        text-sm
                        leading-6
                        text-white/90
                        sm:text-base
                        sm:leading-7
                        md:text-lg
                        md:leading-8
                      "
                    >
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className="nature-slide-buttons mt-5 flex flex-wrap gap-3 sm:mt-7">
                      <button
                        type="button"
                        className="
                          rounded-none
                          border-2
                          border-white
                          bg-[#14ff72]
                          px-5
                          py-2.5
                          text-sm
                          font-semibold
                          text-black
                          transition-all
                          duration-300
                          hover:bg-white
                          sm:px-6
                          sm:py-3
                          sm:text-base
                        "
                      >
                        See More
                      </button>

                      <button
                        type="button"
                        className="
                          rounded-none
                          border-2
                          border-white
                          bg-transparent
                          px-5
                          py-2.5
                          text-sm
                          font-semibold
                          text-[#14ff72]
                          transition-all
                          duration-300
                          hover:border-[#14ff72]
                          hover:bg-[#14ff72]
                          hover:text-black
                          sm:px-6
                          sm:py-3
                          sm:text-base
                        "
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* =================================================
              PREVIOUS / NEXT BUTTONS
          ================================================== */}
          <div
            className="
              absolute
              bottom-5
              left-5
              z-50
              flex
              items-center
              gap-2
              sm:bottom-8
              sm:left-8
              md:left-[42%]
              lg:left-[45%]
            "
          >
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#14ff72]
                text-black
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all
                duration-300
                hover:scale-110
                hover:bg-white
                sm:h-12
                sm:w-12
              "
            >
              <FiChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#14ff72]
                text-black
                shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                transition-all
                duration-300
                hover:scale-110
                hover:bg-white
                sm:h-12
                sm:w-12
              "
            >
              <FiChevronRight size={22} />
            </button>
          </div>

          {/* =================================================
              RUNNING TIME BAR
          ================================================== */}
          <div
            key={animationKey}
            className="
              absolute
              left-0
              top-0
              z-[100]
              h-1
              bg-[#14ff72]
            "
            style={{
              animation: isPaused
                ? "none"
                : "natureRunningTime 7s linear forwards",
              width: isPaused ? "0%" : undefined,
            }}
          />

          {/* =================================================
              SLIDE NUMBER
          ================================================== */}
          <div className="absolute bottom-5 right-5 z-50 text-xs font-semibold tracking-[0.2em] text-white/70 sm:bottom-8 sm:right-8 sm:text-sm">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* =====================================================
          COMPONENT ANIMATIONS
      ====================================================== */}
      <style>{`
        @keyframes natureContentAnimation {
          from {
            opacity: 0;
            transform: translateY(100px);
            filter: blur(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        @keyframes natureRunningTime {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }

        .nature-slide-title {
          opacity: 0;
          animation: natureContentAnimation 1s ease-in-out 0.25s forwards;
        }

        .nature-slide-name {
          opacity: 0;
          animation: natureContentAnimation 1s ease-in-out 0.5s forwards;
        }

        .nature-slide-description {
          opacity: 0;
          animation: natureContentAnimation 1s ease-in-out 0.75s forwards;
        }

        .nature-slide-buttons {
          opacity: 0;
          animation: natureContentAnimation 1s ease-in-out 1s forwards;
        }

        @media (max-width: 999px) {
          .beautiful-nature-slider {
            min-height: 580px;
          }
        }

        @media (max-width: 690px) {
          .nature-slide-title,
          .nature-slide-name {
            font-size: 45px;
          }
        }

        @media (max-width: 639px) {
          .beautiful-nature-slider .nature-preview {
            width: 145px;
            height: 200px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nature-slide-title,
          .nature-slide-name,
          .nature-slide-description,
          .nature-slide-buttons {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
