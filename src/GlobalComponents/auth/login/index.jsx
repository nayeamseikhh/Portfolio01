import React, { useState } from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          rounded-xl
          border border-orange
          bg-black02
          px-4 py-2
          font-poppins
          text-lg
          font-semibold
          text-orange
          transition-all
          duration-300
          hover:bg-orange
          hover:text-white
        "
      >
        Log In
      </button>

      <LoginForm open={open} setOpen={setOpen} />
    </>
  );
};

export default Login;
