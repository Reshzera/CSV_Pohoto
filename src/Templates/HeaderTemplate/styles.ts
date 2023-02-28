import styled from "styled-components";

export const HeaderemplateContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px;
  max-height: 100vh;
  height: 100vh;
`;

export const Header = styled.div`
  background-color: ${({ theme }) => theme.Colors.gray._100};
  padding: 32px 32px;
  height: max-content;
  width: 100%;
`;
