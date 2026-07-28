import React from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare } from "react-icons/fa";

const skills = [
  {
    name: "HTML",
    icon: <FaHtml5 className="text-[#E44D26]" size={45} />,
    percent: 65,
    description: "Quis scelerisque sapien molestiae aut di.",
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="text-[#1572B6]" size={45} />,
    percent: 85,
    description: "Nihilique officia etiam duis saepe magnam.",
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare className="text-[#F7DF1E]" size={45} />,
    percent: 90,
    description: "Delectus magni placerat efficitur ex nostrum.",
  },
  {
    name: "HTML",
    icon: <FaHtml5 className="text-[#E44D26]" size={45} />,
    percent: 65,
    description: "Quis scelerisque sapien molestiae aut di.",
  },
  {
    name: "CSS",
    icon: <FaCss3Alt className="text-[#1572B6]" size={45} />,
    percent: 85,
    description: "Nihilique officia etiam duis saepe magnam.",
  },
  {
    name: "JavaScript",
    icon: <FaJsSquare className="text-[#F7DF1E]" size={45} />,
    percent: 90,
    description: "Delectus magni placerat efficitur ex nostrum.",
  },
];

const SkillCard = () => {
  return (
    <section className="relative bg-[#111111] overflow-hidden py-20">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
          {skills.map((skill, index) => (
            <div key={index}>
              {/* Top Row */}
              <div className="flex items-center gap-6">
                {/* Icon */}
                <div className="w-20 h-20 rounded-full bg-[#1d1d1d] border border-white/10 flex items-center justify-center shadow-lg">
                  {skill.icon}
                </div>

                {/* Title + Progress */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white text-2xl font-semibold">
                      {skill.name}
                    </h3>

                    <span className="text-white text-2xl font-semibold">
                      {skill.percent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-[8px] bg-transparent border border-gray-600 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${skill.percent}%` }}
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 transition-all duration-700"
                    />
                  </div>

                  {/* Description */}
                  <p className="mt-5 text-gray-400 text-base leading-7">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillCard;
