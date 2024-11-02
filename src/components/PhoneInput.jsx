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

const PhoneInput = ({ label }) => {
  const [phone, setPhone] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [noCalls, setNoCalls] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9-]/g, "");
    setPhone(filteredValue);
    setIsValid(/^\d{3}-\d{4}-\d{4}$/.test(filteredValue));
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
      <ErrorMessage show={!isValid}>
        유효한 연락처를 입력해 주세요. (ex: 010-0000-0000)
      </ErrorMessage>

      <CheckboxContainer>
        <CustomCheckbox
          checked={noCalls}
          onChange={() => setNoCalls(!noCalls)}
        />
        <CheckboxLabel>전화 안 받기</CheckboxLabel>
      </CheckboxContainer>
    </InputWrapper>
  );
};

export default PhoneInput;
