import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { Link } from "react-router";
import Container from "../../Container";

const Registration = () => {
  return (
    <>
      <Container>
        <div className="flex justify-center mt-22">
          <div className=" w-full max-w-md bg-[#1F1F1F] rounded-3xl p-10 border border-gray-800 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-5 -mt-4">
              <h1 className="text-4xl font-bold text-white">
                Create <span className="text-[#F28C28]">Account</span>
              </h1>

              <p className="text-gray-400 mt-3">
                Join and start your journey today.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-gray-300 mb-2 block">Full Name</label>

                <input
                  type="text"
                  placeholder="Nayeam Seikh"
                  className="w-full px-4 py-3 rounded-xl bg-[#2A2A2A] border border-gray-700 text-white outline-none focus:border-[#F28C28] duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="example@gmail.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#2A2A2A] border border-gray-700 text-white outline-none focus:border-[#F28C28] duration-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-gray-300 mb-2 block">Password</label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#2A2A2A] border border-gray-700 text-white outline-none focus:border-[#F28C28] duration-300"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-gray-300 mb-2 block">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-[#2A2A2A] border border-gray-700 text-white outline-none focus:border-[#F28C28] duration-300"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="accent-[#F28C28] mt-1" />

                <p className="text-gray-400">
                  I agree to the{" "}
                  <span className="text-[#F28C28] cursor-pointer hover:underline">
                    Terms & Conditions
                  </span>
                </p>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#F28C28] hover:bg-orange-500 duration-300 text-white font-semibold text-lg"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-gray-700 flex-1"></div>

              <span className="text-gray-500 text-sm">OR</span>

              <div className="h-px bg-gray-700 flex-1"></div>
            </div>

            {/* Social Register */}
            <div className="space-y-4">
              <button
                type="button"
                className="w-full bg-[#F28C28] hover:bg-orange-500 rounded-xl py-3 text-white flex items-center justify-center gap-3 duration-300"
              >
                <FaGoogle className="text-xl" />
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full bg-[#F28C28] hover:bg-orange-500 rounded-xl py-3 text-white flex items-center justify-center gap-3 duration-300"
              >
                <FaGithub className="text-xl" />
                Continue with GitHub
              </button>
            </div>

            {/* Login */}
            <p className="text-center text-gray-400 mt-8">
              Already have an account?
              <Link
                to="/login"
                className="text-[#F28C28] font-semibold hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Registration;
