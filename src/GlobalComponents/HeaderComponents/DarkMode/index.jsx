// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleTheme } from "../../../Service/Redux/features/themeSlice";
import { CiDark, CiLight } from "react-icons/ci";

// function DarkMode() {
//   const dispatch = useDispatch();
//   const darkMode = useSelector((state) => state.theme.darkMode);

//   useEffect(() => {
//     const root = document.documentElement;
//     if (darkMode) {
//       // root.classList.add("dark");
//       document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
//       document.body.style.color = darkMode ? "#fff" : "#000";
//     } else {
//       root.classList.remove("darkMode");
//     }
//   }, [darkMode]);

//   return (
//     <div>
//       <div
//         className="text-4xl font-bold dark-mode"
//         onClick={() => dispatch(toggleTheme())}
//       >
//         <h1>{darkMode ? <CiDark /> : <CiLight />}</h1>
//       </div>
//     </div>
//   );
// }

// export default DarkMode;

import React, { useState } from 'react'

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)
  const handleClick = ()=>{
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = !darkMode ? "#000" : "#fff";
    document.body.style.color = !darkMode ? "#fff" : "#000";
  };

   

  return (
    <>
    <div>
     <div
      className="text-4xl font-bold dark-mode"
        onClick={handleClick}
      >
       
         <h1>{darkMode ?  <CiLight/> :  <CiDark />  }</h1>
       </div>
    </div>
    </>
  )
}

export default DarkMode
