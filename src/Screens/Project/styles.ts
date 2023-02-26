import styled from "styled-components";

export const ProjectContainer = styled.main`
  padding: 0px;
  flex-direction: column;
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.Colors.gray._100};
  padding: 32px 32px;
  height: max-content;
  width: 100%;
  inset: 0;
`;

export const ImageContanier = styled.div`
  height: 60vh;
  background-color: black;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ImageSection = styled.section`
  margin: 0 auto;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 24px;
    color: white;
    font-weight: 700;
    margin-bottom: 16px;
  }
`;

export const ControlerImage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  gap: 8px;

  input {
    border: none;
    outline: none;
    padding: 10px 8px;
    border-radius: 4px;
    font-size: 16px;
    width: 300px;
  }

  div.next {
    border-radius: 8px;
    padding: 8px;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type ProgressBarProps = {
  porcentage: number;
};
export const ProgressBar = styled.div<ProgressBarProps>`
  display: flex;
  position: relative;
  background-color: gray;
  width: 90%;
  height: 8px;
  align-self: center;
  margin-top: auto;
  margin-bottom: 32px;
  border-radius: 8px;

  ::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    background-color: lightgreen;
    border-radius: 8px;
    width: ${({ porcentage }) => `${porcentage}%`};
    max-width: 100%;
    height: 8px;
    transition: 0.5s ease-in;
  }
`;

export const SubmitButton = styled.button`
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  background-color: lightgreen;
  font-size: 16px;
  margin-top: 16px;
  color: darkgreen;
  margin: auto;
`;
