import React from "react";
import styled from "styled-components";

const ToggleCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid ${({ selected }) => (selected ? "#f2f2f2" : "#cccccc")};
  border-radius: 12px;
  background-color: ${({ selected }) => (selected ? "#f2f2f2" : "#ffffff")};
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ToggleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ToggleIcon = styled.span`
  font-size: 24px;
`;

const ToggleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToggleTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  
`;

const ToggleSubtitle = styled.span`
  font-size: 14px;
  color: #666;
`;

const ToggleCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  background-color: ${({ selected }) => (selected ? "#ff8a3d" : "transparent")};
`;

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
