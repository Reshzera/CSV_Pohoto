import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./Screens/Home";
import MyCSV from "./Screens/MyCSV";
import MyProject from "./Screens/MyProject";
import Project from "./Screens/Project";
import HeaderTemplate from "./Templates/HeaderTemplate";
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
        element: <MyCSV />,
      },
    ],
  },
  {
    path: "/project",
    element: <HeaderTemplate />,
    children: [{ path: "/project", element: <Project /> }],
  },
]);

const AppsRoutes: React.FC = () => {
  return <RouterProvider router={router} fallbackElement={<h1>dasdas</h1>} />;
};

export default AppsRoutes;
