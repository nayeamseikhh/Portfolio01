// import React, { useState } from "react";
// import AiDrawer from "../../../Pages/Home/Banner/bossNayeam/AiDrawer";
// import { FaWandMagicSparkles } from "react-icons/fa6";
// import { Link } from "react-router";
// import LoginForm from "./LoginForm";

// const Login = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <>
//       <div className="relative rounded-xl bg-black02 px-4  py-2 border border-orange text-orange cursor-pointer hover:bg-orange hover:text-white transition-all liner-0.3">
//         <Link
//           onClick={() => setOpen(true)}
//           className="flex items-center font-poppins text-lg font-semibold"
//         >
//           Log In
//         </Link>
//         <LoginForm open={open} setOpen={setOpen} />
//       </div>
//     </>
//   );
// };

// export default Login;

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
