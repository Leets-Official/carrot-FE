import React, { useState } from "react";
import {
  StyledLabel,
  WeekdayContainer,
  WeekdayButton,
  SelectedDaysText,
} from "../styles/WeekdayPickerStyles";

const WeekdayPicker = ({ label, onChange }) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedDays);
    onChange(updatedDays); // 부모 컴포넌트에 선택된 요일 전달
  };

  const formattedSelectedDays = selectedDays
    .slice()
    .sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b))
    .join(", ");

  return (
    <div>
      <StyledLabel>
        {label}{" "}
        {formattedSelectedDays && (
          <SelectedDaysText>({formattedSelectedDays})</SelectedDaysText>
        )}
      </StyledLabel>

      <WeekdayContainer>
        {weekdays.map((day) => (
          <WeekdayButton
            key={day}
            selected={selectedDays.includes(day)}
            onClick={() => toggleDay(day)}
          >
            {day}
          </WeekdayButton>
        ))}
      </WeekdayContainer>
    </div>
  );
};

export default WeekdayPicker;