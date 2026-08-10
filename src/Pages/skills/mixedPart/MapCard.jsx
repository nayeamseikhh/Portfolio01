import React from "react";
import { FaExpandArrowsAlt } from "react-icons/fa";

const MapCard = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#171717] h-[320px] group">
      {/* Google Map */}
      <iframe
        title="Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58144.787229144335!2d88.60616015!3d24.37959175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbefa96a38d031%3A0x10f93a950ed6f410!2sRajshahi!5e0!3m2!1sen!2sbd!4v1786323579609!5m2!1sen!2sbd"
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
