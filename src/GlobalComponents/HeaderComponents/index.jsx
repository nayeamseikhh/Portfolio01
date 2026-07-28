import { Link } from "react-router";
import logo from "../../assets/logo/logo.png";
import Container from "../Container";
import DarkMode from "./DarkMode";

const Header = () => {
  return (
    <>
      <div>
        <Container>
          <div className="">
            <div className="h-18 w-full bg-black02 text-white01 mt-5 rounded-2xl shadow-xl/15 ">
              <div className="grid grid-cols-[1fr_2fr]">
                <div className=" w-35 ml-5 mt-2 bg-cover bg-center rounded-xl">
                  <Link to="/">
                    <img src={logo} alt="logo" />
                  </Link>
                </div>
                <div className=" flex items-center justify-end gap-x-15 mr-5 text-lg font-semibold ">
                  <Link className="relative group">
                    <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02 ">
                      Home
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link to="/skills" className="relative group">
                    <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02">
                      My Work
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link className="relative group">
                    <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02">
                      Project Plane
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link className="relative group">
                    <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02">
                      About
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link to="/get_in_touch" className="relative group">
                    <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02 ">
                      Contact
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>

                  <button>Hire Me</button>
                  <DarkMode />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
