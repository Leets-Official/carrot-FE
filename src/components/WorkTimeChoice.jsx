import React, { useState } from "react";
import {
  StyledLabel,
  OptionContainer,
  OptionButton,
  InputContainer,
} from "../styles/WorkTimeChoiceStyles.js";
import WorkTimePicker from "./WorkTimepicker";

function WorkTimeChoice({ label }) {
  const [selectedTimeOption, setSelectedTimeOption] = useState("협의 가능");

  const dayOptions = ["협의 가능", "시간 설정"];

  const handleOptionClick = (option) => {
    setSelectedTimeOption(option);
  };

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}

      <OptionContainer>
        {dayOptions.map((option) => (
          <OptionButton
            key={option}
            selected={selectedTimeOption === option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </OptionButton>
        ))}
      </OptionContainer>

      {/* 조건부 렌더링으로 오류 방지 */}
      <InputContainer>
        {selectedTimeOption === "시간 설정" && <WorkTimePicker showNegotiable={false}/>}
      </InputContainer>
    </div>
  );
}

export default WorkTimeChoice;