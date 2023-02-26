import styled from "styled-components";

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: max-content;
  width: 100%;

  label {
    color: white;
    font-size: 18px;
  }

  input {
    outline: none;
    border: none;
    padding: 10px 8px;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
  }
`;
