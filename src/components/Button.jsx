import React from "react";
import styled from "styled-components";

const BasicButton = styled.button`
  background-color: ${({ color }) => color};
  color: ${({ textcolor }) => textcolor};
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 90%;
  padding: 20px 30px;
  font-family: "NanumSquareNeo";
  font-size: ${({ size }) => size};
  cursor: pointer;

  &:active:hover {
    opacity: 0.8;
    transition: 0.5s;
  }
`;

const Button = ({ children, color, textcolor, size, onClick }) => (
  <BasicButton
    color={color}
    textcolor={textcolor}
    size={size}
    onClick={onClick}
  >
    {children}
  </BasicButton>
);

export default Button;
