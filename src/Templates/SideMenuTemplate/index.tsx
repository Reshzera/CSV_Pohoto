import React from "react";
import SideMenu from "../../Components/SideMenu";
import { Outlet } from "react-router-dom";
import { SideMenuTemplateContainer } from "./styles";

const SideMenuTemplate: React.FC = () => {
  return (
    <SideMenuTemplateContainer>
      <SideMenu />
      <Outlet />
    </SideMenuTemplateContainer>
  );
};

export default SideMenuTemplate;
