/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Title from "../../Components/Title";
import {
  ControlerImage,
  Header,
  ImageContanier,
  ImageSection,
  ProgressBar,
  ProjectContainer,
  SubmitButton,
} from "./styles";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

// import { Container } from './styles';

const Project: React.FC = () => {
  const location = useLocation();
  const projectName: string = location?.state?.projectName;
  const lastImageIndex: number = location?.state?.lastImageIndex;

  const navigate = useNavigate();
  const InputRef = useRef<HTMLInputElement | null>(null);

  const [imageIndex, setImageIndex] = useState<number>(lastImageIndex ?? 0);
  const [imageName, setImageName] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");
  const [totalImages, setTotalImages] = useState<number>(0);
  const [showSubmitButton, setShowSubmitButton] = useState<boolean>(false);
  const ZoomImageRef = useRef<ReactZoomPanPinchRef | null>(null);

  const getImageInfo = () => {
    window.api.post("/get-photo-info", {
      index: imageIndex,
      projectName: projectName,
    });
    window.api.get("/get-photo-info", (res: any) => {
      // console.log(res);
      if (res.status === 200) {
        setImageName(res.response.name);
        setBase64Image(res.response.imageSource);
        setTotalImages(res.response.totalPhotos);
        if (InputRef.current && res.response.number) {
          InputRef.current.value = res.response.number;
          InputRef.current.select();
        }
      }

      if (res.status === 500) {
        //to-do erro modal
      }
    });
  };
  const saveImageInfo = () => {
    if (InputRef.current) {
      window.api.post("/save-photo-info", {
        index: imageIndex,
        projectName: projectName,
        number: InputRef?.current?.value ?? "",
      });

      window.api.get("/save-photo-info", (res: any) => {
        if (res.status === 200) {
          setImageIndex((prev) => (prev === totalImages - 1 ? prev : prev + 1));
          if (imageIndex === totalImages - 1) {
            setShowSubmitButton(true);
          }
        }
        if (res.status === 500) {
          // setImageIndex(0);
        }
      });
    }
  };

  useEffect(() => {
    if (InputRef.current) {
      InputRef.current.select();
    }
    getImageInfo();
  }, [imageIndex]);

  useEffect(() => {
    if (ZoomImageRef.current) {
      ZoomImageRef.current.resetTransform();
    }
  }, [base64Image]);

  return (
    <ProjectContainer>
      <Header>
        <Title
          name={projectName}
          icon={
            <MdOutlineArrowBackIosNew
              color="white"
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
            />
          }
        />
      </Header>

      <ImageSection>
        <h1>{imageName}</h1>
        <TransformWrapper ref={ZoomImageRef} pinch={{ step: 0.4 }}>
          <TransformComponent>
            <ImageContanier>
              <img src={base64Image} />
            </ImageContanier>
          </TransformComponent>
        </TransformWrapper>
        <ControlerImage>
          <div
            className="next"
            onClick={() => {
              setImageIndex((prev) => (prev === 0 ? prev : prev - 1));
            }}
          >
            <GrFormPrevious />
          </div>
          <input
            placeholder="Ex: 12;43;234"
            ref={InputRef}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                setImageIndex((prev) => (prev === 0 ? prev : prev - 1));
              }
              if (e.key === "ArrowRight" || e.key === "Enter") {
                if (InputRef.current.value) {
                  saveImageInfo();
                }
              }
              if (e.key === "." || e.key === ",") {
                e.preventDefault();
                InputRef.current.value = InputRef.current.value + ";";
              }
            }}
          />
          <div
            className="next"
            onClick={() => {
              saveImageInfo();
            }}
          >
            <GrFormNext />
          </div>
        </ControlerImage>
      </ImageSection>
      {showSubmitButton && (
        <SubmitButton
          onClick={() => {
            navigate("/my-project");
          }}
        >
          Finalizar
        </SubmitButton>
      )}

      <ProgressBar porcentage={100 * ((imageIndex + 1) / totalImages)} />
    </ProjectContainer>
  );
};

export default Project;
