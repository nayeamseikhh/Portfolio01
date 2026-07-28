import React from "react";

const ExperienceCard = () => {
  const experiences = [
    {
      role: "UX/UI Architect",
      company: "IBM Corporation",
      year: "2021 - Present",
    },
    {
      role: "UI Design Intern",
      company: "Windows UX",
      year: "2019 - 2020",
    },
    {
      role: "Visual Design",
      company: "Microsoft Cooperation",
      year: "2017 - 2018",
    },
    {
      role: "UX Strategist",
      company: "Google Analytics",
      year: "2014 - 2018",
    },
  ];

  const tags = [
    "Interaction",
    "Tools",
    "User",
    "Interface",
    "Apps",
    "Creative",
  ];

  return (
    <section className="relative w-full">
      {/* Experience Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#161616] p-8 lg:p-10">
        {/* Background Symbol */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[500px] font-black text-red-600/10 leading-none select-none">
            &
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <p className="text-gray-400 text-sm mb-8">7 Years of Experience</p>

          <div className="space-y-8">
            {experiences.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-white/5 pb-5 last:border-none last:pb-0"
              >
                {/* Left */}
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-300">
                  {item.role}
                </h2>

                {/* Right */}
                <div className="text-right">
                  <h3 className="text-xl font-semibold text-gray-300">
                    {item.company}
                  </h3>

                  <p className="text-gray-500 mt-1">{item.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tags */}
      <div className="mt-6 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-8 py-6 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-[scroll_18s_linear_infinite]">
          {[...tags, ...tags].map((tag, index) => (
            <React.Fragment key={index}>
              <span className="text-white text-2xl font-semibold">{tag}</span>

              <span className="w-2 h-2 rounded-full bg-red-200"></span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ExperienceCard;
