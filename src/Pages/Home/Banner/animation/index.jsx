import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MorphingText = ({
  words = [
    "Web Developer",
    "Web Designer",
    "MERN Stack Developer",
    "Freelancer",
  ],
  duration = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <div
      className={`flex justify-center items-center w-full px-4 ${className}`}
      style={{ perspective: "1000px" }}
    >
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          initial={{
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.8,
            rotateX: -90,
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            rotateX: 0,
          }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            scale: 1.2,
            rotateX: 90,
          }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="
            min-h-[60px]
            sm:min-h-[70px]
            md:min-h-[80px]
            lg:min-h-[90px]

            text-center
            font-bold
            leading-tight

            text-2xl
            sm:text-3xl
            md:text-5xl
            lg:text-6xl

            whitespace-nowrap

            bg-gradient-to-r
            from-purple-600
            via-pink-600
            to-blue-600
            bg-clip-text
            text-transparent
          "
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {words[currentIndex]}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
};

export default function MorphingView() {
  return (
    <section className="w-full py-4 sm:py-6">
      <MorphingText />
    </section>
  );
}
