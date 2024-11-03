import React, { useState, useEffect } from "react";
import {
  StyledLabel,
  PayOptionContainer,
  PayButton,
  InputContainer,
  PayInput,
  CurrencyLabel,
  MinimumWageInfo,
} from "../styles/PayPickerStyles";

function PayPicker({ label, options = ["시급", "건당", "일급", "월급"] }) {
  // 연도와 최저시급은 매년 변동이 있으므로 변수로 처리
  const year = 2024; 
  const minimumWage = 9860; 
  const estimatedDailyWage = minimumWage * 9; 

  const [selectedPayOption, setSelectedPayOption] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(""); 
  }, [selectedPayOption]);

  const handleOptionClick = (option) => {
    setSelectedPayOption(option);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setInputValue(value); // 숫자만 입력 허용
    }
  };

  const getCurrencyLabel = () =>
    selectedPayOption === "월급" ? "만원" : "원"; 

  const getPlaceholder = () =>
    selectedPayOption === "시급" ? minimumWage.toString() : "0"; 

  const renderWageInfo = () => {
    if (selectedPayOption === "시급" || selectedPayOption === "월급") {
      return (
        <MinimumWageInfo>
          {year}년 최저시급은 <b>{minimumWage}</b>원입니다.
        </MinimumWageInfo>
      );
    }
    if (selectedPayOption === "일급") {
      return (
        <MinimumWageInfo>
          {year}년 최저시급은 <b>{minimumWage}</b>원이며, 하루 9시간씩 근무할 경우 예상 일급은 <b>{estimatedDailyWage}</b>원 이상입니다.
        </MinimumWageInfo>
      );
    }
    return null;
  };

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}

      <PayOptionContainer>
        {options.map((option) => (
          <PayButton
            key={option}
            selected={selectedPayOption === option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </PayButton>
        ))}
      </PayOptionContainer>

      <InputContainer>
        <PayInput
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={getPlaceholder()} 
        />
        <CurrencyLabel>{getCurrencyLabel()}</CurrencyLabel>
      </InputContainer>

      {renderWageInfo()}
    </div>
  );
}

export default PayPicker;
