import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const UploadBox = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f5f5f5;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const UploadIcon = styled.div`
  font-size: 24px;
  color: #666;
`;

export const UploadText = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
`;

export const PreviewContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;