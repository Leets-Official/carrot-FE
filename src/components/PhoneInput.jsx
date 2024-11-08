import React, { useState } from "react";
import {
  InputWrapper,
  StyledLabel,
  PhoneInputField,
  ErrorMessage,
  CheckboxContainer,
  CheckboxLabel,
  CustomCheckbox,
} from "../styles/PhoneInputStyles";

const PhoneInput = ({ label, onChange }) => { // onChange prop 추가
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [noCalls, setNoCalls] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9-]/g, "");
    setPhone(filteredValue);
    setIsValid(/^\d{3}-\d{4}-\d{4}$/.test(filteredValue));

    // 상태 변경 시 부모로 전달
    onChange({ phone: filteredValue, noCalls });
  };

  const handleCheckboxChange = () => {
    setNoCalls((prev) => {
      const updatedNoCalls = !prev;
      onChange({ phone, noCalls: updatedNoCalls }); // 상태 변경 시 부모로 전달
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