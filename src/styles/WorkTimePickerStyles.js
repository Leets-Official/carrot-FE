import styled from "styled-components";

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

export const Row = styled.div`
  display: flex;
  gap: 110px;
  align-items: center;
  margin-bottom: 8px;
`;

export const TimeSelectContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  position: relative;
`;

export const TimeSelectLabel = styled.label`
  font-size: 12px;
  width: 30%;
  color: #666;
`;

export const TimeSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 45%;
`;

export const TimeSelect = styled.select`
  display: flex;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  appearance: none;
  cursor: pointer;
  width: 100%;
`;

export const DropdownIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  pointer-events: none;
`;

export const WaveSymbol = styled.span`
  font-size: 24px;
  color: #666;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

export const CheckboxLabel = styled.label`
  margin-left: 4px;
  font-size: 12px;
  color: #333;
`;