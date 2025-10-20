import React, { useEffect } from "react";
import Container from "../../../GlobalComponents/Container";
import bannerImg from "../../../assets/banner/nayeam.png";
import Aos from "aos";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router";

const Banner = () => {
  useEffect(() => {
    Aos.init({
      duration: 800,
      once: true,
    });
  }, []);
  const dotLottieRef = React.useRef(null);
  return (
    <Container>
      <div className="text-green-500">
        <Link>
          <div className="h-8 w-fit p-2  bg-black02 ml-210 -mb-28 mt-20 rounded-4xl flex  items-center ">
            <div>
              <DotLottieReact
                src="https://lottie.host/9a5963cb-c54a-484b-a670-7220128bbd51/tU9JPnXYiA.lottie"
                loop
                autoplay
                style={{
                  width: 100,
                  height: 50,
                  marginRight: -25,
                  marginLeft: -40,
                }}
              />
            </div>
            <h6 className="mr-3 -ml-2 text-sm font-light">
              Available for work
            </h6>
          </div>
        </Link>
      </div>
      <div className="text-white mt-20 flex justify-center">
        <div className="h-60 w-60">
          <img
            className="h-full w-full rounded-full object-cover "
            src={bannerImg}
            alt="bannerImg
          "
          />
        </div>
      </div>
      <div
        className="text-white mt-20 flex justify-center"
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay="200"
      >
        <div className="w-[770px] h-[127px] text-center">
          <h1 className="font-poppins font-extrabold text-6xl">
            I do code and <br /> make content <span> </span>
            <span className="bg-gradient-to-l from-fuchsia-400 via-fuchsia-600 to-yellow-500 bg-clip-text text-transparent">
              about it!
            </span>
          </h1>
        </div>
      </div>
      <div
        className=" text-white text-center mt-8 flex justify-center text-l"
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay="200"
      >
        I am a seasoned full-stack software engineer with over <br /> 8 years of
        professional experience, specializing in backend development. <br /> My
        expertise lies in crafting robust and scalable SaaS-based <br />
        architectures on the Amazon AWS platform.
      </div>
      <div className="text-white text-center mt-14 flex justify-center gap-8">
        <button>Get In Touch</button>
        <button className="button02">Download CV</button>
      </div>
    </Container>
  );
};

export default Banner;
