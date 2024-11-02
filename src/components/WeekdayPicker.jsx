import React, { useState } from "react";
import {
  StyledLabel,
  WeekdayContainer,
  WeekdayButton,
  SelectedDaysText,
} from "../styles/WeekdayPickerStyles";

const WeekdayPicker = ({ label }) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
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