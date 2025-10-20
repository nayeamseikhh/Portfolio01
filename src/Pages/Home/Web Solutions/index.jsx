import logo from "../../../assets/logo/logo.png";
import Container from "../../../GlobalComponents/Container";

const WebSolution = () => {
  return (
    <>
      <div className="bg-black02 py-20">
        <Container>
          <section>
            <div className="my-10 font-poppins font-semibold flex justify-center text-3xl text-center">
              <div>
                <img src={logo} alt="" />
              </div>
            </div>
            <div className="my-10 text-white01 font-poppins font-semibold flex justify-center text-3xl text-center">
              <h4>
                Professional Web Solutions for
                <span> </span>
                <span className="bg-gradient-to-l from-fuchsia-400 via-fuchsia-600 to-yellow-500 bg-clip-text text-transparent">
                  Your Business Growth
                </span>
              </h4>
            </div>
            <div className=" flex justify-center">
              <p className="text-white01 font-poppins text-l text-center">
                As a <span> </span>
                <span className="text-orange underline">
                  MERN Stack and web application Developer
                </span>
                , I've successfully delivered Building MVPs & <br /> Scalable
                Web & Mobile Apps for global clients and companies/agencies with
                React.js, Next.js, <br /> Node.js, Express, MongoDB, and React
                Native to turn complex ideas into high-performing digital <br />{" "}
                products. With experience working for international clients , I
                focus on clean architecture, fast <br />
                delivery, and long-term maintainability.
              </p>
            </div>
            <div className="mt-20 flex justify-center">
              <button className="button02">Let's build yours too</button>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default WebSolution;
