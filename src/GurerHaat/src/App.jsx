import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import RootLayout from "./layout/RootLayout/RootLayout";
import Home from "./pages/home";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>,
    ),
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
