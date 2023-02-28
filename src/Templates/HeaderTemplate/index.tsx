import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Title from "../../Components/Title";
import { HeaderemplateContainer, Header } from "./styles";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

// import { Container } from './styles';

const HeaderTemplate: React.FC = () => {
  const navigate = useNavigate();
  return (
    <HeaderemplateContainer>
      <Header>
        <Title
          name="Voltar"
          icon={
            <MdOutlineArrowBackIosNew
              color="white"
              onClick={() => navigate(-1)}
            />
          }
        />
      </Header>
      <Outlet />
    </HeaderemplateContainer>
  );
};

export default HeaderTemplate;
