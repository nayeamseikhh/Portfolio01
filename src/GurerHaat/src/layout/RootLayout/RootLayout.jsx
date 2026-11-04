import { Outlet } from "react-router";
import Footer from "../../globalComponents/header/footer";

const RootLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
      <Footer />
    </>
  );
};

export default RootLayout;
