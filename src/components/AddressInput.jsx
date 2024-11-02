import React from "react";
import {
  StyledLabel,
  InputWrapper,
  TextInput,
  SearchButton,
} from "../styles/AddressInputStyles";

const AddressInput = ({ label, value, onChange }) => {
  const handleSearchClick = () => {
    if (!window.daum) {
      console.error("Daum Postcode API is not loaded");
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data) {
        onChange(data.address); // 선택한 주소를 부모 컴포넌트에 전달
      },
    }).open();
  };
  

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}
      <InputWrapper>
        <TextInput
          type="text"
          placeholder="주소를 입력하세요"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <SearchButton onClick={handleSearchClick}>🔍</SearchButton>
      </InputWrapper>
    </div>
  );
};

export default AddressInput;