import Marquee from "react-fast-marquee";
import project01 from "../../../assets/Project/1.jpeg";

const Project = () => {
  return (
    <>
      <div className="text-white01 mt-25 font-poppins font-semibold flex justify-center text-3xl text-center">
        <h4 className="relative">
          Projects
          <span className="absolute left-0 -bottom-2 h-0.5 bg-white02 transition-all duration-300 w-full"></span>
        </h4>
      </div>
      <Marquee className="text-white" pauseOnHover="true" direction="right">
        <div className="flex mt-20 mb-5 gap-x-5">
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
        </div>
      </Marquee>
      <Marquee className="text-white" pauseOnHover="true" direction="left">
        <div className="flex mb-20 gap-x-5">
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={project01}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
        </div>
      </Marquee>
    </>
  );
};

export default Project;
