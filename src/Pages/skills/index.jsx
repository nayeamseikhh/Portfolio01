import React from "react";
import Container from "../../GlobalComponents/Container";
import SkillsCard from "./skillsCard";
import MixedPart from "./mixedPart";
import NewsletterSection from "./NewsletterSection";

const Skills = () => {
  return (
    <>
      <Container>
        <div>
          <SkillsCard />
          <MixedPart />
          <NewsletterSection />
        </div>
      </Container>
    </>
  );
};

export default Skills;
