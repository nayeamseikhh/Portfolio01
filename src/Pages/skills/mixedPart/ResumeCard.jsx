import React from "react";
import { FiDownload } from "react-icons/fi";

const ResumeCard = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#171717] h-[190px] px-8 md:px-10 flex items-center justify-between group">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
        <span className="text-[380px] font-black text-red-600/10 leading-none -translate-x-20">
          &
        </span>
      </div>

      {/* Left Content */}
      <div className="relative z-10">
        <p className="text-gray-400 text-sm uppercase tracking-widest">
          2025 CV
        </p>

        <h2 className="mt-2 text-4xl md:text-6xl font-bold text-white">
          My Resume
        </h2>
      </div>

      {/* Download Button */}
      <a
        href="/cv.pdf"
        download
        className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full
        border border-white/10
        bg-white/5
        backdrop-blur-md
        hover:bg-red-500
        hover:border-red-500
        transition-all duration-300
        group"
      >
        <FiDownload
          size={34}
          className="text-red-500 group-hover:text-white transition-all duration-300"
        />
      </a>
    </div>
  );
};

export default ResumeCard;
