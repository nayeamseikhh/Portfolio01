import React from "react";
import { Link } from "react-router";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, githubProvider, googleProvider } from "../../../firebase.config";

const LoginForm = ({ open, setOpen }) => {
  // =========================
  // Google Login
  // =========================

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      console.log("Google User:", result.user);

      alert(`Welcome ${result.user.displayName || result.user.email}`);

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // =========================
  // GitHub Login
  // =========================

  const handleGithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);

      console.log("GitHub User:", result.user);

      alert(`Welcome ${result.user.displayName || result.user.email}`);

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <>
      {/* =====================================================
          BACKDROP
      ===================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[9990]

          bg-black/70

          transition-all
          duration-300

          ${
            open
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }
        `}
        onClick={() => setOpen(false)}
      >
        {/* Blur the website behind the overlay */}

        <div
          className="
            absolute
            inset-0

            backdrop-blur-xl
          "
        />
      </div>

      {/* =====================================================
          DRAWER
      ===================================================== */}

      <div
        className={`
          fixed
          right-0
          top-0
          z-[9999]

          h-[100dvh]
          w-full
          max-w-[430px]

          bg-[#181818]

          border-l
          border-white/[0.08]

          shadow-[-20px_0_80px_rgba(0,0,0,0.7)]

          transition-transform
          duration-500
          ease-in-out

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* =================================================
            SCROLLABLE CONTENT
        ================================================= */}

        <div
          className="
            relative
            h-full

            overflow-y-auto

            px-5
            py-6

            sm:px-7
            sm:py-8
          "
        >
          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close login"
            className="
              absolute
              right-5
              top-5
              z-20

              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-full

              border
              border-gray-700

              bg-[#222222]

              text-lg
              text-gray-400

              transition-all
              duration-300

              hover:border-[#F28C28]
              hover:bg-[#F28C28]
              hover:text-white
            "
          >
            ✕
          </button>

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="pt-12">
            <p
              className="
                font-poppins
                text-xs
                font-semibold
                uppercase
                tracking-[3px]
                text-[#F28C28]
              "
            >
              Welcome
            </p>

            <h2
              className="
                mt-3
                font-poppins
                text-3xl
                font-bold
                text-white
              "
            >
              Welcome Back
            </h2>

            <p
              className="
                mt-3
                max-w-sm
                font-poppins
                text-sm
                leading-6
                text-gray-400
              "
            >
              Sign in to continue to your dashboard.
            </p>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form className="mt-8 space-y-5">
            {/* EMAIL */}

            <div>
              <label
                className="
                  mb-2
                  block
                  font-poppins
                  text-sm
                  text-gray-300
                "
              >
                Email Address
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                className="
                  w-full
                  rounded-xl

                  border
                  border-gray-700

                  bg-[#252525]

                  px-4
                  py-3

                  font-poppins
                  text-sm
                  text-white

                  outline-none

                  transition-all
                  duration-300

                  placeholder:text-gray-600

                  focus:border-[#F28C28]
                  focus:ring-1
                  focus:ring-[#F28C28]/20
                "
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label
                className="
                  mb-2
                  block
                  font-poppins
                  text-sm
                  text-gray-300
                "
              >
                Password
              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="
                  w-full
                  rounded-xl

                  border
                  border-gray-700

                  bg-[#252525]

                  px-4
                  py-3

                  font-poppins
                  text-sm
                  text-white

                  outline-none

                  transition-all
                  duration-300

                  placeholder:text-gray-600

                  focus:border-[#F28C28]
                  focus:ring-1
                  focus:ring-[#F28C28]/20
                "
              />
            </div>

            {/* REMEMBER / FORGOT */}

            <div
              className="
                flex
                items-center
                justify-between
                gap-3
              "
            >
              <label
                className="
                  flex
                  items-center
                  gap-2

                  font-poppins
                  text-xs
                  text-gray-400

                  sm:text-sm
                "
              >
                <input type="checkbox" className="accent-[#F28C28]" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="
                  font-poppins
                  text-xs
                  text-[#F28C28]

                  hover:underline

                  sm:text-sm
                "
              >
                Forgot Password?
              </Link>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="
                w-full

                cursor-pointer

                rounded-xl

                bg-[#F28C28]

                py-3.5

                font-poppins
                text-base
                font-semibold
                text-white

                transition-all
                duration-300

                hover:bg-orange-500

                hover:shadow-[0_0_30px_rgba(242,140,40,0.25)]
              "
            >
              Log In
            </button>

            {/* =================================================
                SKIP BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="
                block
                w-full

                cursor-pointer

                py-2

                text-center

                font-poppins
                text-sm
                font-medium

                text-gray-500

                transition-all
                duration-300

                hover:text-[#F28C28]
                hover:underline
              "
            >
              Skip for now
            </button>
          </form>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-700" />

            <span
              className="
                font-poppins
                text-xs
                text-gray-500
              "
            >
              OR
            </span>

            <div className="h-px flex-1 bg-gray-700" />
          </div>

          {/* =================================================
              SOCIAL LOGIN
          ================================================= */}

          <div className="space-y-3">
            {/* GOOGLE */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3

                rounded-xl

                border
                border-gray-700

                bg-transparent

                py-3

                font-poppins
                text-sm
                font-medium
                text-white

                transition-all
                duration-300

                hover:border-[#F28C28]
                hover:bg-white/[0.03]
              "
            >
              <FaGoogle className="text-lg text-red-500" />
              Continue with Google
            </button>

            {/* GITHUB */}

            <button
              type="button"
              onClick={handleGithubLogin}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3

                rounded-xl

                border
                border-gray-700

                bg-transparent

                py-3

                font-poppins
                text-sm
                font-medium
                text-white

                transition-all
                duration-300

                hover:border-[#F28C28]
                hover:bg-white/[0.03]
              "
            >
              <FaGithub className="text-lg" />
              Continue with GitHub
            </button>
          </div>

          {/* =================================================
              REGISTER
          ================================================= */}

          <p
            className="
              mt-7
              pb-5

              text-center

              font-poppins
              text-sm
              text-gray-400
            "
          >
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="
                font-semibold
                text-[#F28C28]

                transition

                hover:underline
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
