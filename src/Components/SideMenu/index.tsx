import React from "react";
import {
  NavPills,
  NavPillsContainer,
  SideMenuContainer,
  TitleSideMenu,
} from "./styles";
import {
  AiOutlineFileText,
  AiOutlineLogout,
  AiOutlineFolder,
  AiOutlineFolderAdd,
} from "react-icons/ai";

import { FcCameraIdentification } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <SideMenuContainer>
      <TitleSideMenu>
        <FcCameraIdentification />
        <h1>Photo Identifier</h1>
      </TitleSideMenu>
      <NavPillsContainer>
        <NavPills
          isActive={location.pathname === "/"}
          onClick={() => {
            navigate("/");
          }}
        >
          <AiOutlineFolderAdd />
          Novo Projeto
        </NavPills>
        <NavPills
          isActive={location.pathname === "/my-project"}
          onClick={() => {
            navigate("/my-project");
          }}
        >
          <AiOutlineFolder color="white" />
          Meus Projetos
        </NavPills>
        <NavPills
          isActive={location.pathname === "/my-csv"}
          onClick={() => {
            navigate("/my-csv");
          }}
        >
          <AiOutlineFileText color="white" />
          Meus CSVs
        </NavPills>
        <NavPills>
          <AiOutlineLogout style={{ transform: "rotate(180deg)" }} />
          Sair
        </NavPills>
      </NavPillsContainer>
    </SideMenuContainer>
  );
};

export default SideMenu;
