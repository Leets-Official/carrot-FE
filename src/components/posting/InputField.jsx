import React, { useState } from "react";
import { InputWrapper, StyledLabel, BasicInput, ErrorMessage } from "../../styles/posting/InputFieldStyles";

const InputField = ({
  label,
  placeholder,
  color = "#ffffff",
  textColor = "#333",
  border = "#cccccc",
  size = "14px",
  onChange,
  onValidityChange, // 유효성 상태 전달 콜백
  minLength = 6,
}) => {
  const [inputValue, setInputValue] = useState("");

  const isValid = label !== "제목" || (inputValue.length >= minLength && inputValue.length <= 30);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    onChange && onChange(value);
    onValidityChange && onValidityChange(isValid); // 유효성 상태 전달
  };

  return (
    <InputWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <BasicInput
        color={color}
        textColor={textColor}
        border={border}
        size={size}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        isValid={isValid} // 수정된 isValid 전달
      />
      {label === "제목" && (
        <ErrorMessage show={!isValid}>
          최소 {minLength}자에서 최대 30자까지 입력할 수 있어요.
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};

export default InputField;