import React from "react";

const Review = () => {
  return (
    <>
      <div className="flex justify-center   bg-black02">
        <h2 className="relative text-lg sm:text-xl md:text-4xl font-semibold font-poppins text-white uppercase tracking-wider">
          Review
          <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-white02"></span>
        </h2>
      </div>
      <div className="hidden lg:block">
        <div className="flex justify-center bg-black02 py-20 ">
          <iframe
            width="1320"
            height="745"
            className="rounded-lg"
            src="https://www.youtube.com/embed/j-KIVHKiT2I?si=raD_mkYNVwvDyFDW"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>

      <div className="lg:hidden ">
        <div className="flex justify-center bg-black02 py-20 ">
          <iframe
            width="320"
            height="245"
            className="rounded-lg"
            src="https://www.youtube.com/embed/j-KIVHKiT2I?si=raD_mkYNVwvDyFDW"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Review;
