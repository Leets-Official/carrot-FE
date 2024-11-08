import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding-right: 30px;
`;

export const TagButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#000000" : "#ffffff")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#000000")};
  border: 1px solid ${({ selected }) => (selected ? "#000000" : "#cccccc")};
  border-radius: 50px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
  padding: 0;

  &:hover {
    color: #333;
  }
`;

export const AddTagButton = styled.button`
  background-color: #ff8a3d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 8px;
  cursor: pointer;
  font-size: 12px;
`;

export const TagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

export const TagInputField = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #ff8a3d;
  }
`;