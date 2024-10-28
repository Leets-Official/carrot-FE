import React, { useState } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

const Row = styled.div`
  display: flex;
  gap: 115px; /*시작 글자와 종료 글자 간격. 이렇게 gap으로 해버리면 나중에 화면 간격 조정시 계속 바꿔줘야할텐데 다른 방식으로 구현이 가능할까..?*/
  align-items: center;
  margin-bottom: 8px; 
`;

const TimeSelectContainer = styled.div`
  display: flex;
  gap: 15px; /* 시간 선택란 간격 */
  width: 100%;
`;

const TimeSelectLabel = styled.label`
  font-size: 12px; 
  width: 30%;
  color: #666;
`;

const TimeSelect = styled.select`
  display: flex;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  appearance: none; 
  cursor: pointer;
  width: 45%; /*시간 선택란 크기*/
  
`;

const WaveSymbol = styled.span`
  font-size: 24px;
  color: #666;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const CheckboxLabel = styled.label`
  margin-left: 8px;
  font-size: 14px;
  color: #333;
`;

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
        <TimeSelect value={startTime} onChange={(e) => setStartTime(e.target.value)}>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </TimeSelect>

        <WaveSymbol>~</WaveSymbol>

        <TimeSelect value={endTime} onChange={(e) => setEndTime(e.target.value)}>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </TimeSelect>
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
