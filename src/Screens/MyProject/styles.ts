import styled from "styled-components";

export const MyProjectContainer = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  width: 100%;
  overflow: auto;
`;

export const Description = styled.p`
  margin-top: 24px;
  font-size: 20px;
  line-height: 28px;
  color: white;
  max-width: 100%;
`;

export const TableWarpper = styled.div`
  background-color: ${({ theme }) => theme.Colors.gray._100};
  padding: 32px;
  margin-top: 24px;
  width: 100%;
  border-radius: 8px;
`;

export const ListContainer = styled.table`
  border-radius: 8px;
  border-collapse: collapse;
  width: 100%;

  th {
    color: #cbd5e1;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
    padding: 0px 8px 16px 8px;
  }
`;

export const ListItem = styled.tr`
  cursor: pointer;
  text-align: left;
  border-top: 1px solid ${({ theme }) => theme.Colors.gray._1000};
  border-bottom: 1px solid ${({ theme }) => theme.Colors.gray._1000};
  td:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  td:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  td {
    padding: 24px 8px;

    color: white;
    font-size: 16px;
  }
`;
