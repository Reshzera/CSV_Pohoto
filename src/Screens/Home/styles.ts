import styled from "styled-components";

export const HomeContainer = styled.div`
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

export const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
`;

export const DirectorySection = styled.div`
  background-color: ${({ theme }) => theme.Colors.darkBlue._100};
  height: 100%;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;

  h1 {
    color: white;
    font-size: 16px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  button {
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.Colors.lightBlue._1000};
    padding: 16px 32px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.Colors.darkBlue._100};
  }
`;

export const ProjectSection = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 30%;
  min-width: 400px;
  background-color: ${({ theme }) => theme.Colors.gray._100};
  border-radius: 16px;
  padding: 24px 24px;

  > h1 {
    color: #c0c0c0;
    font-size: 24px;
    font-weight: 500;
  }
`;

export const FormsWrappers = styled.div`
  margin-top: 32px;
  display: flex;
  width: 100%;
  gap: 24px;
  flex: 1;
  justify-content: center;
  flex-direction: column;
`;

export const SubmitButton = styled.button`
  border: none;
  outline: none;
  padding: 16px;
  height: 100%;
  background-color: lightgreen;
  color: darkgreen;
  margin-top: 24px;
  border-radius: 8px;
  font-size: 16px;
`;
