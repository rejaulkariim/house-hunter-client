import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="max-w-[1080px] mx-auto px-4 md:px-0">
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default MainLayout;
