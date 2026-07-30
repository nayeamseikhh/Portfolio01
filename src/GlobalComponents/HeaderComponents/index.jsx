// import { Link } from "react-router";
// import logo from "../../assets/logo/logo.png";
// import Container from "../Container";
// import DarkMode from "./DarkMode";
// import AiButton from "./AiButton";

// const Header = () => {
//   return (
//     <>
//       <div>
//         <Container>
//           <div className="">
//             <div className="h-18 w-full bg-black02 text-white01 mt-5 rounded-2xl shadow-xl/15 ">
//               <div className="grid grid-cols-[1fr_2fr]">
//                 <div className="flex items-center ml-5  bg-cover bg-center rounded-xl">
//                   <Link to="/">
//                     <img className="w-35" src={logo} alt="logo" />
//                   </Link>
//                   <div className="mt-1.5 ml-30">
//                     <AiButton />
//                   </div>
//                 </div>
//                 <div className=" flex items-center justify-end gap-x-15 mr-5 text-lg font-semibold ">
//                   <Link className="relative group">
//                     <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02 ">
//                       Home
//                       <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
//                     </h4>
//                   </Link>
//                   <Link to="/skills" className="relative group">
//                     <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02">
//                       My Work
//                       <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
//                     </h4>
//                   </Link>
//                   <Link className="relative group">
//                     <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02">
//                       Project Plane
//                       <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
//                     </h4>
//                   </Link>
//                   <Link className="relative group">
//                     <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02">
//                       About
//                       <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
//                     </h4>
//                   </Link>
//                   <Link to="/get_in_touch" className="relative group">
//                     <h4 className="relative transition-all duration-300 ease-in-out hover:text-white02 ">
//                       Contact
//                       <span className="absolute left-0 -bottom-2 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
//                     </h4>
//                   </Link>

//                   <button>Hire Me</button>
//                   <DarkMode />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </>
//   );
// };

// export default Header;

import { useState } from "react";
import { Link } from "react-router";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import logo from "../../assets/logo/logo.png";
import Container from "../Container";
import DarkMode from "./DarkMode";
import AiButton from "./AiButton";
import Login from "../auth/login";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "My Skills", path: "/skills" },
  { title: "Project Plan", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/get_in_touch" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="py-1 fixed top-0 left-0 right-0 z-50 ">
      <Container>
        <nav className=" rounded-2xl bg-black02 px-6 shadow-xl">
          <div className="flex h-18 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src={logo} alt="Logo" className="w-32 md:w-36" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-14 text-lg">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group relative font-medium text-white01"
                >
                  {item.title}

                  <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-5">
              <AiButton onClick={() => setOpen(true)} />

              <button className="rounded-lg bg-amber-400 px-6 py-2 font-semibold text-black transition hover:bg-amber-300">
                Hire Me
              </button>

              <Login onClick={() => setOpen(true)} />

              <DarkMode />
            </div>

            {/* Mobile Menu Button */}

            <button
              onClick={() => setOpen(!open)}
              className="text-3xl text-white lg:hidden"
            >
              {open ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>

          {/* Mobile Menu */}

          <div
            className={`overflow-hidden transition-all duration-300 lg:hidden ${
              open ? "max-h-[500px] py-5" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="text-white01 transition hover:text-amber-400"
                >
                  {item.title}
                </Link>
              ))}

              <AiButton />

              <button className="rounded-lg bg-amber-400 py-3 font-semibold text-black">
                Hire Me
              </button>

              <DarkMode />
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
