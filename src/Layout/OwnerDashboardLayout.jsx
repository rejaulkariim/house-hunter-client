import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const OwnerDashboardLayout = () => {
  return (
    <div className="max-w-[1080px] mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default OwnerDashboardLayout;
