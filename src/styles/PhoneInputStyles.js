import styled from "styled-components";

export const InputWrapper = styled.div`
  margin-bottom: 14px;
  width: 95%;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const PhoneInputField = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ isValid }) => (isValid ? "#cccccc" : "#ff0000")};
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  background-color: ${({ isValid }) => (isValid ? "#fff" : "#fff5f5")};

  &:focus {
    border-color: #000000;
  }
`;

export const ErrorMessage = styled.span`
  display: block;
  color: #ff0000;
  font-size: 12px;
  margin-top: 4px;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

export const CheckboxLabel = styled.label`
  margin-left: 4px;
  font-size: 12px;
  color: #333;
`;

export const CustomCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #cccccc;
  border-radius: 4px;
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
    top: 2px;
    left: 4px;
    width: 4px;
    height: 6px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;