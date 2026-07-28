import React from "react";
import Container from "../../../GlobalComponents/Container";
import relationalImages from "../../../assets/images/relational images.png";

const RelationalPart = () => {
  return (
    <>
      <Container>
        <div>
          <div className="group overflow-hidden rounded-xl border border-transparent transition-all duration-300 hover:-translate-y-2 hover:border-amber-500 hover:shadow-2xl">
            <img
              src={relationalImages}
              alt="Relational Images"
              className="w-full rounded-xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default RelationalPart;
