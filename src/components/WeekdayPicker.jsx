import React, { useState } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

const WeekdayContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const WeekdayButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#000000" : "#ffffff")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#000000")};
  border: 1px solid #cccccc;
  border-radius: 50px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

`;

const SelectedDaysText = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #666;
`;

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
    .sort((a, b) => weekdays.indexOf(a) - weekdays.indexOf(b)) // 원래 순서대로 정렬
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
