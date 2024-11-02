import React from "react";
import {
  ToggleCardContainer,
  ToggleInfo,
  ToggleIcon,
  ToggleTextContainer,
  ToggleTitle,
  ToggleSubtitle,
  ToggleCircle,
} from "../styles/ToggleCardStyles";

const ToggleCard = ({ option, selected, onClick }) => (
  <ToggleCardContainer selected={selected} onClick={onClick}>
    <ToggleInfo>
      <ToggleIcon>{option === "업무 목적" ? "🏢" : "👥"}</ToggleIcon>
      <ToggleTextContainer>
        <ToggleTitle>{option}</ToggleTitle>
        <ToggleSubtitle>
          {option === "업무 목적"
            ? "예) 서빙, 주방보조, 매장관리/판매 등"
            : "예) 짐 옮기기, 등하원, 반려동물 돌봄 등"}
        </ToggleSubtitle>
      </ToggleTextContainer>
    </ToggleInfo>
    <ToggleCircle selected={selected} />
  </ToggleCardContainer>
);

export default ToggleCard;