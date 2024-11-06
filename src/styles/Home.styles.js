import styled from "styled-components";
import theme from "./theme/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 810px;
  position: relative;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 20px 10px;
  border-bottom: 10px solid ${theme.color.lightgray};
  gap: 15px;

  .search-bar {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
    border-radius: 10px;
    background-color: ${theme.color.lightgray};
    color: grey;
    font-size: 14px;
  }
`;

export const HeaderMenuContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;

  span {
    font-size: 20px;
    font-weight: 700;
  }

  .header-icons {
    display: flex;
    justify-content: flex-end; /* 아이콘들을 우측으로 정렬 */
    gap: 5px; /* 아이콘 사이에 간격을 두기 */
  }
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10px;
  overflow-y: auto;
  flex-grow: 1;
  max-height: calc(
    810px - 40px - 20px
  ); /* Container의 높이에서 HeaderContainer의 높이를 빼기 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  button {
    background-color: ${theme.color.lightgray};
    color: grey;
    border: none;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;
    font-family: "NanumSquareNeo";
    font-size: 14px;
    cursor: pointer;

    &:active {
      opacity: 0.8;
      transition: 0.5s;
    }
    &:hover {
      opacity: 0.8;
      transition: 0.5s;
    }
  }
`;
