import { Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
