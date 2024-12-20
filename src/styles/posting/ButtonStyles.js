import styled from "styled-components";

export const BasicButton = styled.button`
  background-color: ${({ color }) => color || "#ff8a3d"}; /* 기본값 추가 */
  color: ${({ textColor }) => textColor || "#ffffff"};
  border: none;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 30px;
  font-family: "NanumSquareNeo", sans-serif;
  font-size: ${({ size }) => size || "16px"};
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8; /* hover 상태 */
  }

  &:active {
    opacity: 0.6; /* active 상태 */
  }
`;