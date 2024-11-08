import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const WeekdayContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const WeekdayButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#000000" : "#ffffff")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#000000")};
  border: 1px solid #cccccc;
  border-radius: 50px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
`;

export const SelectedDaysText = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #666;
`;