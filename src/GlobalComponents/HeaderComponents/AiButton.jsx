import { useState } from "react";
// import { FiSparkles } from "react-icons/fi";
import AiDrawer from "../../Pages/Home/Banner/bossNayeam/AiDrawer";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { Link } from "react-router";

export default function AiButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative inline-flex overflow-hidden rounded-xl p-[1px]">
        {/* Animated Border */}
        <div className="absolute -inset-[250%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(#32aee3_0deg,#6fde59_120deg,#32aee3_240deg,#060c21_300deg,#32aee3_360deg)]"></div>

        {/* Glow */}
        <div className="absolute -inset-[250%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(#32aee3_0deg,#6fde59_120deg,#32aee3_240deg,#060c21_300deg,#32aee3_360deg)] blur-2xl opacity-70"></div>

        {/* Content */}
        <div className="relative rounded-xl bg-black02 px-8 py-2 text-white">
          <Link
            onClick={() => setOpen(true)}
            className="flex items-center gap-x-2  text-2xl font-semibold"
          >
            <FaWandMagicSparkles size={20} />
            Ask AI
          </Link>
          <AiDrawer open={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}
