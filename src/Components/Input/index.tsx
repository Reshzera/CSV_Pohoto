import React from "react";
import { ContainerInput } from "./styles";

// import { Container } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelInput: string;
}

const Input: React.FC<InputProps> = ({ labelInput, ...props }) => {
  return (
    <ContainerInput>
      <label>{labelInput}</label>
      <input {...props} />
    </ContainerInput>
  );
};

export default Input;
