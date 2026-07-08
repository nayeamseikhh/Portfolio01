import { Outlet } from "react-router";
import Header from "../../GlobalComponents/HeaderComponents";
import Footer from "../../GlobalComponents/Footer";
const RootLayout = () => {
  return (
    <>
      <div>
        <div>
          <Header />
        </div>
        <Outlet />
        <Footer/>
      </div>
    </>
  );
};

export default RootLayout;
