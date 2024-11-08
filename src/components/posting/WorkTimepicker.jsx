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
  CustomCheckbox,
} from "../../styles/WorkTimePickerStyles";

const WorkTimePicker = ({ label, showNegotiable = true, onChange }) => {
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

  const handleStartChange = (value) => {
    setStartTime(value);
    onChange && onChange({ start: value, end: endTime, isNegotiable: negotiable });
  };

  const handleEndChange = (value) => {
    setEndTime(value);
    onChange && onChange({ start: startTime, end: value, isNegotiable: negotiable });
  };

  const handleNegotiableChange = () => {
    const newNegotiable = !negotiable;
    setNegotiable(newNegotiable);
    onChange && onChange({ start: startTime, end: endTime, isNegotiable: newNegotiable });
  };

  return (
    <>
      {label && <StyledLabel>{label}</StyledLabel>}
      <Row>
        <TimeSelectLabel>시작</TimeSelectLabel>
        <TimeSelectLabel>종료</TimeSelectLabel>
      </Row>
      <TimeSelectContainer>
        <TimeSelectWrapper>
          <TimeSelect value={startTime} onChange={(e) => handleStartChange(e.target.value)}>
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
          <TimeSelect value={endTime} onChange={(e) => handleEndChange(e.target.value)}>
            {timeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </TimeSelect>
          <DropdownIcon>∨</DropdownIcon>
        </TimeSelectWrapper>
      </TimeSelectContainer>
      {showNegotiable && (
        <CheckboxContainer>
          <CustomCheckbox checked={negotiable} onChange={handleNegotiableChange} />
          <CheckboxLabel>협의 가능</CheckboxLabel>
        </CheckboxContainer>
      )}
    </>
  );
};

export default WorkTimePicker;