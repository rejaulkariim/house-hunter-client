import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RenterDashboardLayout = () => {
  return (
    <div className="max-w-[1080px] mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RenterDashboardLayout;
