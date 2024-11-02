import React, { useState } from "react";
import {
  StyledLabel,
  PayOptionContainer,
  PayButton,
  InputContainer,
} from "../styles/WorkDayPickerStyles";
import Calendar from "./Calendar";
import WeekdayPicker from "./WeekdayPicker";

function WorkDayPicker({ label }) {
  const [selectedDayOption, setSelectedDayOption] = useState("오늘");

  const dayOptions = ["오늘", "내일", "다른 날짜", "한 달 이상"];

  const handleOptionClick = (option) => {
    setSelectedDayOption(option);
  };

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}

      <PayOptionContainer>
        {dayOptions.map((option) => (
          <PayButton
            key={option}
            selected={selectedDayOption === option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </PayButton>
        ))}
      </PayOptionContainer>

      {/* 렌더링 시 조건부 렌더링이 오류를 방지 */}
      <InputContainer>
        {selectedDayOption === "다른 날짜" ? <Calendar /> : null}
        {selectedDayOption === "한 달 이상" ? <WeekdayPicker /> : null}
      </InputContainer>
    </div>
  );
}

export default WorkDayPicker;