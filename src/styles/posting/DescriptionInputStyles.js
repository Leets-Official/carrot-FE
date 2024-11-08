import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

export const StyledTextArea = styled.textarea`
  width: 90%;
  height: 100px; 
  padding: 15px;
  font-size: 14px;
  border: 1px solid ${({ isValid }) => (isValid ? "#cccccc" : "#ff0000")};
  border-radius: 8px;
  font-family: "NanumSquareNeo", sans-serif;
  color: #333;
  outline: none;
  resize: none;
background-color: ${({ isValid }) => (isValid ? "#fff" : "#fff5f5")};
  &::placeholder {
    color: #cccccc;
  }

  &:focus {
    border-color: ${({ isValid }) => (isValid ? "#000000" : "#ff0000")};
  }
`

export const CharCount = styled.span`
  position: absolute;
  right: 12px;
  font-size: 12px;
  color: #666;
`;

export const CharCountContainer = styled.div`
  text-align: right; 
  margin-top: 4px; 
  margin-right: 10px;
  font-size: 12px;
  color: #666;
`;

export const ErrorMessage = styled.span`
  display: ${({ show }) => (show ? "block" : "none")};
  color: #ff0000;
  font-size: 12px;
`;