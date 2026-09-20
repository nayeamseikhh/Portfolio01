import { useState } from "react";
import AiDrawer from "../../Pages/Home/Banner/bossNayeam/AiDrawer";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function AiButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* AI Button */}
      <div className="relative inline-flex w-full max-w-full overflow-hidden rounded-xl p-[1px] sm:w-auto">
        {/* Animated Border */}
        <div
          className="
            absolute
            -inset-[250%]
            animate-[spin_6s_linear_infinite]
            bg-[conic-gradient(#32aee3_0deg,#6fde59_120deg,#32aee3_240deg,#060c21_300deg,#32aee3_360deg)]
          "
        />

        {/* Glow */}
        <div
          className="
            absolute
            -inset-[250%]
            animate-[spin_6s_linear_infinite]
            bg-[conic-gradient(#32aee3_0deg,#6fde59_120deg,#32aee3_240deg,#060c21_300deg,#32aee3_360deg)]
            opacity-60
            blur-2xl
            sm:opacity-70
          "
        />

        {/* Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Ask AI"
          className="
            relative
            flex
            min-h-[42px]
            w-full
            items-center
            justify-center
            gap-2
            rounded-[11px]
            bg-black02
            px-4
            py-2
            font-poppins
            text-sm
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-[#080d1c]
            hover:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#32aee3]/50
            active:scale-[0.98]

            sm:min-h-[44px]
            sm:w-auto
            sm:px-5
            sm:text-sm

            md:px-6
            md:text-base

            lg:min-h-[46px]
            lg:px-7
            lg:text-base

            xl:px-8
          "
        >
          <FaWandMagicSparkles
            className="
              shrink-0
              text-[16px]
              sm:text-[18px]
              md:text-[19px]
            "
          />

          <span className="whitespace-nowrap">Ask AI</span>
        </button>
      </div>

      {/* AI Drawer */}
      <AiDrawer open={open} setOpen={setOpen} />
    </>
  );
}
