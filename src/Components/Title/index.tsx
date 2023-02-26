import React from "react";
import { ContainerTitle } from "./styles";

// import { Container } from './styles';

type TitleProps = {
  name: string;
  icon?: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ icon, name }) => {
  return (
    <ContainerTitle>
      {icon}
      <h1>{name}</h1>
    </ContainerTitle>
  );
};

export default Title;
