import styled from "styled-components";

export const ProjectContainer = styled.div`
  padding: 0px;
  max-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
`;

export const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px;
  max-height: calc(100% - 112px);

  h1 {
    color: white;
  }

  div {
    width: 100%;
    max-height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    user-select: none;

    > * {
      height: 100%;
      width: 100%;
    }

    img {
      object-fit: contain;
    }
  }
`;

export const ControlerImage = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 8px;
  background-color: ${({ theme }) => theme.Colors.gray._100};

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
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 16px;
    color: #fff;
    position: absolute;
    right: 16px;
  }
`;

type ProgressBarProps = {
  porcentage: number;
};
export const ProgressBar = styled.div<ProgressBarProps>`
  display: flex;
  position: relative;
  background-color: gray;
  width: 100%;
  height: 6px;
  align-self: center;

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
    height: 6px;
    transition: 0.5s ease-in;
  }
`;

export const SubmitButton = styled.button`
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: lightgreen;
  font-size: 16px;
  color: darkgreen;
  position: absolute;
  right: 16px;
`;
