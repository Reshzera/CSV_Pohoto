/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Description,
  DirectorySection,
  FormSection,
  FormsWrappers,
  HomeContainer,
  ProjectSection,
  SubmitButton,
} from "./styles";
import { FcAddImage } from "react-icons/fc";
import Title from "../../Components/Title";
import Input from "../../Components/Input";
import { useNavigate } from "react-router-dom";

type FormType = {
  name: string;
  date: string;
  description: string;
};

const Home: React.FC = () => {
  const [formData, setFormData] = useState<FormType>({
    name: "",
    date: "",
    description: "",
  });
  const [selectedPath, setSelectedPath] = useState<string>("");
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <Title icon={<FcAddImage />} name="Novo Projeto" />
      <Description>
        Crie projetos personalizados para diferentes eventos. Além disso, você
        pode adicionar notas, etiquetas e classificações para suas fotos.
      </Description>

      <ProjectSection>
        <h1>Informações do Projeto: </h1>
        <FormsWrappers>
          <FormSection>
            <Input
              labelInput="Nome:"
              placeholder="Evento novo"
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />
            <Input
              labelInput="Data:"
              placeholder="12/02/2023"
              type="date"
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, date: e.target.value };
                })
              }
            />
            <Input
              labelInput="Esporte:"
              placeholder="Natação"
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
            />
          </FormSection>

          <DirectorySection>
            <h1>{selectedPath ? selectedPath : "Vazio"}</h1>
            <button
              onClick={async () => {
                const path: string = await window.api.action("/get-path");
                if (path) {
                  setSelectedPath(path);
                }
              }}
            >
              Escolher Diretório
            </button>
          </DirectorySection>
        </FormsWrappers>

        {formData.name && selectedPath && (
          <SubmitButton
            onClick={() => {
              window.api.post("/create-project", {
                pathFolder: selectedPath,
                ...formData,
              });
              window.api.get("/create-project", (res: any) => {
                if (res.status === 200) {
                  navigate("/project", {
                    state: {
                      projectName: formData.name,
                    },
                  });
                }
              });
            }}
          >
            Criar Projeto
          </SubmitButton>
        )}
      </ProjectSection>
    </HomeContainer>
  );
};

export default Home;
