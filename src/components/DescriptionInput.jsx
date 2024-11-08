import React, { useState } from "react";
import {
  StyledLabel,
  TextAreaContainer,
  StyledTextArea,
  CharCountContainer,
  ErrorMessage,
} from "../styles/DescriptionInputStyles";

const DescriptionInput = ({ label, maxLength = 2000, minLength = 15 }) => {
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(true); // 유효성 상태

  const handleTextChange = (e) => {
    const inputValue = e.target.value;
    setText(inputValue);
    setIsValid(inputValue.length >= minLength || inputValue.length === 0); // 최소 글자 수 체크
  };

  return (
    <div>
      {label && <StyledLabel>{label} (선택)</StyledLabel>} 
      <TextAreaContainer>
        <StyledTextArea
          placeholder="구체적인 업무 내용, 근무 여건, 지원자가 갖추어야 할 능력 등 우대 사항에 대해 알려주세요."
          value={text}
          onChange={handleTextChange}
          isValid={isValid} // isValid 전달
        />
      </TextAreaContainer>
      <ErrorMessage show={!isValid}>
        최소 {minLength}자 이상 입력해주세요.
      </ErrorMessage>
      <CharCountContainer>
        {`${text.length}/${maxLength}`}
      </CharCountContainer>
    </div>
  );
};

export default DescriptionInput;