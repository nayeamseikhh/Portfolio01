import React from "react";
import Container from "../Container";
import logo from "../../assets/logo/logo.png";
import footer_bg from "../../assets/Background/footer-bg.png";
const Footer = () => {
  return (
    <>
      <Container>
        <section>
          <div className="my-20 text-white flex justify-between mx-20 ">
            <div className="font-poppins text-l">
              <h6 className="p-1 hover:text-orange transition-all ease-linear duration-300 hover:font-semibold hover:underline cursor-pointer">
                MERN stack developer
              </h6>
              <h6 className="p-1 hover:text-orange transition-all ease-linear duration-300 hover:font-semibold hover:underline cursor-pointer">
                About
              </h6>
              <h6 className="p-1 hover:text-orange transition-all ease-linear duration-300 hover:font-semibold hover:underline cursor-pointer">
                Contact
              </h6>
              <h6 className="p-1 hover:text-orange transition-all ease-linear duration-300 hover:font-semibold hover:underline cursor-pointer">
                Get In touch
              </h6>
              <p className="mt-20 text-xs">Terms of Use & Privacy Policy</p>
            </div>
            <div className="flex flex-col">
              <button className="mt-5">Get In touch</button>
              <button className="mt-5 button02">Download CV</button>
            </div>
            <div className="flex justify-end">
              <div className="h-30 w-60 ">
                <div className="h-full w-full ">
                  <img src={logo} alt="" />
                  <p className="mt-20 text-xs">
                    ©2022 Gravity Team. All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Footer;
