import React from "react";
import GetintouchBanner from "./getintouchBanner";
import RelationalPart from "./relationalPart";
import Container from "../../GlobalComponents/Container";
import GetInTouchText from "./getInTouchText";

const GetInTouch = () => {
  return (
    <>
      <Container>
        <GetintouchBanner />
        <GetInTouchText />
        <RelationalPart />
      </Container>
    </>
  );
};

export default GetInTouch;
