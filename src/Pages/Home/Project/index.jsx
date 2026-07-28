import Marquee from "react-fast-marquee";

// images...
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

// ---------------- DATA ----------------

const firstRowProjects = [
  {
    id: 1,
    image: dowith,
    title: "Do With",
    live: "https://dowhith-flex-project.vercel.app/",
  },
  {
    id: 2,
    image: eshop,
    title: "E-Shop",
    live: "https://e-commerce3-nine.vercel.app/",
  },
  {
    id: 3,
    image: eshopblog,
    title: "E-Shop Blog",
    live: "https://e-commerce3-nine.vercel.app/",
  },
  {
    id: 4,
    image: joinroom,
    title: "Join Room",
    live: "https://vartuee-meet.vercel.app/",
  },
  {
    id: 5,
    image: jscalculator,
    title: "JS Calculator",
    live: "https://js-calculator-seven-lemon.vercel.app/",
  },
  {
    id: 6,
    image: mernianbody,
    title: "Mernian Body",
    live: "https://mernian-umber.vercel.app/",
  },
  {
    id: 7,
    image: mernianfriends,
    title: "Mernian Friends",
    live: "https://mernian-umber.vercel.app/",
  },
  {
    id: 8,
    image: mernian,
    title: "Mernian",
    live: "https://mernian-umber.vercel.app/",
  },
];

const secondRowProjects = [
  {
    id: 9,
    image: numbergussinggame,
    title: "Number Guessing Game",
    live: "https://number-guessing-game-tau-snowy.vercel.app/",
  },
  {
    id: 10,
    image: namta,
    title: "Namta",
    live: "https://namta-nine.vercel.app/",
  },
  {
    id: 11,
    image: studentdashboard,
    title: "Student Dashboard",
    live: "https://student-portal2-alpha.vercel.app/",
  },
  {
    id: 12,
    image: studentresultmanagement,
    title: "Student Result Management",
    live: "https://student-result-management-beta.vercel.app/",
  },
  {
    id: 13,
    image: nayeamportfolio,
    title: "Portfolio",
    live: "https://portfolio01-five-peach.vercel.app/",
  },
  {
    id: 14,
    image: nayeamportfoliofooter,
    title: "Portfolio Footer",
    live: "https://portfolio01-five-peach.vercel.app/",
  },
];

// ---------------- COMPONENTS ----------------

const ProjectCard = ({ project }) => (
  <a
    href={project.live}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={project.title}
    className="
      group
      block
      flex-shrink-0
      overflow-hidden
      rounded-2xl
      shadow-xl

      w-[240px]
      h-[145px]

      sm:w-[280px]
      sm:h-[170px]

      md:w-[320px]
      md:h-[190px]

      lg:w-[360px]
      lg:h-[210px]
    "
  >
    <img
      src={project.image}
      alt={project.title}
      className="
        h-full
        w-full
        object-cover
        transition-all
        duration-500
        group-hover:scale-105
      "
    />
  </a>
);

const ProjectRow = ({ projects }) => (
  <div className="flex items-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4">
    {projects.map((project) => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

// ---------------- PAGE ----------------

const Project = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      {/* Heading */}

      <div className="mb-10 md:mb-14 lg:mb-16 flex justify-center">
        <h2 className="relative font-poppins font-semibold text-white01 text-3xl sm:text-4xl lg:text-5xl">
          Projects
          <span className="absolute left-0 -bottom-2 h-[2px] w-full bg-white02" />
        </h2>
      </div>

      {/* First Marquee */}

      <Marquee
        direction="right"
        speed={45}
        pauseOnHover
        gradient={false}
        className="mb-6 md:mb-8"
      >
        <ProjectRow projects={firstRowProjects} />
      </Marquee>

      {/* Second Marquee */}

      <Marquee direction="left" speed={45} pauseOnHover gradient={false}>
        <ProjectRow projects={secondRowProjects} />
      </Marquee>
    </section>
  );
};

export default Project;
