import React from "react";
import {
  ToggleCardContainer,
  ToggleInfo,
  ToggleIcon,
  ToggleTextContainer,
  ToggleTitle,
  ToggleSubtitle,
  ToggleCircle,
} from "../../styles/ToggleCardStyles";

const ToggleCard = ({ selected, onClick }) => {
  const option = "업무 목적"; 

  return (
    <ToggleCardContainer selected={selected} onClick={onClick}>
      <ToggleInfo>
        <ToggleIcon>🏢</ToggleIcon>
        <ToggleTextContainer>
          <ToggleTitle>{option}</ToggleTitle>
          <ToggleSubtitle>예) 서빙, 주방보조, 매장관리/판매 등</ToggleSubtitle>
        </ToggleTextContainer>
      </ToggleInfo>
      <ToggleCircle checked={selected} />
    </ToggleCardContainer>
  );
};

export default ToggleCard;