import styled from "styled-components";

export const ToggleCardContainer = styled.div`
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

export const ToggleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ToggleIcon = styled.span`
  font-size: 24px;
`;

export const ToggleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToggleTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: left;
`;

export const ToggleSubtitle = styled.span`
  font-size: 14px;
  color: #666;
`;

export const ToggleCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #cccccc;
  background-color: ${({ selected }) => (selected ? "#ff8a3d" : "transparent")};
`;