import React from "react";
import styled from "styled-components";

const BasicLabel = styled.label`
  font-size: 16px;
  font-weight: 400;
`;

const BasicInput = styled.input`
  background-color: ${({ color }) => color};
  color: ${({ textcolor }) => textcolor};
  border: 1px solid ${({ border }) => border};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90%;
  padding: 5%;
  font-family: "NanumSquareNeo";
  font-size: ${({ size }) => size};
  cursor: pointer;
`;

const Input = ({
  label,
  children,
  color,
  textcolor,
  border,
  size,
  value,
  onChange,
}) => {
  return (
    <>
      {label ? <BasicLabel>{label}</BasicLabel> : null}
      <BasicInput
        value={value}
        color={color}
        textcolor={textcolor}
        size={size}
        placeholder={children}
        border={border}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
