import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
`;

export const TextInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
  font-family: "NanumSquareNeo", sans-serif;

  &::placeholder {
    color: #cccccc;
  }
`;

export const SearchButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;
`;