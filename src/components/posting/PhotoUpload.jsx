import React, { useState, useRef } from "react";
import {
  StyledLabel,
  UploadContainer,
  UploadBox,
  UploadText,
  UploadIcon,
  PreviewContainer,
  PreviewImage,
  RemoveButton,
} from "../../styles/PhotoUploadStyles";

const PhotoUpload = ({ label }) => {
  const [photos, setPhotos] = useState([]);
  const maxPhotos = 10;

  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos, ...files].slice(0, maxPhotos);
    setPhotos(newPhotos);
  };

  const handleUploadClick = () => {
    if (photos.length < maxPhotos) {
      fileInputRef.current.click();
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && <StyledLabel>{label} (선택)</StyledLabel>}
      <UploadText>사진이 있으면 더 많은 사람들이 확인해요.</UploadText>
      <UploadContainer>
        {photos.map((photo, index) => (
          <PreviewContainer key={index}>
            <PreviewImage src={URL.createObjectURL(photo)} alt={`preview-${index}`} />
            <RemoveButton onClick={() => removePhoto(index)}>✕</RemoveButton>
          </PreviewContainer>
        ))}
        {photos.length < maxPhotos && (
          <UploadBox onClick={handleUploadClick}>
            <UploadIcon>📷</UploadIcon>
            <span>{`${photos.length}/${maxPhotos}`}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </UploadBox>
        )}
      </UploadContainer>
    </div>
  );
};

export default PhotoUpload;