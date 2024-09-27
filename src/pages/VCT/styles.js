import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    max-width: 800px;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

export const Subtitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const ImageContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 400px;
`;

export const FileInput = styled.input`
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  margin-top: 10px;

  &:disabled {
    background-color: #cccccc;
  }
`;

export const LoadingMessage = styled.p`
  font-style: italic;
  color: #666;
  text-align: center;
`;

export const ResultContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CameraContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const VideoPreview = styled.video`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

export const CaptureButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  max-width: 300px;
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  width: 100%;
  max-width: 300px;
`;