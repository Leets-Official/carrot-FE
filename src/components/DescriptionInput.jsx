import React, { useState } from "react";
import {
  StyledLabel,
  TextAreaContainer,
  StyledTextArea,
  CharCountContainer,
} from "../styles/DescriptionInputStyles";

const DescriptionInput = ({ label, maxLength = 2000 }) => {
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setText(inputValue);
    }
  };

  return (
    <div>
      {label && <StyledLabel>{label} (선택)</StyledLabel>} 
      <TextAreaContainer>
        <StyledTextArea
          placeholder="구체적인 업무 내용, 근무 여건, 지원자가 갖추어야 할 능력 등 우대 사항에 대해 알려주세요."
          value={text}
          onChange={handleTextChange}
        />
      </TextAreaContainer>
      <CharCountContainer>
        {`${text.length}/${maxLength}`}
      </CharCountContainer>
    </div>
  );
};

export default DescriptionInput;