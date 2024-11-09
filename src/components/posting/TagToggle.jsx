import React from "react";
import { TagToggleContainer, ToggleButton } from "../../styles/posting/TagToggleStyles";

const TagToggle = ({ options, selectedOption, onChange }) => (
  <TagToggleContainer>
    {options.map((option, index) => (
      <ToggleButton
        key={index}
        selected={selectedOption === option}
        onClick={() => onChange(option)}
      >
        {option}
      </ToggleButton>
    ))}
  </TagToggleContainer>
);

export default TagToggle;