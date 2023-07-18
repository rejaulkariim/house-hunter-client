import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-16 py-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
