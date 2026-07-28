import React from "react";
import StatsCards from "./StatsCards";
import ExperienceCard from "./ExperienceCard";
import MapCard from "./MapCard";
import ResumeCard from "./ResumeCard";
import EducationSection from "./EducationSection";

const MixedPart = () => {
  return (
    <>
      {/* <div>
        <StatsCards />
        <ExperienceCard />
        <MapCard />
        <ResumeCard />
        <EducationSection />
      </div> */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="col-span-12 lg:col-span-6">
            <ExperienceCard />
            <StatsCards />
          </div>

          {/* Right Side */}
          <div className="col-span-12 lg:col-span-6">
            <MapCard />
            <ResumeCard />
          </div>
        </div>
        {/* downPart */}
        <EducationSection />
      </section>
    </>
  );
};

export default MixedPart;
