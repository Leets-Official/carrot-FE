import styled from "styled-components";

export const InputWrapper = styled.div`
  width: 95%;
  margin-bottom: 16px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const BasicInput = styled.input`
  background-color: ${({ color }) => color || "#ffffff"};
  color: ${({ textColor }) => textColor || "#333"};
  border: 1px solid ${({ border }) => border || "#cccccc"};
  border-radius: 0.5rem;
  width: 100%;
  padding: 15px 10px;
  font-family: "NanumSquareNeo", sans-serif;
  font-size: ${({ size }) => size || "14px"};
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #000000;
  }
`;