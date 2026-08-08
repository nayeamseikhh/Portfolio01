import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { getProjects } from "../../Service/api";

const ProjectPlan = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects();

        /*
         * Remove duplicate projects
         */
        const uniqueProjects = Array.from(
          new Map(
            (data || []).map((project) => [
              `${project.title}-${project.image}`,
              project,
            ]),
          ).values(),
        );

        setProjects(uniqueProjects);
      } catch (err) {
        console.error("Projects API error:", err);
        setError(err.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d0d0d] px-4 py-32">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-orange" />

            <p className="mt-5 font-poppins text-sm text-white/40">
              Loading projects...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <main className="min-h-screen bg-[#0d0d0d] px-4 py-32">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.03] px-8 py-6 text-center">
            <p className="font-poppins text-sm text-red-400">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0d0d0d]
        px-4
        pb-28
        pt-24

        sm:px-6
        sm:pb-32
        sm:pt-28

        lg:px-10
        lg:pb-40
        lg:pt-36
      "
    >
      {/* =====================================================
          BACKGROUND LIGHT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[500px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-orange/[0.025]
          blur-[150px]
        "
      />

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="mb-20 max-w-4xl sm:mb-24 lg:mb-28">
          {/* Label */}

          <div className="mb-7 flex items-center gap-4">
            <span className="h-px w-12 bg-orange" />

            <span
              className="
                font-poppins
                text-[10px]
                font-semibold
                uppercase
                tracking-[4px]
                text-orange
              "
            >
              Selected Work
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
              font-poppins
              text-4xl
              font-bold
              leading-[1.05]
              tracking-[-1.5px]
              text-white

              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              lg:tracking-[-3px]
            "
          >
            A collection of
            <br />
            <span className="text-white/25">things I've built.</span>
          </h1>

          {/* Description */}

          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p
              className="
                max-w-xl
                font-poppins
                text-sm
                leading-7
                text-white/40

                sm:text-base
                sm:leading-8
              "
            >
              Real-world web applications built with modern technologies,
              thoughtful interfaces, and scalable development practices. Each
              project reflects my approach to solving problems through clean and
              purposeful code.
            </p>

            {/* Counter */}

            <div
              className="
                flex
                shrink-0
                items-center
                gap-3
                font-poppins
                text-xs
                text-white/35
              "
            >
              <span className="h-2 w-2 rounded-full bg-orange" />

              <span>
                {projects.length.toString().padStart(2, "0")} Projects
              </span>
            </div>
          </div>
        </header>

        {/* =====================================================
            PROJECTS
        ===================================================== */}

        {projects.length > 0 ? (
          <section
            aria-label="Selected projects"
            className="space-y-20 sm:space-y-28 lg:space-y-36"
          >
            {projects.map((project, index) => {
              const isEven = index % 2 === 0;

              return (
                <article
                  key={project._id || project.id || `${project.title}-${index}`}
                  className="group relative"
                >
                  {/* =================================================
                      PROJECT NUMBER
                  ================================================= */}

                  <div
                    className="
                      mb-5
                      flex
                      items-center
                      justify-between

                      lg:mb-7
                    "
                  >
                    <span
                      className="
                        font-mono
                        text-xs
                        font-medium
                        tracking-widest
                        text-white/25
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px flex-1 bg-white/[0.06] mx-4 sm:mx-6" />

                    <span
                      className="
                        font-poppins
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[3px]
                        text-orange/70
                      "
                    >
                      Web Application
                    </span>
                  </div>

                  {/* =================================================
                      PROJECT LAYOUT
                  ================================================= */}

                  <div
                    className={`
                      grid
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-white/[0.07]
                      bg-[#121212]
                      transition-all
                      duration-700
                      hover:border-orange/20
                      hover:shadow-[0_30px_100px_rgba(255,140,0,0.06)]

                      lg:grid-cols-12
                    `}
                  >
                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div
                      className={`
                        relative
                        overflow-hidden
                        bg-[#171717]

                        lg:col-span-7

                        ${isEven ? "lg:order-1" : "lg:order-2"}
                      `}
                    >
                      {/* Image */}

                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        loading="lazy"
                        className="
                          block
                          aspect-[16/10]
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-1000
                          ease-out
                          group-hover:scale-[1.035]

                          lg:aspect-auto
                          lg:min-h-[470px]
                        "
                      />

                      {/* Image Gradient */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/50
                          via-transparent
                          to-transparent
                        "
                      />

                      {/* Image Number */}

                      <div
                        className="
                          absolute
                          left-5
                          top-5
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/15
                          bg-black/40
                          font-mono
                          text-xs
                          text-white/70
                          backdrop-blur-md

                          sm:left-7
                          sm:top-7
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Live Button */}

                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                        className="
                          absolute
                          bottom-5
                          right-5
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/15
                          bg-black/50
                          px-4
                          py-2.5
                          font-poppins
                          text-xs
                          font-medium
                          text-white
                          backdrop-blur-md
                          transition-all
                          duration-300
                          hover:border-orange
                          hover:bg-orange

                          sm:bottom-7
                          sm:right-7
                        "
                      >
                        Live Preview
                        <FiExternalLink />
                      </a>
                    </div>

                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <div
                      className={`
                        flex
                        flex-col
                        justify-between
                        p-6

                        sm:p-8
                        lg:col-span-5
                        lg:p-10
                        xl:p-12

                        ${isEven ? "lg:order-2" : "lg:order-1"}
                      `}
                    >
                      <div>
                        {/* Small label */}

                        <p
                          className="
                            font-poppins
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[3px]
                            text-orange
                          "
                        >
                          Project {String(index + 1).padStart(2, "0")}
                        </p>

                        {/* Title */}

                        <h2
                          className="
                            mt-5
                            font-poppins
                            text-2xl
                            font-semibold
                            leading-tight
                            tracking-tight
                            text-white

                            sm:text-3xl
                            lg:text-4xl
                          "
                        >
                          {project.title}
                        </h2>

                        {/* Description */}

                        <p
                          className="
                            mt-5
                            max-w-lg
                            font-poppins
                            text-sm
                            leading-7
                            text-white/40

                            sm:leading-8
                          "
                        >
                          {project.description ||
                            "A modern web application designed with a focus on performance, usability, responsive design, and a smooth user experience."}
                        </p>
                      </div>

                      {/* Bottom */}

                      <div className="mt-10">
                        {/* Divider */}

                        <div className="mb-6 h-px bg-white/[0.07]" />

                        <div className="flex items-center justify-between gap-5">
                          {/* Category */}

                          <div>
                            <p className="font-poppins text-[10px] uppercase tracking-[2px] text-white/20">
                              Type
                            </p>

                            <p className="mt-1 font-poppins text-xs text-white/50">
                              Web Application
                            </p>
                          </div>

                          {/* View */}

                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              group/link
                              inline-flex
                              items-center
                              gap-2
                              font-poppins
                              text-sm
                              font-medium
                              text-white
                            "
                          >
                            View Project
                            <span
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                transition-all
                                duration-300
                                group-hover/link:border-orange
                                group-hover/link:bg-orange
                              "
                            >
                              <FiArrowUpRight />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          /* =====================================================
             EMPTY STATE
          ===================================================== */

          <section
            className="
              rounded-[28px]
              border
              border-white/[0.07]
              bg-white/[0.02]
              px-6
              py-24
              text-center
            "
          >
            <p className="font-poppins text-sm text-white/40">
              No projects available yet.
            </p>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProjectPlan;
