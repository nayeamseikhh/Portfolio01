import React from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";

const MapCard = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#171717] h-[320px] group">
      {/* Google Map */}
      <iframe
        title="Location"
        src="https://maps.google.com/maps?q=Dhaka,Bangladesh&t=k&z=13&ie=UTF8&iwloc=&output=embed"
        className="w-full h-full"
        loading="lazy"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

      {/* Expand Button */}
      <button className="absolute bottom-5 right-5 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 duration-300">
        <FaExpandArrowsAlt size={18} />
      </button>
    </div>
  );
};

export default MapCard;
