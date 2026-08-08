import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = [
  "Web Developer",
  "Web Designer",
  "MERN Stack Developer",
  "Freelancer",
];

const MorphingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        relative
        mt-5
        h-[52px]
        w-full
        overflow-hidden

        sm:h-[60px]
        md:h-[68px]
        lg:h-[74px]
      "
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={words[currentIndex]}
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 1.02,
          }}
          transition={{
            opacity: {
              duration: 0.6,
              ease: "easeInOut",
            },
            y: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
            scale: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="
            absolute
            left-0
            top-0

            font-poppins
            text-2xl
            font-semibold
            leading-tight
            tracking-tight
            text-orange

            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            xl:text-6xl
          "
        >
          {words[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const MorphingView = () => {
  return (
    <div
      className="w-full max-w-2xl"
      aria-live="polite"
      aria-label={`Professional role: ${words[0]}`}
    >
      <MorphingText />
    </div>
  );
};

export default MorphingView;
