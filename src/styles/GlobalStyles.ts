import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    box-sizing: border-box;
  }

  main{
    display: flex;
    max-width: 100%;
    min-height: 100vh;
    padding: 32px;
    overflow: hidden;
  }

  body{
    background-color: ${({ theme }) => theme.Colors.gray._800};
  }


  button{
    cursor: pointer;
  }  

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
    margin: 5px 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.Colors.gray._1000};
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
