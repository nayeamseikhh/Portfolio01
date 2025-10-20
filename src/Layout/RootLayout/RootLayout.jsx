import { Outlet } from "react-router";
import Header from "../../GlobalComponents/HeaderComponents";
const RootLayout = () => {
  return (
    <>
      <div>
        <div>
          <Header />
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
