import React from "react";
import { Link } from "react-router";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../../../firebase.config";

const LoginForm = ({ open, setOpen }) => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log("User:", result.user);

      alert(`Welcome ${result.user.displayName}`);

      setOpen(false);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      ></div>
      <div
        className={`fixed right-0 top-0 z-50 h-screen w-[420px] bg-black02  shadow-2xl transition-all duration-500
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <section className="min-h-screen bg-[#171312] flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#1F1F1F] rounded-3xl p-10 border border-gray-800 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white">
                Welcome <span className="text-[#F28C28]">Back</span>
              </h1>

              <p className="text-gray-400 mt-3">
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form className="space-y-5">
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

              {/* Remember */}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-400">
                  <input type="checkbox" className="accent-[#F28C28]" />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[#F28C28] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}

              <button className="w-full py-3 rounded-xl bg-[#F28C28] hover:bg-orange-500 duration-300 text-white font-semibold text-lg cursor-pointer">
                Log In
              </button>
            </form>

            {/* Divider */}

            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-gray-700 flex-1"></div>

              <span className="text-gray-500 text-sm">OR</span>

              <div className="h-px bg-gray-700 flex-1"></div>
            </div>

            {/* Social Login */}

            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full border border-gray-700 hover:border-[#F28C28] rounded-xl py-3 text-white flex items-center justify-center gap-3 duration-300"
              >
                <FaGoogle className="text-red-500 text-xl" />
                Continue with Google
              </button>

              <button
                onClick={handleGithubLogin}
                className="w-full border border-gray-700 hover:border-[#F28C28] rounded-xl py-3 text-white flex items-center justify-center gap-3 duration-300"
              >
                <FaGithub className="text-xl" />
                Continue with GitHub
              </button>
            </div>

            {/* Register */}

            <p className="text-center text-gray-400 mt-8">
              Don't have an account?
              <Link
                to="/registration"
                className="text-[#F28C28] font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default LoginForm;
