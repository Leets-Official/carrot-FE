import React from "react";
import { InputWrapper, StyledLabel, BasicInput } from "../styles/InputFieldStyles";

const InputField = ({
  label, 
  placeholder,
  color = "#ffffff",
  textColor = "#333",
  border = "#cccccc",
  size = "14px",
  onChange,
}) => (
  <InputWrapper>
    {label && <StyledLabel>{label}</StyledLabel>} 
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