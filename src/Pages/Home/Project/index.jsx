import Marquee from "react-fast-marquee";
import project01 from "../../../assets/Project/color_changer.png";
import dowith from "../../../assets/Project/do_with.png";
import eshopblog from "../../../assets/Project/e_shop_blog.png";
import eshop from "../../../assets/Project/e_shop.png";
import joinroom from "../../../assets/Project/join_room.png";
import jscalculator from "../../../assets/Project/js_calculator.png";
import mernianbody from "../../../assets/Project/menian_body.png";
import mernianfriends from "../../../assets/Project/mernian_friends.png";
import mernian from "../../../assets/Project/mernian.png";
import numbergussinggame from "../../../assets/Project/number_gussing_game.png";
import namta from "../../../assets/Project/numta.png";
import studentdashboard from "../../../assets/Project/student_dashboard.png";
import studentresultmanagement from "../../../assets/Project/student_result_management.png";
import nayeamportfolio from "../../../assets/Project/nayeam_portfolio.png";
import nayeamportfoliofooter from "../../../assets/Project/nayeam_portfolio_footer.png";

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
              src={dowith}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={eshop}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={eshopblog}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={joinroom}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={jscalculator}
              alt="project01"
              className="h-full w-full object-fill rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={mernianbody}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={mernianfriends}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className=" h-50 w-50">
            <img
              src={mernian}
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
              src={numbergussinggame}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={namta}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={studentdashboard}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={studentresultmanagement}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={nayeamportfolio}
              alt="project01"
              className="h-full w-full object-contain rounded-xl"
            />
          </div>
          <div className="h-50 w-50">
            <img
              src={nayeamportfoliofooter}
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
