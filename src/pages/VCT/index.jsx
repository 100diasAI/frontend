import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Title,
  Subtitle,
  ImageContainer,
  FileInput,
  SubmitButton,
  LoadingMessage,
  ResultContainer,
  CameraContainer,
  VideoPreview,
  CaptureButton,
  BackButton,
  ResponsiveImage
} from "./styles";

const VirtualTryOnPage = () => {
  const [humanImg, setHumanImg] = useState(null);
  const [humanImgPreview, setHumanImgPreview] = useState(null);
  const [resultImg, setResultImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [productInfo, setProductInfo] = useState({
    garmImg: "",
    garmentDes: "",
    productName: ""
  });

  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (location.state) {
      const { productImage, productName, productId } = location.state;
      setProductInfo({
        garmImg: productImage,
        garmentDes: productName,
        productName: productName
      });
    }
  }, [location]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setHumanImg(file);
      setHumanImgPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCameraToggle = async () => {
    if (isCameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
        setIsCameraActive(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("No se pudo acceder a la cámara.");
      }
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      setHumanImgPreview(imageDataUrl);
      setHumanImg(imageDataUrl);
      handleCameraToggle();
    }
  };

  const handleSubmit = async () => {
    if (!humanImg) {
      alert("Por favor carga una imagen primero.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://backend-xsy3.onrender.com/virtual", {
        garmImg: productInfo.garmImg,
        humanImg: humanImgPreview,
        garmentDes: productInfo.garmentDes,
      });

      setResultImg(response.data.result);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error al procesar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Title>Prueba Virtual de Ropa - {productInfo.productName}</Title>

      <ImageContainer>
        <Subtitle>Imagen del Producto</Subtitle>
        <ResponsiveImage src={productInfo.garmImg} alt={productInfo.productName} />
      </ImageContainer>

      <ImageContainer>
        <Subtitle>Subir imagen del humano</Subtitle>
        <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
        <SubmitButton onClick={handleCameraToggle}>
          {isCameraActive ? "Desactivar Cámara" : "Usar Cámara"}
        </SubmitButton>
      </ImageContainer>

      {isCameraActive && (
        <CameraContainer>
          <VideoPreview ref={videoRef} autoPlay playsInline />
          <CaptureButton onClick={handleCapture}>Capturar Imagen</CaptureButton>
        </CameraContainer>
      )}

      {humanImgPreview && (
        <ImageContainer>
          <Subtitle>Vista previa</Subtitle>
          <ResponsiveImage src={humanImgPreview} alt="Human Preview" />
        </ImageContainer>
      )}

      <SubmitButton onClick={handleSubmit} disabled={loading}>
        {loading ? "Procesando..." : "Enviar para probar"}
      </SubmitButton>

      {loading && <LoadingMessage>Procesando...</LoadingMessage>}

      {resultImg && (
        <ResultContainer>
          <Subtitle>Resultado</Subtitle>
          <ResponsiveImage src={resultImg} alt="Resultado del Try On" />
        </ResultContainer>
      )}

      <BackButton onClick={handleBack}>Volver a Detalles del Producto</BackButton>
    </Container>
  );
};

export default VirtualTryOnPage;