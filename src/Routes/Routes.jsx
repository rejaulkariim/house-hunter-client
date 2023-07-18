import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/contact",
            element:<Contact/>
        },
        {
            path:"/about",
            element:<About/>
        },
    ]
  },
]);

export default router;
