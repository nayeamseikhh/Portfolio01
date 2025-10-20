import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../Service/Redux/features/themeSlice";
import { CiDark, CiLight } from "react-icons/ci";

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <div
        className="text-4xl font-bold dark-mode"
        onClick={() => dispatch(toggleTheme())}
      >
        <h1>{darkMode ? <CiDark /> : <CiLight />}</h1>
      </div>
    </div>
  );
}

export default App;
