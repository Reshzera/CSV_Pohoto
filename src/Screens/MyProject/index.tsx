import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../Components/Title";
import {
  ListContainer,
  ListItem,
  MyProjectContainer,
  TableWarpper,
} from "./styles";

// import { Container } from './styles';
type projectListTYype = {
  ProjectInfo: {
    pathFolder: string;
    name: string;
    date: string;
    description: string;
    lastImageIndex: string;
    totalImage: string;
  };
};
const MyProject: React.FC = () => {
  const [projectList, setProjectList] = useState<projectListTYype[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.api.post("/list-projects", {});
    window.api.get("/list-projects", (res) => {
      console.log(res);
      if (res.response) {
        setProjectList(res.response.result);
      }
    });
  }, []);

  return (
    <MyProjectContainer>
      <Title name="Meus Projetos" />
      <TableWarpper>
        <ListContainer>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Caminho</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((item, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  navigate("/project", {
                    state: {
                      projectName: item.ProjectInfo.name,
                      lastImageIndex: Number(item.ProjectInfo.lastImageIndex),
                    },
                  });
                }}
              >
                <td>{item.ProjectInfo.name}</td>
                <td>{item.ProjectInfo.description}</td>
                <td>{item.ProjectInfo.date}</td>
                <td>{item.ProjectInfo.pathFolder}</td>

                <td>
                  {((Number(item.ProjectInfo.lastImageIndex) + 1) /
                    Number(item.ProjectInfo.totalImage)) *
                    100}
                  %
                </td>
              </ListItem>
            ))}
          </tbody>
        </ListContainer>
      </TableWarpper>
    </MyProjectContainer>
  );
};

export default MyProject;
