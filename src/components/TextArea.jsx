import React from "react";
import styled from "styled-components";
import theme from "../styles/theme/theme";

const BasicLabel = styled.label`
  font-size: 16px;
  font-weight: 400;
`;
const BasicTextArea = styled.textarea`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "50px"};
  color: ${({ textcolor }) => textcolor};
  border-radius: 0.5rem;
  border: 1px solid ${theme.color.lightgray};
  font-family: "NanumSquareNeo";
  font-size: ${({ size }) => size};
  resize: none;
  outline: ${theme.color.lightgray};
  cursor: pointer;
`;

const TextArea = ({
  label,
  children,
  width,
  height,
  size,
  value,
  onChange,
}) => (
  <>
    {label ? <BasicLabel>{label}</BasicLabel> : null}{" "}
    <BasicTextArea
      width={width}
      height={height}
      size={size}
      placeholder={children}
      value={value}
      onChange={onChange}
    />
  </>
);

export default TextArea;
