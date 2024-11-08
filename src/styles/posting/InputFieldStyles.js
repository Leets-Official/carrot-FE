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
  background-color: ${({ isValid }) => (isValid ? "#ffffff" : "#fff5f5")};
  border: 1px solid ${({ border }) => border || "#cccccc"};
  color: ${({ textColor }) => textColor || "#333"};
  border-radius: 0.5rem;
  width: 100%;
  padding: 15px 10px;
  font-family: "NanumSquareNeo", sans-serif;
  font-size: ${({ size }) => size || "14px"};
  outline: none;

  &:focus {
    border-color: ${({ isValid }) => (isValid ? "#000000" : "#ff0000")};
  }
`;

export const ErrorMessage = styled.span`
  display: ${({ show }) => (show ? "block" : "none")};
  color: #ff0000;
  font-size: 12px;
  margin-top: 4px;
`;