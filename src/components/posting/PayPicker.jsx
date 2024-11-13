import React, { useState, useEffect } from "react";
import {
  StyledLabel,
  PayOptionContainer,
  PayButton,
  InputContainer,
  PayInput,
  CurrencyLabel,
  MinimumWageInfo,
  ErrorMessage,
} from "../../styles/posting/PayPickerStyles";

function PayPicker({
  label,
  options = ["시급", "건당", "일급", "월급"],
  value = { payType: "시급", pay: "" },
  onChange,
}) {
  const year = 2024;
  const minimumWage = 9860;
  const estimatedDailyWage = minimumWage * 9;

  const [selectedPayOption, setSelectedPayOption] = useState(value.payType);
  const [inputValue, setInputValue] = useState(value.pay?.toString() || "");
  const [formattedValue, setFormattedValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSelectedPayOption(value.payType);
    setInputValue(value.pay?.toString() || "");
    setFormattedValue(formatNumber(value.pay?.toString() || ""));
    setErrorMessage("");
  }, [value]);

  const handleOptionClick = (option) => {
    setSelectedPayOption(option);
    updatePay(option, inputValue);
  };

  const handleInputChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      setInputValue(rawValue);
      setFormattedValue(formatNumber(rawValue));
      updatePay(selectedPayOption, rawValue);
    }
  };

  const updatePay = (payType, value) => {
    const pay = payType === "월급" ? parseInt(value || "0", 10) * 10000 : parseInt(value || "0", 10);
    onChange && onChange({ payType, pay });
  };

  const formatNumber = (value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const validateInput = () => {
    let message = "";
    if (
      (selectedPayOption === "시급" || selectedPayOption === "일급") &&
      inputValue &&
      parseInt(inputValue) < minimumWage
    ) {
      message = `최저임금을 준수해주세요 (${minimumWage.toLocaleString()}원 이상)`;
    } else if (selectedPayOption === "월급" && inputValue && inputValue.length > 7) {
      message = "유효한 값을 입력해주세요.";
    }
    setErrorMessage(message);
  };

  useEffect(() => {
    validateInput();
  }, [inputValue, selectedPayOption]);

  const getCurrencyLabel = () => (selectedPayOption === "월급" ? "만원" : "원");

  const renderWageInfo = () => {
    if (selectedPayOption === "시급" || selectedPayOption === "월급") {
      return (
        <MinimumWageInfo>
          {year}년 최저시급은 <b>{minimumWage.toLocaleString()}</b>원입니다.
        </MinimumWageInfo>
      );
    }
    if (selectedPayOption === "일급") {
      return (
        <MinimumWageInfo>
          {year}년 최저시급은 <b>{minimumWage.toLocaleString()}</b>원이며, 하루 9시간씩 근무할 경우 예상
          일급은 <b>{estimatedDailyWage.toLocaleString()}</b>원 이상입니다.
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
          value={formattedValue}
          onChange={handleInputChange}
          placeholder={selectedPayOption === "시급" ? minimumWage.toString() : "0"}
        />
        <CurrencyLabel>{getCurrencyLabel()}</CurrencyLabel>
      </InputContainer>

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      {renderWageInfo()}
    </div>
  );
}

export default PayPicker;
