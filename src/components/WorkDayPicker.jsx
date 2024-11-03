import React, { useState } from "react";
import {
  StyledLabel,
  OptionContainer,
  OptionButton,
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

      <OptionContainer>
        {dayOptions.map((option) => (
          <OptionButton
            key={option}
            selected={selectedDayOption === option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </OptionButton>
        ))}
      </OptionContainer>

      {/* 조건부 렌더링으로 오류 방지 */}
      <InputContainer>
        {selectedDayOption === "다른 날짜" && <Calendar />}
        {selectedDayOption === "한 달 이상" && <WeekdayPicker />}
      </InputContainer>
    </div>
  );
}

export default WorkDayPicker;