import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import MainLayout from "../Layout/MainLayout";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";
import LoginPage from "../Pages/Login";
import OwnerDashboard from "../Pages/OwnerDashboard";
import RegisterPage from "../Pages/Register";
import RenterDashboard from "../Pages/RenterDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/owner",
        element: <OwnerDashboard />,
      },
      {
        path: "/dashboard/renter",
        element: <RenterDashboard />,
      },
    ],
  },
]);

export default router;
