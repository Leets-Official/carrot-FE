import React, { useState, useRef, useEffect } from "react";
import {
  StyledLabel,
  UploadContainer,
  UploadBox,
  UploadText,
  UploadIcon,
  PreviewContainer,
  PreviewImage,
  RemoveButton,
} from "../../styles/posting/PhotoUploadStyles";
import { uploadPostImageAPI } from "../../api";
import getAccessToken from "../../utils/getAccessToken";
import { useDispatch } from "react-redux";

const PhotoUpload = ({ label, selectedPhotos, setSelectedPhotos }) => {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const maxPhotos = 10;
  const fileInputRef = useRef(null);

  // 업로드
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadPostImageAPI(accessToken, dispatch, file).then((res) => {
        if (res.isSuccess) {
          const newPhotos = [...selectedPhotos, res.imageUrl.imageUrl];
          setSelectedPhotos(newPhotos); // 부모로 상태 전달
        } else {
          alert(res.message);
        }
      });
    }
  };

  const handleUploadClick = () => {
    if (selectedPhotos.length < maxPhotos) {
      fileInputRef.current.click();
    }
  };

  // 삭제
  const removePhoto = (index) => {
    const newPhotos = selectedPhotos.filter((_, i) => i !== index);
    setSelectedPhotos(newPhotos); // 부모로 상태 전달
  };

  return (
    <div>
      {label && <StyledLabel>{label} (선택)</StyledLabel>}
      <UploadText>사진이 있으면 더 많은 사람들이 확인해요.</UploadText>
      <UploadContainer>
        {selectedPhotos.map((photo, index) => (
          <PreviewContainer key={index}>
            <PreviewImage src={photo} alt={`preview-${index}`} />
            <RemoveButton onClick={() => removePhoto(index)}>✕</RemoveButton>
          </PreviewContainer>
        ))}
        {selectedPhotos.length < maxPhotos && (
          <UploadBox onClick={handleUploadClick}>
            <UploadIcon>📷</UploadIcon>
            <span>{`${selectedPhotos.length}/${maxPhotos}`}</span>
            <input
              type="file"
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
