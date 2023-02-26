import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./Screens/Home";
import MyProject from "./Screens/MyProject";
import Project from "./Screens/Project";
import SideMenuTemplate from "./Templates/SideMenuTemplate";

// import { Container } from './styles';

const router = createHashRouter([
  {
    path: "/",
    element: <SideMenuTemplate />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-project",
        element: <MyProject />,
      },
      {
        path: "/my-csv",
        element: <Home />,
      },
    ],
  },
  {
    path: "/project",
    element: <Project />,
  },
]);

const AppsRoutes: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<h1>dasdas</h1>} />;
};

export default AppsRoutes;
