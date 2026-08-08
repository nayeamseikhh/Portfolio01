import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { getProjects } from "../../../Service/api";
import Container from "../../../GlobalComponents/Container";

const ProjectCard = ({ project }) => {
  return (
    <a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} project`}
      className="
        group
        relative
        block
        shrink-0
        overflow-hidden
        rounded-2xl
        border
        border-gray-800
        bg-white/[0.02]

        w-[240px]
        h-[150px]

        sm:w-[280px]
        sm:h-[175px]

        md:w-[320px]
        md:h-[195px]

        lg:w-[360px]
        lg:h-[215px]

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-orange/60
        hover:shadow-[0_15px_40px_rgba(255,140,0,0.10)]
      "
    >
      {/* Project Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="
          h-full
          w-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />

      {/* Dark Overlay */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/10
          to-transparent
          opacity-70
          transition-opacity
          duration-300
          group-hover:opacity-90
        "
      />

      {/* Project Info */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          flex
          items-end
          justify-between
          gap-3
          p-4
        "
      >
        <h3
          className="
            truncate
            font-poppins
            text-sm
            font-semibold
            text-white
            transition-colors
            duration-300
            group-hover:text-orange
            sm:text-base
          "
        >
          {project.title}
        </h3>

        <span
          aria-hidden="true"
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-black/40
            text-sm
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            group-hover:border-orange
            group-hover:bg-orange
          "
        >
          ↗
        </span>
      </div>
    </a>
  );
};

const ProjectRow = ({ projects }) => {
  return (
    <div className="flex items-center gap-5 px-2 sm:gap-6 md:gap-7">
      {projects.map((project) => (
        <ProjectCard key={project._id || project.id} project={project} />
      ))}
    </div>
  );
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Projects API error:", error);
        setError(error.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <div className="flex justify-center">
            <p className="font-poppins text-sm text-white/50">
              Loading projects...
            </p>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <Container>
          <div className="flex justify-center">
            <p className="font-poppins text-sm text-red-400">{error}</p>
          </div>
        </Container>
      </section>
    );
  }

  const firstRowProjects = projects.slice(0, 8);
  const secondRowProjects = projects.slice(8);

  return (
    <section
      aria-labelledby="projects-title"
      className="
        relative
        overflow-hidden
        py-20
        sm:py-24
        lg:py-28
      "
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/3
          h-96
          w-96
          rounded-full
          bg-orange/5
          blur-[120px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-96
          w-96
          rounded-full
          bg-cyan-400/5
          blur-[120px]
        "
      />

      <Container>
        {/* Section Header */}
        <header className="relative z-10 mx-auto mb-12 max-w-3xl text-center">
          {/* Small Label */}
          <p
            className="
              font-poppins
              text-xs
              font-semibold
              uppercase
              tracking-[4px]
              text-orange
              sm:text-sm
            "
          >
            Selected Work
          </p>

          {/* Heading */}
          <h2
            id="projects-title"
            className="
              mt-4
              font-poppins
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              text-white

              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Projects I've <span className="text-white/35">Built.</span>
          </h2>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              font-poppins
              text-sm
              leading-7
              text-white/50

              sm:text-base
              sm:leading-8
            "
          >
            A selection of web applications and digital experiences built using
            modern technologies, clean architecture, and scalable solutions.
          </p>
        </header>
      </Container>

      {/* Projects */}
      {projects.length > 0 ? (
        <div className="relative z-10">
          {/* First Row */}
          {firstRowProjects.length > 0 && (
            <Marquee
              direction="right"
              speed={40}
              pauseOnHover
              gradient={false}
              className="mb-5 sm:mb-6"
            >
              <ProjectRow projects={firstRowProjects} />
            </Marquee>
          )}

          {/* Second Row */}
          {secondRowProjects.length > 0 && (
            <Marquee direction="left" speed={40} pauseOnHover gradient={false}>
              <ProjectRow projects={secondRowProjects} />
            </Marquee>
          )}
        </div>
      ) : (
        <Container>
          <div
            className="
              rounded-2xl
              border
              border-gray-800
              bg-white/[0.02]
              px-6
              py-12
              text-center
            "
          >
            <p className="font-poppins text-sm text-white/50">
              No projects available yet.
            </p>
          </div>
        </Container>
      )}
    </section>
  );
};

export default Project;
