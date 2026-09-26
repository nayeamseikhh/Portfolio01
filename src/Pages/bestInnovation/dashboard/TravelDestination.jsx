import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";

/* ========================================================================
   CONSTANTS
======================================================================== */

const SLIDE_DURATION = 6000;
const TRANSITION_DURATION = 900;

/* ========================================================================
   UNSPLASH IMAGE
======================================================================== */

const unsplash = (photoId, width = 1200) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=88`;

/* ========================================================================
   TRAVEL IMAGE POOL
======================================================================== */

const travelImages = [
  "photo-1500534623283-312aade485b7",
  "photo-1493976040374-85c8e12f0c0e",
  "photo-1537996194471-e657df975ab4",
  "photo-1507525428034-b723cf961d3e",
  "photo-1469521669194-babb45599def",
  "photo-1506905925346-21bda4d32df4",
  "photo-1501785888041-af3ef285b470",
  "photo-1470770841072-f978cf4d019e",
  "photo-1521292270410-a8c4d716d518",
  "photo-1527668752968-14dc70a27c95",
  "photo-1516483638261-f4dbaf036963",
  "photo-1533104816931-20fa691ff6ca",
  "photo-1570077188670-e3a8d69ac5ff",
  "photo-1503614472-8c93d56e92ce",
  "photo-1544735716-392fe2489ffa",
  "photo-1502602898657-3e91760cbb34",
  "photo-1539037116277-4db20889f2d4",
  "photo-1555881400-74d7acaacd8b",
  "photo-1506973035872-a4ec16b8e8d7",
  "photo-1523482580672-f109ba8cb9be",
];

/* ========================================================================
   50 DESTINATIONS
======================================================================== */

const destinationInfo = [
  {
    country: "Iceland",
    city: "Reykjavík",
    title: "Iceland",
    description:
      "Discover dramatic waterfalls, volcanic landscapes, glaciers, and unforgettable northern lights.",
    hero: "photo-1500534623283-312aade485b7",
  },
  {
    country: "Norway",
    city: "Lofoten",
    title: "Norway",
    description:
      "Explore breathtaking fjords, colorful villages, mountains, and Arctic landscapes.",
    hero: "photo-1506905925346-21bda4d32df4",
  },
  {
    country: "Switzerland",
    city: "Interlaken",
    title: "Switzerland",
    description:
      "Experience crystal lakes, alpine villages, dramatic peaks, and beautiful mountain railways.",
    hero: "photo-1469521669194-babb45599def",
  },
  {
    country: "Japan",
    city: "Kyoto",
    title: "Japan",
    description:
      "Walk through ancient temples, peaceful gardens, vibrant streets, and traditional neighborhoods.",
    hero: "photo-1493976040374-85c8e12f0c0e",
  },
  {
    country: "Indonesia",
    city: "Bali",
    title: "Bali",
    description:
      "Relax among tropical beaches, rice terraces, temples, waterfalls, and lush jungle.",
    hero: "photo-1537996194471-e657df975ab4",
  },
  {
    country: "New Zealand",
    city: "Queenstown",
    title: "New Zealand",
    description:
      "Discover spectacular mountains, turquoise lakes, forests, and unforgettable outdoor adventures.",
    hero: "photo-1501785888041-af3ef285b470",
  },
  {
    country: "Italy",
    city: "Amalfi",
    title: "Italy",
    description:
      "Enjoy Mediterranean coastlines, historic towns, incredible food, and timeless architecture.",
    hero: "photo-1516483638261-f4dbaf036963",
  },
  {
    country: "Greece",
    city: "Santorini",
    title: "Greece",
    description:
      "Experience whitewashed villages, blue domes, volcanic cliffs, and spectacular sunsets.",
    hero: "photo-1533104816931-20fa691ff6ca",
  },
  {
    country: "Canada",
    city: "Banff",
    title: "Canada",
    description:
      "Explore turquoise alpine lakes, rugged mountains, forests, and spectacular wilderness.",
    hero: "photo-1503614472-8c93d56e92ce",
  },
  {
    country: "Nepal",
    city: "Kathmandu",
    title: "Nepal",
    description:
      "Discover Himalayan adventures, ancient temples, mountain villages, and incredible landscapes.",
    hero: "photo-1544735716-392fe2489ffa",
  },
  {
    country: "France",
    city: "Paris",
    title: "France",
    description:
      "Experience iconic architecture, charming streets, museums, cafés, and romantic evenings.",
    hero: "photo-1502602898657-3e91760cbb34",
  },
  {
    country: "Spain",
    city: "Barcelona",
    title: "Spain",
    description:
      "Explore colorful architecture, Mediterranean beaches, lively neighborhoods, and world-class cuisine.",
    hero: "photo-1539037116277-4db20889f2d4",
  },
  {
    country: "Portugal",
    city: "Lisbon",
    title: "Portugal",
    description:
      "Discover historic streets, ocean views, colorful buildings, and beautiful coastal landscapes.",
    hero: "photo-1555881400-74d7acaacd8b",
  },
  {
    country: "Australia",
    city: "Sydney",
    title: "Australia",
    description:
      "Explore iconic harbors, golden beaches, vibrant cities, and spectacular coastal scenery.",
    hero: "photo-1506973035872-a4ec16b8e8d7",
  },
  {
    country: "Thailand",
    city: "Phuket",
    title: "Thailand",
    description:
      "Relax on tropical islands, explore vibrant markets, and discover beautiful temples.",
    hero: "photo-1507525428034-b723cf961d3e",
  },
  {
    country: "Vietnam",
    city: "Ha Long Bay",
    title: "Vietnam",
    description:
      "Cruise among limestone islands, explore ancient towns, and experience incredible local culture.",
    hero: "photo-1527668752968-14dc70a27c95",
  },
  {
    country: "Malaysia",
    city: "Kuala Lumpur",
    title: "Malaysia",
    description:
      "Discover modern skylines, tropical forests, colorful markets, and diverse cultural experiences.",
    hero: "photo-1523482580672-f109ba8cb9be",
  },
  {
    country: "Singapore",
    city: "Singapore",
    title: "Singapore",
    description:
      "Experience futuristic architecture, lush gardens, waterfront views, and incredible food.",
    hero: "photo-1521292270410-a8c4d716d518",
  },
  {
    country: "UAE",
    city: "Dubai",
    title: "Dubai",
    description:
      "Explore futuristic skyscrapers, desert landscapes, luxury experiences, and vibrant nightlife.",
    hero: "photo-1518684079-3c830dcef090",
  },
  {
    country: "Egypt",
    city: "Cairo",
    title: "Egypt",
    description:
      "Step into ancient history with pyramids, temples, deserts, and the timeless Nile River.",
    hero: "photo-1568322445389-f64ac2515020",
  },
  {
    country: "Morocco",
    city: "Marrakech",
    title: "Morocco",
    description:
      "Wander through colorful souks, ancient medinas, desert landscapes, and beautiful riads.",
    hero: "photo-1548013146-72479768bada",
  },
  {
    country: "South Africa",
    city: "Cape Town",
    title: "South Africa",
    description:
      "Discover dramatic coastlines, Table Mountain, vineyards, beaches, and unforgettable wildlife.",
    hero: "photo-1580060839134-75a5edca2e99",
  },
  {
    country: "Tanzania",
    city: "Zanzibar",
    title: "Tanzania",
    description:
      "Escape to turquoise waters, white beaches, historic Stone Town, and tropical island life.",
    hero: "photo-1516026672322-bc52d61a55d5",
  },
  {
    country: "Kenya",
    city: "Maasai Mara",
    title: "Kenya",
    description:
      "Experience extraordinary wildlife, endless savannahs, and unforgettable African sunsets.",
    hero: "photo-1516426122078-c23e76319801",
  },
  {
    country: "United States",
    city: "New York",
    title: "New York",
    description:
      "Explore iconic skyscrapers, Central Park, famous neighborhoods, museums, and endless city energy.",
    hero: "photo-1485871981521-5b1fd3805eee",
  },
  {
    country: "United States",
    city: "Grand Canyon",
    title: "Grand Canyon",
    description:
      "Witness enormous canyon walls, dramatic sunsets, and one of America's greatest natural wonders.",
    hero: "photo-1474044159687-1ee9f3a51722",
  },
  {
    country: "Mexico",
    city: "Tulum",
    title: "Mexico",
    description:
      "Enjoy Caribbean beaches, ancient ruins, cenotes, tropical jungle, and vibrant culture.",
    hero: "photo-1510414842594-a61c69b5ae57",
  },
  {
    country: "Peru",
    city: "Machu Picchu",
    title: "Peru",
    description:
      "Journey through the Andes to ancient ruins surrounded by spectacular mountain scenery.",
    hero: "photo-1526392060635-9d6019884377",
  },
  {
    country: "Brazil",
    city: "Rio de Janeiro",
    title: "Brazil",
    description:
      "Discover dramatic mountains, famous beaches, lively streets, and breathtaking ocean views.",
    hero: "photo-1483729558449-99ef09a8c325",
  },
  {
    country: "Argentina",
    city: "Patagonia",
    title: "Argentina",
    description:
      "Explore glaciers, rugged peaks, turquoise lakes, and some of the world's most remote landscapes.",
    hero: "photo-1530789253388-582c481c54b0",
  },
  {
    country: "Chile",
    city: "Torres del Paine",
    title: "Chile",
    description:
      "Experience dramatic granite peaks, glaciers, lakes, and wild Patagonian landscapes.",
    hero: "photo-1464822759023-fed622ff2c3b",
  },
  {
    country: "Scotland",
    city: "Edinburgh",
    title: "Scotland",
    description:
      "Discover historic castles, misty mountains, dramatic coastlines, and charming old streets.",
    hero: "photo-1506377585622-bedcbb027afc",
  },
  {
    country: "Ireland",
    city: "Cliffs of Moher",
    title: "Ireland",
    description:
      "Explore dramatic cliffs, green countryside, coastal roads, and peaceful villages.",
    hero: "photo-1501594907352-04cda38ebc29",
  },
  {
    country: "Turkey",
    city: "Cappadocia",
    title: "Turkey",
    description:
      "Watch hot-air balloons float above unique rock formations, valleys, and ancient cave settlements.",
    hero: "photo-1524231757912-21f4fe3a7200",
  },
  {
    country: "Croatia",
    city: "Dubrovnik",
    title: "Croatia",
    description:
      "Walk along ancient city walls while enjoying sparkling Adriatic waters and historic architecture.",
    hero: "photo-1555990538-1e7e6b6b4e8c",
  },
  {
    country: "Austria",
    city: "Hallstatt",
    title: "Austria",
    description:
      "Discover a peaceful alpine village surrounded by mountains, forests, and a beautiful lake.",
    hero: "photo-1516550893923-42d28e5677af",
  },
  {
    country: "Finland",
    city: "Lapland",
    title: "Finland",
    description:
      "Experience snowy forests, cozy cabins, Arctic adventures, and magical northern lights.",
    hero: "photo-1519681393784-d120267933ba",
  },
  {
    country: "Sweden",
    city: "Stockholm",
    title: "Sweden",
    description:
      "Explore elegant Scandinavian streets, islands, waterways, museums, and modern design.",
    hero: "photo-1509356843151-3e7d96241e11",
  },
  {
    country: "Germany",
    city: "Bavaria",
    title: "Germany",
    description:
      "Discover fairytale castles, alpine villages, forests, lakes, and traditional Bavarian culture.",
    hero: "photo-1467269204594-9661b134dd2b",
  },
  {
    country: "Netherlands",
    city: "Amsterdam",
    title: "Netherlands",
    description:
      "Cruise along peaceful canals and discover colorful streets, museums, bridges, and cycling culture.",
    hero: "photo-1534351590666-13e3e96b5017",
  },
  {
    country: "Czech Republic",
    city: "Prague",
    title: "Prague",
    description:
      "Explore medieval streets, beautiful bridges, historic squares, and remarkable European architecture.",
    hero: "photo-1519671282429-b44660ead0a7",
  },
  {
    country: "Iceland",
    city: "Vík",
    title: "Vík",
    description:
      "Discover black sand beaches, dramatic cliffs, waterfalls, glaciers, and wild Icelandic scenery.",
    hero: "photo-1464278533981-50106e6176b1",
  },
  {
    country: "Philippines",
    city: "Palawan",
    title: "Philippines",
    description:
      "Escape to crystal-clear lagoons, limestone cliffs, tropical islands, and pristine beaches.",
    hero: "photo-1518509562904-e7ef99cdcc86",
  },
  {
    country: "Maldives",
    city: "Malé",
    title: "Maldives",
    description:
      "Relax above turquoise lagoons with white sand beaches, coral reefs, and peaceful island views.",
    hero: "photo-1514282401047-d79a71a590e8",
  },
  {
    country: "Bhutan",
    city: "Paro",
    title: "Bhutan",
    description:
      "Discover Himalayan valleys, ancient monasteries, peaceful villages, and spectacular mountain scenery.",
    hero: "photo-1544735716-392fe2489ffa",
  },
  {
    country: "Bangladesh",
    city: "Cox's Bazar",
    title: "Cox's Bazar",
    description:
      "Enjoy one of the world's longest natural sea beaches with golden sand and beautiful coastal sunsets.",
    hero: "photo-1507525428034-b723cf961d3e",
  },
  {
    country: "Bangladesh",
    city: "Sundarbans",
    title: "Sundarbans",
    description:
      "Explore the world's largest mangrove forest with waterways, wildlife, and unique natural beauty.",
    hero: "photo-1441974231531-c6227db76b6e",
  },
  {
    country: "Bangladesh",
    city: "Sajek Valley",
    title: "Sajek",
    description:
      "Experience rolling green hills, clouds, peaceful valleys, and spectacular sunrise views.",
    hero: "photo-1500534623283-312aade485b7",
  },
  {
    country: "Bangladesh",
    city: "Sylhet",
    title: "Sylhet",
    description:
      "Discover tea gardens, green hills, rivers, waterfalls, and the peaceful beauty of northeastern Bangladesh.",
    hero: "photo-1470770841072-f978cf4d019e",
  },
  {
    country: "Switzerland",
    city: "Zermatt",
    title: "Zermatt",
    description:
      "Explore an iconic alpine village beneath the Matterhorn with breathtaking mountain views.",
    hero: "photo-1527668752968-14dc70a27c95",
  },
];

/* ========================================================================
   BUILD DESTINATIONS SAFELY
======================================================================== */

const destinations = destinationInfo
  .filter(
    (destination) =>
      destination &&
      destination.country &&
      destination.city &&
      destination.title,
  )
  .map((destination, index) => {
    const cardImages = [
      travelImages[(index * 3) % travelImages.length],
      travelImages[(index * 3 + 1) % travelImages.length],
      travelImages[(index * 3 + 2) % travelImages.length],
    ];

    return {
      id: index + 1,

      country: destination.country,

      city: destination.city,

      title: destination.title,

      description:
        destination.description ||
        `Discover the beauty, culture, landscapes, and unforgettable experiences of ${destination.city}.`,

      heroImage: destination.hero
        ? unsplash(destination.hero, 2200)
        : unsplash(travelImages[index % travelImages.length], 2200),

      cards: cardImages.map((image, cardIndex) => ({
        id: `${index + 1}-${cardIndex + 1}`,

        title:
          cardIndex === 0
            ? `Explore ${destination.city}`
            : cardIndex === 1
              ? `Discover ${destination.country}`
              : `Travel ${destination.city}`,

        image: unsplash(image, 1000),
      })),
    };
  });

/* ========================================================================
   IMAGE COMPONENT
======================================================================== */

const ImageOrPlaceholder = ({
  src,
  fallbackSrc = "",
  alt = "",
  className = "",
  placeholderClass = "",
  priority = false,
}) => {
  const [imageSrc, setImageSrc] = useState(src || "");

  useEffect(() => {
    setImageSrc(src || "");
  }, [src]);

  if (!imageSrc) {
    return (
      <div
        className={`
          bg-gradient-to-br
          from-slate-950
          via-slate-800
          to-orange-500
          ${placeholderClass}
          ${className}
        `}
      />
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      draggable="false"
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (fallbackSrc && imageSrc !== fallbackSrc) {
          setImageSrc(fallbackSrc);
        } else {
          setImageSrc("");
        }
      }}
      className={`
        select-none
        object-cover
        ${className}
      `}
    />
  );
};

/* ========================================================================
   DESTINATION CARD
======================================================================== */

const DestinationCard = ({ card, destination, mobile = false }) => {
  if (!card || !destination) return null;

  const cardNumber = card.id?.split("-")[1] || "1";

  return (
    <div
      className={`
        group
        relative
        overflow-hidden
        border
        border-white/15
        bg-white/10
        shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        backdrop-blur-sm
        transition-transform
        duration-500
        hover:-translate-y-1

        ${
          mobile
            ? `
              h-[92px]
              min-w-0
              flex-1
              rounded-[12px]

              xs:h-[100px]

              sm:h-[115px]
            `
            : `
              h-[180px]
              rounded-[16px]

              lg:h-[215px]

              xl:h-[245px]

              2xl:h-[270px]
            `
        }
      `}
    >
      <ImageOrPlaceholder
        src={card.image}
        fallbackSrc={destination.heroImage}
        alt={`${destination.city} - ${card.title}`}
        className="
          absolute
          inset-0
          h-full
          w-full
          transition-transform
          duration-700
          ease-out
          group-hover:scale-110
        "
        placeholderClass="h-full w-full"
      />

      {/* Overlay */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/25
          to-black/5
        "
      />

      {/* Number */}

      <div
        className={`
          absolute
          flex
          items-center
          justify-center
          rounded-full
          border
          border-white/25
          bg-black/30
          text-white
          backdrop-blur-md

          ${
            mobile
              ? `
                left-2
                top-2
                h-6
                w-6
                text-[8px]
              `
              : `
                left-3
                top-3
                h-7
                w-7
                text-[9px]
              `
          }
        `}
      >
        0{cardNumber}
      </div>

      {/* External icon */}

      {!mobile && (
        <div
          className="
            absolute
            right-3
            top-3
            flex
            h-8
            w-8
            translate-y-2
            items-center
            justify-center
            rounded-full
            bg-white
            text-black
            opacity-0
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <FiExternalLink size={13} />
        </div>
      )}

      {/* Title */}

      <div
        className={`
          absolute
          bottom-0
          left-0
          right-0
          ${mobile ? "p-2" : "p-3 sm:p-4"}
        `}
      >
        <p
          className={`
            truncate
            font-medium
            leading-tight
            text-white

            ${
              mobile
                ? "text-[8px] xs:text-[9px] sm:text-[10px]"
                : "text-[10px] sm:text-xs"
            }
          `}
        >
          {card.title}
        </p>
      </div>
    </div>
  );
};

/* ========================================================================
   NAVIGATION BUTTON
======================================================================== */

const NavigationButton = ({ direction, onClick }) => {
  const isLeft = direction === "left";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Previous destination" : "Next destination"}
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        border
        border-black/5
        bg-white
        text-black
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
        transition-all
        duration-300

        sm:h-11
        sm:w-11

        hover:bg-orange-500
        hover:text-white
        active:scale-90
      "
    >
      {isLeft ? <FiArrowLeft size={17} /> : <FiArrowRight size={17} />}
    </button>
  );
};

/* ========================================================================
   MAIN COMPONENT
======================================================================== */

export default function TravelDestination() {
  /* ---------------------------------------------------------------------
     SAFETY CHECK
  --------------------------------------------------------------------- */

  if (!destinations.length) {
    return (
      <section className="w-full bg-white px-4 py-10">
        <div className="mx-auto max-w-[1700px]">
          <div className="flex h-[500px] items-center justify-center rounded-3xl bg-slate-950 text-white">
            No destinations available.
          </div>
        </div>
      </section>
    );
  }

  /* ---------------------------------------------------------------------
     INFINITE SLIDES

     01 → 02 → 03 → ... → 50 → 01
  --------------------------------------------------------------------- */

  const slides = useMemo(() => [...destinations, destinations[0]], []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [isPaused, setIsPaused] = useState(false);

  const isResetting = useRef(false);

  /* ---------------------------------------------------------------------
     INDICATOR
  --------------------------------------------------------------------- */

  const indicatorIndex =
    currentSlide === destinations.length
      ? 0
      : Math.min(currentSlide, destinations.length - 1);

  /* ---------------------------------------------------------------------
     NEXT
  --------------------------------------------------------------------- */

  const nextSlide = useCallback(() => {
    if (isResetting.current) return;

    setTransitionEnabled(true);

    setCurrentSlide((previous) => {
      if (previous >= destinations.length) {
        return destinations.length;
      }

      return previous + 1;
    });
  }, []);

  /* ---------------------------------------------------------------------
     PREVIOUS
  --------------------------------------------------------------------- */

  const previousSlide = useCallback(() => {
    if (isResetting.current) return;

    if (currentSlide === 0) {
      setTransitionEnabled(false);

      setCurrentSlide(destinations.length - 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });

      return;
    }

    setTransitionEnabled(true);

    setCurrentSlide((previous) => Math.max(0, previous - 1));
  }, [currentSlide]);

  /* ---------------------------------------------------------------------
     AUTO PLAY
  --------------------------------------------------------------------- */

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(nextSlide, SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPaused, nextSlide]);

  /* ---------------------------------------------------------------------
     TRANSITION END
  --------------------------------------------------------------------- */

  const handleTransitionEnd = (event) => {
    if (event.propertyName !== "transform") return;

    if (currentSlide !== destinations.length) {
      return;
    }

    isResetting.current = true;

    setTransitionEnabled(false);

    setCurrentSlide(0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isResetting.current = false;

        setTransitionEnabled(true);
      });
    });
  };

  /* ---------------------------------------------------------------------
     GO TO SLIDE
  --------------------------------------------------------------------- */

  const goToSlide = (index) => {
    if (index < 0 || index >= destinations.length) {
      return;
    }

    isResetting.current = false;

    setTransitionEnabled(true);

    setCurrentSlide(index);
  };

  /* ---------------------------------------------------------------------
     TOUCH / SWIPE
  --------------------------------------------------------------------- */

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (event) => {
    const touch = event.touches?.[0];

    if (!touch) return;

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;

    setIsPaused(true);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setIsPaused(false);
      return;
    }

    const touch = event.changedTouches?.[0];

    if (!touch) {
      setIsPaused(false);
      return;
    }

    const diffX = touch.clientX - touchStartX.current;

    const diffY = touch.clientY - touchStartY.current;

    const swipeThreshold = 50;

    if (Math.abs(diffX) > swipeThreshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;

    setIsPaused(false);
  };

  /* ---------------------------------------------------------------------
     KEYBOARD
  --------------------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      }

      if (event.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, previousSlide]);

  /* ---------------------------------------------------------------------
     CURRENT DESTINATION
  --------------------------------------------------------------------- */

  const currentDestination = slides[currentSlide] || destinations[0];

  /* ---------------------------------------------------------------------
     RENDER
  --------------------------------------------------------------------- */

  return (
    <section
      className="
        w-full
        overflow-hidden
        bg-white
        py-8

        sm:px-4
        sm:py-12

        md:px-6
        md:py-16

        lg:px-8

        xl:px-10

        2xl:px-12
        2xl:py-20
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1700px]
        "
      >
        {/* =============================================================
            SLIDER
        ============================================================= */}

        <div
          className="
            relative
            h-[620px]
            w-full
            overflow-hidden
            bg-black
            shadow-[0_25px_70px_rgba(0,0,0,0.25)]

            xs:h-[640px]

            sm:h-[660px]
            sm:rounded-[20px]

            md:h-[700px]
            md:rounded-[24px]

            lg:h-[720px]

            xl:h-[750px]

            2xl:h-[780px]
          "
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            touchAction: "pan-y",
          }}
        >
          {/* =========================================================
              SLIDE TRACK
          ========================================================== */}

          <div
            onTransitionEnd={handleTransitionEnd}
            className="
              flex
              h-full
              w-full
              will-change-transform
            "
            style={{
              transform: `translate3d(-${currentSlide * 100}%, 0, 0)`,

              transition: transitionEnabled
                ? `transform ${TRANSITION_DURATION}ms cubic-bezier(0.76,0,0.24,1)`
                : "none",
            }}
          >
            {slides.map((destination, slideIndex) => {
              if (!destination) return null;

              return (
                <article
                  key={`${destination.id}-${slideIndex}`}
                  className="
                      relative
                      h-full
                      min-w-full
                      shrink-0
                      overflow-hidden
                    "
                >
                  {/* =================================================
                        HERO IMAGE
                    ================================================== */}

                  <div className="absolute inset-0">
                    <ImageOrPlaceholder
                      src={destination.heroImage}
                      alt={destination.title}
                      priority={slideIndex === currentSlide}
                      className="
                          h-full
                          w-full
                          object-cover
                          object-center
                        "
                      placeholderClass="
                          h-full
                          w-full
                        "
                    />
                  </div>

                  {/* =================================================
                        OVERLAYS
                    ================================================== */}

                  <div
                    className="
                        absolute
                        inset-0
                        bg-black/20
                      "
                  />

                  <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-black/85
                        via-black/50
                        to-black/10
                        sm:from-black/80
                      "
                  />

                  <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/80
                        via-black/10
                        to-black/10
                      "
                  />

                  <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.16),transparent_30%)]
                      "
                  />

                  {/* =================================================
                        CONTENT
                    ================================================== */}

                  <div
                    className="
                        relative
                        z-10
                        flex
                        h-full
                        items-start

                        px-5
                        pt-[105px]
                        pb-[190px]

                        xs:px-6

                        sm:px-8
                        sm:pt-[125px]
                        sm:pb-[205px]

                        md:px-12
                        md:pt-[145px]
                        md:pb-[200px]

                        lg:px-16
                        lg:pt-[150px]
                        lg:pb-[185px]

                        xl:px-20

                        2xl:px-24
                      "
                  >
                    <div
                      className="
                          w-full
                          max-w-[600px]
                          text-white
                        "
                    >
                      {/* Small label */}

                      <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-2

                            sm:mb-4
                            sm:gap-3
                          "
                      >
                        <span
                          className="
                              h-px
                              w-6
                              bg-white/70

                              sm:w-8
                            "
                        />

                        <span
                          className="
                              text-[8px]
                              font-medium
                              uppercase
                              tracking-[0.25em]
                              text-white/75

                              xs:text-[9px]

                              sm:text-xs
                              sm:tracking-[0.35em]
                            "
                        >
                          Explore destination
                        </span>
                      </div>

                      {/* Country */}

                      <p
                        className="
                            mb-2
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.28em]
                            text-white/60

                            sm:mb-3
                            sm:text-xs
                            sm:tracking-[0.35em]
                          "
                      >
                        {destination.country}
                      </p>

                      {/* Title */}

                      <h2
                        className="
                            max-w-[580px]
                            text-[clamp(38px,11vw,58px)]
                            font-bold
                            leading-[0.94]
                            tracking-[-0.045em]

                            sm:text-[clamp(48px,7vw,68px)]

                            lg:text-[clamp(58px,6vw,76px)]

                            xl:text-[82px]
                          "
                      >
                        {destination.title}
                      </h2>

                      {/* City */}

                      <p
                        className="
                            mt-3
                            text-xs
                            font-medium
                            text-white/70

                            sm:mt-4
                            sm:text-sm
                          "
                      >
                        {destination.city}
                      </p>

                      {/* Description */}

                      <p
                        className="
                            mt-4
                            max-w-[480px]
                            text-xs
                            leading-6
                            text-white/80

                            sm:mt-5
                            sm:text-sm
                            sm:leading-7

                            lg:text-[16px]
                            lg:leading-8
                          "
                      >
                        {destination.description}
                      </p>

                      {/* CTA */}

                      <button
                        type="button"
                        onClick={() => goToSlide(indicatorIndex)}
                        className="
                            group
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-white
                            px-5
                            py-3
                            text-xs
                            font-medium
                            text-black
                            shadow-xl
                            transition-all
                            duration-300

                            sm:mt-7
                            sm:gap-3
                            sm:px-6
                            sm:py-3.5
                            sm:text-sm

                            hover:-translate-y-1
                            hover:bg-orange-500
                            hover:text-white
                            active:scale-95
                          "
                      >
                        <span>Explore</span>

                        <FiExternalLink
                          size={15}
                          className="
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                            "
                        />
                      </button>
                    </div>
                  </div>

                  {/* =================================================
                        DESKTOP CARDS
                    ================================================== */}

                  <div
                    className="
                        absolute
                        bottom-[92px]
                        left-1/2
                        z-20
                        hidden
                        w-[58%]
                        max-w-[850px]
                        -translate-x-0
                        grid-cols-3
                        gap-3

                        md:grid

                        lg:bottom-[95px]
                        lg:gap-4

                        xl:bottom-[100px]
                        xl:gap-5
                      "
                  >
                    {destination.cards?.map((card) => (
                      <DestinationCard
                        key={card.id}
                        card={card}
                        destination={destination}
                      />
                    ))}
                  </div>

                  {/* =================================================
                        MOBILE CARDS
                    ================================================== */}

                  <div
                    className="
                        absolute
                        bottom-[92px]
                        left-4
                        right-4
                        z-20
                        flex
                        gap-2

                        xs:bottom-[96px]
                        xs:left-5
                        xs:right-5
                        xs:gap-2.5

                        sm:bottom-[100px]
                        sm:left-8
                        sm:right-8
                        sm:gap-3

                        md:hidden
                      "
                  >
                    {destination.cards?.map((card) => (
                      <DestinationCard
                        key={card.id}
                        card={card}
                        destination={destination}
                        mobile
                      />
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          {/* =========================================================
              SLIDE NUMBER
          ========================================================== */}

          <div
            className="
              absolute
              left-5
              top-5
              z-40
              flex
              items-center
              gap-2
              text-white/70

              sm:left-7
              sm:top-7

              lg:left-10
              lg:top-8
            "
          >
            <span
              className="
                text-[10px]
                font-medium
                tracking-widest

                sm:text-xs
              "
            >
              {String(indicatorIndex + 1).padStart(2, "0")}
            </span>

            <span
              className="
                h-px
                w-5
                bg-white/30

                sm:w-8
              "
            />

            <span
              className="
                text-[10px]
                tracking-widest

                sm:text-xs
              "
            >
              {String(destinations.length).padStart(2, "0")}
            </span>
          </div>

          {/* =========================================================
              MOBILE NUMBER
          ========================================================== */}

          <div
            className="
              absolute
              right-5
              top-5
              z-40

              sm:hidden
            "
          >
            <span
              className="
                text-[10px]
                font-medium
                tracking-widest
                text-white/70
              "
            >
              {String(indicatorIndex + 1).padStart(2, "0")}/
              {String(destinations.length).padStart(2, "0")}
            </span>
          </div>

          {/* =========================================================
              NAVIGATION
          ========================================================== */}

          <div
            className="
              absolute
              bottom-5
              left-1/2
              z-50
              flex
              -translate-x-1/2
              items-center
              gap-2

              sm:bottom-6

              md:bottom-7
            "
          >
            <NavigationButton direction="left" onClick={previousSlide} />

            <NavigationButton direction="right" onClick={nextSlide} />
          </div>

          {/* =========================================================
              DESKTOP INDICATOR
          ========================================================== */}

          <div
            className="
              absolute
              bottom-7
              right-6
              z-50
              hidden
              items-center
              gap-3

              sm:flex

              lg:right-10

              xl:right-12
            "
          >
            <span
              className="
                text-[10px]
                font-medium
                tracking-widest
                text-white/70
              "
            >
              {String(indicatorIndex + 1).padStart(2, "0")}
            </span>

            <div
              className="
                h-1
                w-16
                overflow-hidden
                rounded-full
                bg-white/20

                md:w-20

                lg:w-28
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-white
                  transition-all
                  duration-500
                "
                style={{
                  width: `${
                    ((indicatorIndex + 1) / destinations.length) * 100
                  }%`,
                }}
              />
            </div>

            <span
              className="
                text-[10px]
                tracking-widest
                text-white/50
              "
            >
              {String(destinations.length).padStart(2, "0")}
            </span>
          </div>

          {/* =========================================================
              AUTO PROGRESS
          ========================================================== */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              z-50
              h-[2px]
              bg-white/10
            "
          >
            {!isPaused && (
              <div
                key={currentSlide}
                className="
                  h-full
                  w-full
                  origin-left
                  bg-white/80
                  animate-[sliderProgress_6s_linear]
                "
              />
            )}
          </div>
        </div>
      </div>

      {/* =============================================================
          ANIMATION
      ============================================================= */}

      <style>{`
        @keyframes sliderProgress {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
