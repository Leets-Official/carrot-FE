import React, { useState, useEffect } from "react";
import {
  InputWrapper,
  StyledLabel,
  PhoneInputField,
  ErrorMessage,
  CheckboxContainer,
  CheckboxLabel,
  CustomCheckbox,
} from "../../styles/posting/PhoneInputStyles";

const PhoneInput = ({ label, value = {}, onChange, onValidityChange }) => {
  const [phone, setPhone] = useState(value.phone || "");
  const [noCalls, setNoCalls] = useState(value.noCalls || false);
  const [isValid, setIsValid] = useState(true);

  // value prop이 변경될 때 내부 상태를 동기화
  useEffect(() => {
    setPhone(value.phone || "");
    setNoCalls(value.noCalls || false);
  }, [value]);

  const handlePhoneChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9-]/g, "");
    setPhone(newValue);
    const valid = /^\d{3}-\d{4}-\d{4}$/.test(newValue);
    setIsValid(valid);
    onValidityChange && onValidityChange(valid);
    onChange && onChange({ phone: newValue, noCalls });
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
        value={phone} // value 설정
        onChange={handlePhoneChange}
        isValid={isValid}
      />
      {!isValid && (
        <ErrorMessage>유효한 연락처를 입력해 주세요. (ex: 010-0000-0000)</ErrorMessage>
      )}
      <CheckboxContainer>
        <CustomCheckbox checked={noCalls} onChange={handleCheckboxChange} />
        <CheckboxLabel>전화 안 받기</CheckboxLabel>
      </CheckboxContainer>
    </InputWrapper>
  );
};

export default PhoneInput;
