import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import RootLayout from "./Layout/RootLayout/RootLayout";
import About from "./Pages/About";
import GetInTouch from "./Pages/getInTouch";
import Skills from "./Pages/skills";
import Registration from "./GlobalComponents/auth/registration";
import PrivacyPolicy from "./Pages/privacyPolicy";
import ProjectPlan from "./Pages/projectPlan";
import Pricing from "./Pages/pricing";
import TermsOfUse from "./Pages/Terms of Use";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/get_in_touch" element={<GetInTouch />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/project_plan" element={<ProjectPlan />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/terms_of_use" element={<TermsOfUse />} />
        </Route>
      </Route>,
    ),
  );
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
