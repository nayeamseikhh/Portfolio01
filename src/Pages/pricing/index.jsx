import React from "react";
import { Link } from "react-router";
import { FaCheck, FaRocket, FaCode, FaCrown, FaComments } from "react-icons/fa";

const pricingPackages = [
  {
    id: 1,
    name: "Starter",
    subtitle: "Perfect for getting started",
    icon: <FaRocket />,
    price: "$150",
    popular: false,

    description:
      "A clean and professional website for individuals, personal brands and simple online presence.",

    features: [
      "1–4 Pages",
      "Responsive Design",
      "Modern UI Design",
      "React.js Development",
      "Contact Form",
      "Basic SEO Setup",
      "Social Media Integration",
      "Deployment Support",
    ],

    button: "Get Started",
  },

  {
    id: 2,
    name: "Professional",
    subtitle: "For growing businesses",
    icon: <FaCode />,
    price: "$350",
    popular: true,

    description:
      "A complete professional website designed to help your business build trust and attract customers.",

    features: [
      "Up to 8 Pages",
      "Custom UI/UX",
      "Fully Responsive",
      "React.js Development",
      "Contact & Inquiry Forms",
      "API Integration",
      "Basic SEO Optimization",
      "Social Media Integration",
      "Performance Optimization",
      "Deployment Support",
    ],

    button: "Choose Professional",
  },

  {
    id: 3,
    name: "Full-Stack",
    subtitle: "For powerful web applications",
    icon: <FaCrown />,
    price: "$700",
    popular: false,

    description:
      "A complete MERN stack web application with backend, database, authentication and API integration.",

    features: [
      "Custom React Frontend",
      "Node.js & Express Backend",
      "MongoDB Database",
      "REST API Development",
      "User Authentication",
      "Authorization & Protected Routes",
      "Admin Dashboard",
      "CRUD Functionality",
      "Third-Party API Integration",
      "Deployment & Configuration",
    ],

    button: "Build My Application",
  },

  {
    id: 4,
    name: "Custom",
    subtitle: "For complex requirements",
    icon: <FaComments />,
    price: "Let's Talk",
    popular: false,

    description:
      "For startups, companies and businesses that need a customized solution with advanced functionality.",

    features: [
      "Everything in Full-Stack",
      "Advanced Web Applications",
      "AI Integration",
      "Real-Time Features",
      "Advanced Authentication",
      "Payment Integration",
      "Cloud Services",
      "Custom API Development",
      "Advanced Database Architecture",
      "Long-Term Support",
    ],

    button: "Discuss Your Project",
  },
];

const Pricing = () => {
  return (
    <main className="min-h-screen bg-[#171312] text-white pt-28 pb-20">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[#F28C28] text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold">
            Pricing
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 leading-tight">
            Simple pricing.
            <br />
            <span className="text-gray-400">Powerful solutions.</span>
          </h1>

          <p className="text-gray-500 mt-6 leading-7 text-sm sm:text-base">
            Choose a package that fits your project. Every project is different,
            so packages can be customized according to your requirements.
          </p>
        </div>

        {/* =====================================================
            PRICING CARDS
        ===================================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-16 items-stretch">
          {pricingPackages.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col rounded-3xl p-6 sm:p-7 border transition-all duration-300 hover:-translate-y-2 ${
                item.popular
                  ? "bg-[#241d18] border-[#F28C28] shadow-[0_0_40px_rgba(242,140,40,0.08)]"
                  : "bg-[#1F1F1F] border-gray-800 hover:border-[#F28C28]/50"
              }`}
            >
              {/* Popular */}
              {item.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#F28C28] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                  item.popular
                    ? "bg-[#F28C28] text-white"
                    : "bg-[#F28C28]/10 text-[#F28C28]"
                }`}
              >
                {item.icon}
              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold mt-6">{item.name}</h2>

              <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>

              {/* Price */}
              <div className="mt-7 min-h-[60px]">
                {item.price === "Let's Talk" ? (
                  <h3 className="text-3xl font-bold text-[#F28C28]">
                    Let's Talk
                  </h3>
                ) : (
                  <div>
                    <span className="text-gray-500 text-sm">Starting at</span>

                    <div className="flex items-end gap-1 mt-1">
                      <span className="text-4xl font-bold">{item.price}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-6 mt-5 min-h-[96px]">
                {item.description}
              </p>

              {/* Button */}
              <Link
                to="/get_in_touch"
                className={`w-full text-center rounded-xl py-3 font-semibold transition duration-300 mt-6 ${
                  item.popular
                    ? "bg-[#F28C28] text-white hover:bg-orange-500"
                    : "border border-[#F28C28] text-[#F28C28] hover:bg-[#F28C28] hover:text-white"
                }`}
              >
                {item.button}
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-800 my-7"></div>

              {/* Features */}
              <div className="flex-1">
                <p className="text-sm font-semibold mb-5">What's included:</p>

                <ul className="space-y-3">
                  {item.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-gray-400"
                    >
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#F28C28]/10 flex items-center justify-center">
                        <FaCheck className="text-[#F28C28] text-[10px]" />
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          IMPORTANT NOTE
      ===================================================== */}

      <section className="max-w-4xl mx-auto px-5 sm:px-8 mt-16">
        <div className="rounded-2xl border border-gray-800 bg-[#1F1F1F] p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold">
            Not sure which package you need?
          </h3>

          <p className="text-gray-500 text-sm sm:text-base leading-6 mt-3 max-w-2xl mx-auto">
            No problem. Tell me about your idea, requirements and budget. I'll
            recommend the right solution for your project.
          </p>

          <Link
            to="/get_in_touch"
            className="inline-block mt-6 bg-[#F28C28] hover:bg-orange-500 px-7 py-3 rounded-xl font-semibold transition"
          >
            Let's Discuss Your Project
          </Link>
        </div>
      </section>

      {/* =====================================================
          FAQ / CONDITIONS
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-20">
        <div className="text-center">
          <p className="text-[#F28C28] text-xs tracking-[0.3em] uppercase font-semibold">
            Good To Know
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-3">
            A few things before we start.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          <div className="bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">Custom Requirements</h3>

            <p className="text-gray-500 text-sm leading-6 mt-3">
              Need something not included in a package? Additional features can
              be added based on your project requirements.
            </p>
          </div>

          <div className="bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">Payment</h3>

            <p className="text-gray-500 text-sm leading-6 mt-3">
              A project deposit can be discussed before development begins.
              Remaining payment can be arranged according to project milestones.
            </p>
          </div>

          <div className="bg-[#1F1F1F] border border-gray-800 rounded-2xl p-6">
            <h3 className="font-bold text-lg">Maintenance</h3>

            <p className="text-gray-500 text-sm leading-6 mt-3">
              Ongoing maintenance, updates and additional features can be
              provided separately after project completion.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 mt-20">
        <div className="rounded-3xl bg-[#1F1F1F] border border-gray-800 p-8 sm:p-12 lg:p-14 text-center">
          <p className="text-[#F28C28] text-xs tracking-[0.3em] uppercase font-semibold">
            Let's Build Something
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4">
            Have a different idea?
          </h2>

          <p className="text-gray-500 mt-4 max-w-xl mx-auto leading-6">
            Every great project starts with a conversation. Tell me what you
            want to build and let's figure out the best solution together.
          </p>

          <Link
            to="/get_in_touch"
            className="inline-block mt-7 bg-[#F28C28] hover:bg-orange-500 px-8 py-3 rounded-xl font-semibold transition"
          >
            Get In Touch →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
