import React from "react";
import ToggleCard from "./ToggleCard";
import TagToggle from "./TagToggle";
import { StyledLabel } from "../../styles/posting/ToggleStyles";

const Toggle = ({ label, styleType, options, selectedOption, onChange }) => {
  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}

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