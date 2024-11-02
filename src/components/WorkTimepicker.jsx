import React, { useState } from "react";
import {
  StyledLabel,
  Row,
  TimeSelectContainer,
  TimeSelectLabel,
  TimeSelectWrapper,
  TimeSelect,
  DropdownIcon,
  WaveSymbol,
  CheckboxContainer,
  CheckboxLabel,
} from "../styles/WorkTimePickerStyles";

const WorkTimePicker = ({ label }) => {
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const formattedTime = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
        times.push(formattedTime);
      }
    }
    return times;
  };

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");
  const [negotiable, setNegotiable] = useState(false);

  const timeOptions = generateTimeOptions();

  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}

      <Row>
        <TimeSelectLabel>시작</TimeSelectLabel>
        <TimeSelectLabel>종료</TimeSelectLabel>
      </Row>

      <TimeSelectContainer>
        <TimeSelectWrapper>
          <TimeSelect
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </TimeSelect>
          <DropdownIcon>∨</DropdownIcon>
        </TimeSelectWrapper>

        <WaveSymbol>~</WaveSymbol>

        <TimeSelectWrapper>
          <TimeSelect
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </TimeSelect>
          <DropdownIcon>∨</DropdownIcon>
        </TimeSelectWrapper>
      </TimeSelectContainer>

      <CheckboxContainer>
        <input
          type="checkbox"
          checked={negotiable}
          onChange={() => setNegotiable(!negotiable)}
        />
        <CheckboxLabel>협의 가능</CheckboxLabel>
      </CheckboxContainer>
    </>
  );
};

export default WorkTimePicker;