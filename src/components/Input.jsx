import React from "react";
import styled from "styled-components";

const BasicInput = styled.input`
  background-color: ${({ color }) => color};
  color: ${({ textcolor }) => textcolor};
  border: 1px solid ${({ border }) => border};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90%;
  padding: 13px 20px;
  font-family: "NanumSquareNeo";
  font-size: ${({ size }) => size};
  cursor: pointer;
`;

const Input = ({ children, color, textcolor, border, size, onChange }) => (
  <BasicInput
    color={color}
    textcolor={textcolor}
    size={size}
    placeholder={children}
    border={border}
    onChange={onChange}
  />
);

export default Input;
