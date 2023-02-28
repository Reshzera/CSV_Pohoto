/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  ControlerImage,
  ImageSection,
  ProgressBar,
  ProjectContainer,
  SubmitButton,
} from "./styles";
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
  const unableNextFunction = useRef<boolean>(false);
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
          // InputRef.current.value = res.response.number;
          InputRef.current.select();
        }
      }

      if (res.status === 500) {
        //to-do erro modal
      }
    });
  };
  const saveImageInfo = () => {
    unableNextFunction.current = true;
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

        unableNextFunction.current = false;
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
      <ProgressBar porcentage={100 * ((imageIndex + 1) / totalImages)} />
      <ImageSection>
        <div>
          <TransformWrapper ref={ZoomImageRef}>
            <TransformComponent>
              <img src={base64Image} />
            </TransformComponent>
          </TransformWrapper>
        </div>
      </ImageSection>

      <ControlerImage>
        {!showSubmitButton && <h1>{imageName}</h1>}

        {showSubmitButton && (
          <SubmitButton
            onClick={() => {
              navigate("/my-project");
            }}
          >
            Finalizar
          </SubmitButton>
        )}
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
              if (InputRef.current.value && !unableNextFunction.current) {
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
    </ProjectContainer>
  );
};

export default Project;
