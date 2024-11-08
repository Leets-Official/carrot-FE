import styled from "styled-components";

export const TagToggleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ToggleButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#000000" : "#ffffff")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#000000")};
  border: 1px solid ${({ selected }) => (selected ? "#000000" : "#cccccc")};
  border-radius: 50px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
`;