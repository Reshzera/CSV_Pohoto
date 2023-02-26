import styled from "styled-components";

export const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  min-width: 320px;
  min-height: 100%;
  max-height: 100%;
  background-color: ${({ theme }) => theme.Colors.gray._200};
`;

export const NavPillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
  background-color: ${({ theme }) => theme.Colors.gray._800};
  padding: 8px;
  border-radius: 8px;
`;

type NavPillsProps = {
  isActive?: boolean;
};

export const NavPills = styled.div<NavPillsProps>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.Colors.gray._100 : theme.Colors.gray._800};
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  font-size: 16px;
  color: white;
  cursor: pointer;

  transition: 0.1s ease-in;

  svg {
    font-size: 18px;
  }
`;

export const TitleSideMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  h1 {
    font-size: 32px;
    font-weight: 500;
    color: white;
  }
  svg {
    font-size: 32px;
  }
`;
