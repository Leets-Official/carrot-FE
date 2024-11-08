import styled from "styled-components";

export const ToggleCardContainer = styled.div`
  width: ${({ selected }) => (selected ? "95%" : "91%")};
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? "#f8f8f8" : "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
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

export const ToggleCircle = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid ${({ selected }) => (selected ? "#ff8a3d" : "#cccccc")};   background-color: ${({ selected }) => (selected ? "#ff8a3d" : "transparent")};
  border-radius: 50px;
  margin-right: 4px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #ff8a3d; 
    border-color: #ff8a3d;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: translate(-50%, -60%) rotate(45deg); /* 중앙 정렬 및 체크표시 */
    box-sizing: border-box;
  }
`;
