import React from "react";

const StatsCards = () => {
  const stats = [
    {
      number: "95+",
      title: "Projects Done",
    },
    {
      number: "15+",
      title: "Years On Field",
    },
  ];

  return (
    <section className="w-full py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#171717] h-[230px] flex flex-col items-center justify-center transition-all duration-300 hover:border-red-500 hover:-translate-y-2"
          >
            {/* Glow Effect */}
            <div className="absolute w-52 h-52 bg-white/5 blur-3xl rounded-full"></div>

            {/* Number */}
            <h1 className="relative text-7xl md:text-8xl font-extrabold text-white drop-shadow-[0_0_18px_rgba(255,255,255,.5)]">
              {item.number}
            </h1>

            {/* Title */}
            <h3 className="relative mt-5 text-2xl font-bold text-white">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCards;
