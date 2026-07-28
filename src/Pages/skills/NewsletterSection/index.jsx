import React from "react";

const NewsletterSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#111111] py-24">
      {/* Background Grid
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:160px_160px]"></div>

      {/* Background Watermark */}
      {/* <div className="absolute -right-40 top-1/2 -translate-y-1/2 text-[600px] font-black text-red-600/10 select-none pointer-events-none">
        &
      </div>  */}

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side */}
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Let's Work Together
            </h2>

            <h2 className="mt-4 text-5xl md:text-7xl font-bold text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,.6)]">
              Mail Us!
            </h2>
          </div>

          {/* Right Side */}
          <div>
            <form className="relative flex flex-col sm:flex-row items-center bg-transparent border border-white/10 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter Your Mail Address"
                className="w-full bg-transparent px-8 py-6 text-white placeholder:text-gray-400 outline-none"
              />

              <button className="m-2 px-10 py-4 rounded-full bg-red-500 text-white font-semibold transition-all duration-300 hover:bg-red-600 hover:shadow-[0_0_40px_rgba(239,68,68,.8)]">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
