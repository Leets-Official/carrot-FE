import React from "react";
import ToggleCard from "./ToggleCard";
import TagToggle from "./TagToggle";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

const Toggle = ({ label, styleType, options, selectedOption, onChange }) => {
  return (
    <div>
      {/* 라벨이 있을 경우 표시 */}
      {label && <StyledLabel>{label}</StyledLabel>}

      {/* 스타일 타입에 따른 조건부 렌더링 */}
      {styleType === "card" ? (
        <div>
          {options.map((option, index) => (
            <ToggleCard
              key={index}
              option={option}
              selected={selectedOption === option}
              onClick={() => onChange(option)}
            />
          ))}
        </div>
      ) : styleType === "tag" ? (
        <TagToggle
          options={options}
          selectedOption={selectedOption}
          onChange={onChange}
        />
      ) : null}
    </div>
  );
};

export default Toggle;
