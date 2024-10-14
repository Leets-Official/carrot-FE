import React from "react";
import styled from "styled-components";

const BasicButton = styled.button`
  background-color: ${({ color }) => color};
  color: ${({ textcolor }) => textcolor};
  border: 1px solid ${({ border }) => border};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 5% 10%;
  font-family: "NanumSquareNeo";
  font-size: ${({ size }) => size};
  cursor: pointer;

  &:active:hover {
    opacity: 0.8;
    transition: 0.5s;
  }
`;

const Button = ({ children, color, textcolor, size, border, onClick }) => (
  <BasicButton
    color={color}
    textcolor={textcolor}
    size={size}
    border={border || "transparent"}
    onClick={onClick}
  >
    {children}
  </BasicButton>
);

export default Button;
