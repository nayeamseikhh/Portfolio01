import React from "react";
import Container from "../../GlobalComponents/Container";
import Background from "../../GlobalComponents/Background";
import Banner from "./Banner";
import Experience from "./experience";
import Project from "./Project";
import WebSolution from "./Web Solutions";
import Footer from "../../GlobalComponents/Footer";
import Review from "./Banner/review";
// import BackendTest from "../backendtest";

const Home = () => {
  return (
    <div>
      <Banner />
      <Experience />
      <Project />
      <WebSolution />
      <Review />
    </div>
  );
};

export default Home;
