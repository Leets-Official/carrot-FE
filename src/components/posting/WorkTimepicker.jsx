import React, { useEffect, useState } from "react";
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
} from "../../styles/posting/WorkTimePickerStyles";

const WorkTimePicker = ({ label, startTime = "09:00", endTime = "18:00", negotiable = false, onChange }) => {
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

  const [time, setTime] = useState({ start: startTime, end: endTime, isNegotiable: negotiable });

  useEffect(() => {
    if (startTime && endTime) { // startTime과 endTime이 존재할 때만 업데이트
      setTime({ start: startTime, end: endTime, isNegotiable: negotiable });
    }
  }, [startTime, endTime, negotiable]);

  const handleTimeChange = (key, value) => {
    const updatedTime = { ...time, [key]: value };
    setTime(updatedTime);
    onChange && onChange(updatedTime); // 부모 컴포넌트에 상태 전달
  };

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
          <TimeSelect value={time.start} onChange={(e) => handleTimeChange("start", e.target.value)}>
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
          <TimeSelect value={time.end} onChange={(e) => handleTimeChange("end", e.target.value)}>
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
        <CustomCheckbox
          checked={time.isNegotiable}
          onChange={(e) => handleTimeChange("isNegotiable", e.target.checked)}
        />
        <CheckboxLabel>협의 가능</CheckboxLabel>
      </CheckboxContainer>
    </>
  );
};

export default WorkTimePicker;