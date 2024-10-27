import React from "react";
import styled from "styled-components";

// 스타일 정의
const InputWrapper = styled.div`
  width: 90%;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

const BasicInput = styled.input`
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

// 컴포넌트 정의
const InputField = ({
  label, // 새로운 label prop
  placeholder,
  color = "#ffffff",
  textColor = "#333",
  border = "#cccccc",
  size = "14px",
  onChange,
}) => (
  <InputWrapper>
    {label && <StyledLabel>{label}</StyledLabel>} {/* label이 있으면 표시 */}
    <BasicInput
      color={color}
      textColor={textColor}
      border={border}
      size={size}
      placeholder={placeholder}
      onChange={onChange}
    />
  </InputWrapper>
);

export default InputField;
