import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const PayOptionContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
`;

export const PayButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#000000" : "#ffffff")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#000000")};
  border: 1px solid ${({ selected }) => (selected ? "#000000" : "#cccccc")};
  border-radius: 50px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cccccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  justify-content: space-between;
  font-size: 14px;

`;

export const PayInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
  text-align: left;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;

  ::placeholder {
    color: #cccccc; 
  }
`;

export const CurrencyLabel = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #666;
`;

export const MinimumWageInfo = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;