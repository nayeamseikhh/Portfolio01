import { Link } from "react-router";
import logo from "../../assets/logo/logo.png";
import Container from "../Container";

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
                    <h4 className="relative">
                      Home
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link className="relative group">
                    <h4 className="relative">
                      My Work
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link className="relative group">
                    <h4 className="relative">
                      Project Plane
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link className="relative group">
                    <h4 className="relative">
                      About
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>
                  <Link className="relative group">
                    <h4 className="relative">
                      Contact
                      <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </h4>
                  </Link>

                  <button>Hire Me</button>
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
