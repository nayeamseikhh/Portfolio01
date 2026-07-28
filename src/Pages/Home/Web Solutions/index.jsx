import logo from "../../../assets/logo/logo.png";
import Container from "../../../GlobalComponents/Container";

const WebSolution = () => {
  return (
    <section className="bg-black02 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-6xl text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Nayeam Logo"
              className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
            />
          </div>

          {/* Heading */}
          <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-semibold font-poppins leading-tight text-white01">
            Professional Web Solutions for
            <span className="bg-gradient-to-l from-fuchsia-400 via-fuchsia-600 to-yellow-500 bg-clip-text text-transparent">
              Your Business Growth
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-4xl px-2 sm:px-6 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-white01 tracking-wide">
            I'm a
            <span className="text-orange font-semibold">
              MERN Stack Developer
            </span>
            passionate about building high-performance, scalable, and responsive
            web applications. My expertise includes React.js, Node.js,
            Express.js, MongoDB, Redux Toolkit, Tailwind CSS, Firebase, REST
            APIs, and modern JavaScript. I focus on writing clean, reusable, and
            maintainable code while creating intuitive user experiences that
            bring ideas to life. Since 2024, I've been continuously expanding my
            expertise by building real-world projects and modern web solutions.
          </p>

          {/* Button */}
          <div className="mt-10 md:mt-14">
            <button className="button02 w-full sm:w-auto px-8 py-3">
              Let's Build Yours Too
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WebSolution;
