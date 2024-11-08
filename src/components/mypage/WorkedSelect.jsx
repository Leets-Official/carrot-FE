import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme/theme";
import { SelectBox, SelectOptions, Option } from "../SelectBox";

const WorkedSelectBox = styled(SelectBox)`
  width: 100%;
  border: 1px solid ${theme.color.lightgray};
`;
const WorkedSelectOptions = styled(SelectOptions)`
  border: 1px solid ${theme.color.lightgray};
`;
const WorkedOption = styled(Option)`
  border-bottom: 1px solid ${theme.color.lightgray};
`;

function WorkedSelect({
  label,
  options,
  selectedValue,
  onSelect,
  visible,
  setVisible,
}) {
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>{label}</div>
      <WorkedSelectBox onClick={() => setVisible(!visible)}>
        <label>{selectedValue}</label>
        <WorkedSelectOptions $visible={visible}>
          {options.map((option) => (
            <WorkedOption key={option} onClick={() => onSelect(option)}>
              {option}
            </WorkedOption>
          ))}
        </WorkedSelectOptions>
      </WorkedSelectBox>
    </div>
  );
}

export default WorkedSelect;
