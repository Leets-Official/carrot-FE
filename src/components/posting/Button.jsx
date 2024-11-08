import React from "react";
import { BasicButton } from "../../styles/ButtonStyles";

const Button = ({ children, color, textColor, size, onClick }) => (
  <BasicButton
    color={color}
    textColor={textColor}
    size={size}
    onClick={onClick}
  >
    {children}
  </BasicButton>
);

export default Button;