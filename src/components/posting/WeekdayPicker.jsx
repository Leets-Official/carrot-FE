import React, { useEffect, useState } from "react";
import {
  StyledLabel,
  WeekdayContainer,
  WeekdayButton,
  SelectedDaysText,
} from "../../styles/posting/WeekdayPickerStyles";

const WeekdayPicker = ({ label, selectedDays = [], onChange }) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];
  const dayMap = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  const reverseDayMap = Object.fromEntries(
    Object.entries(dayMap).map(([key, value]) => [value, key])
  );

  const [currentDays, setCurrentDays] = useState([]);

  // 서버에서 받은 영어 요일을 한글로 변환하여 설정
  useEffect(() => {
    const initialDays = (selectedDays || []).map((day) => dayMap[day] || day);
    setCurrentDays(initialDays);
  }, [selectedDays]);
  
  const toggleDay = (day) => {
    const updatedDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];

    setCurrentDays(updatedDays);

    // 부모 컴포넌트로 영어 요일로 변환하여 전송
    const convertedDays = updatedDays.map((d) => reverseDayMap[d]);
    onChange(convertedDays);
  };

  const formattedSelectedDays = currentDays
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
            selected={currentDays.includes(day)}
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
