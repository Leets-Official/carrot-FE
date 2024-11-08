import React, { useState } from "react";
import {
  InputWrapper,
  StyledLabel,
  PhoneInputField,
  ErrorMessage,
  CheckboxContainer,
  CheckboxLabel,
  CustomCheckbox,
} from "../../styles/posting/PhoneInputStyles";

const PhoneInput = ({ label, onChange, onValidityChange }) => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [noCalls, setNoCalls] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9-]/g, ""); // 숫자와 하이픈만 허용
    setPhone(value);
  
    const valid = /^\d{3}-\d{4}-\d{4}$/.test(value); // 올바른 형식인지 확인
    setIsValid(valid); 
    onValidityChange && onValidityChange(valid); // 유효성 상태 부모 전달
    onChange && onChange({ phone: value, noCalls });
  };  

  const handleCheckboxChange = () => {
    setNoCalls((prev) => {
      const updatedNoCalls = !prev;
      onChange && onChange({ phone, noCalls: updatedNoCalls });
      return updatedNoCalls;
    });
  };

  return (
    <InputWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}

      <PhoneInputField
        type="text"
        placeholder="ex) 010-0000-0000"
        value={phone}
        onChange={handlePhoneChange}
        isValid={isValid}
      />

      {!isValid && (
        <ErrorMessage>유효한 연락처를 입력해 주세요. (ex: 010-0000-0000)</ErrorMessage>
      )}

      <CheckboxContainer>
        <CustomCheckbox
          checked={noCalls}
          onChange={handleCheckboxChange}
        />
        <CheckboxLabel>전화 안 받기</CheckboxLabel>
      </CheckboxContainer>
    </InputWrapper>
  );
};

export default PhoneInput;