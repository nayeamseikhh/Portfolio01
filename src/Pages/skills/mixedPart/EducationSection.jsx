import React from "react";

import myImages from "../../../assets/myImages/nayeam.png";

const EducationSection = () => {
  const education = [
    {
      year: "2011 - 2012",
      title: "Digital Design Masterclass",
      institute: "Domestika Design Academy",
    },
    {
      year: "2012 - 2013",
      title: "Webpage And Mobile Design",
      institute: "Skill-Share Design Academy",
    },
    {
      year: "2013 - 2014",
      title: "Digital Product Design",
      institute: "Springboard Digital Academy",
    },
  ];

  return (
    <section className="relative bg-[#111111] py-20 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <span className="text-[520px] font-black text-red-600/10 select-none">
          &
        </span>
      </div>

      {/* Grid Line */}
      <div className="absolute inset-0 max-w-7xl mx-auto border-x border-white/5"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Education Credentials
          </h2>

          <p className="text-gray-400 mt-6 leading-8 max-w-xl">
            Cum nostrum ullam aut vero repudiandae et quod corporis aut placeat
            quia et quia dolorem cumque et aliquam vitae et numquam quod sed.
          </p>

          {/* Timeline Card */}
          <div className="mt-10 bg-[#181818] border border-white/10 rounded-3xl p-8 md:p-10">
            {education.map((item, index) => (
              <div
                key={index}
                className={`relative flex gap-8 ${
                  index !== education.length - 1 ? "pb-12" : ""
                }`}
              >
                {/* Timeline */}
                <div className="relative flex flex-col items-center">
                  <span className="w-4 h-4 rounded-full bg-red-500 border-4 border-red-500/20 z-10"></span>

                  {index !== education.length - 1 && (
                    <span className="absolute top-4 w-[2px] h-full bg-white/10"></span>
                  )}
                </div>

                {/* Content */}
                <div>
                  <p className="text-gray-400 text-sm">{item.year}</p>

                  <div className="mt-2 flex flex-col lg:flex-row lg:items-center gap-3">
                    <h3 className="text-white text-2xl font-semibold">
                      {item.title}
                    </h3>

                    <span className="text-gray-400">{item.institute}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div>
          <img
            src={myImages}
            alt="myImages"
            className="w-full h-[650px] object-cover rounded-[40px]"
          />
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
