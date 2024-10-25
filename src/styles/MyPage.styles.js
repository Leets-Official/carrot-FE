import styled from "styled-components";
import theme from "./theme/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  position: relative;
`;

const HeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  border-bottom: 1px solid #f1f3f5;

  span {
    font-size: 20px;
    font-weight: 700;
  }
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 10% 0;
`;

/**
 * 유저 프로필 관련 스타일
 */
const ProfileContainer = styled.div`
  width: 90%;
  padding: 0 5%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  button {
    width: 100%;
    padding: 10px 0;
    background-color: #fff3e0;
    color: ${theme.color.carrot};
    font-weight: 700;
    border: none;
    outline: none;
    border-radius: 10px;
    font-family: "NanumSquareNeo";
  }
`;

const ProfileBox = styled.div`
  display: flex;
  gap: 10px;

  .profileImgBox {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;

    > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .captionBox {
    display: flex;
    flex-direction: column;
    gap: 10px;

    span:first-child {
      font-weight: 700;
      font-size: 25px;
    }
    span:last-child {
      font-size: 20px;
      color: grey;
    }
  }
`;
const TabMenuContainer = styled.div`
  display: flex;
  width: 100%;

  .tabBtn {
    flex: 1;
    padding: 3% 0;
    border: none;
    outline: none;
    background-color: white;
    color: gray;
    border-bottom: 1px solid gray;
    font-family: "NanumSquareNeo";
    font-weight: 400;
    &:hover {
      background-color: #f8f9fa;
    }
    &:active {
      background-color: #f8f9fa;
    }
  }
  .tabBtn.focused {
    color: black;
    border-bottom: 1px solid black;
  }
`;
/**
 * 탭 관련 스타일
 */
const TabContent = styled.div`
  width: 100%;
  padding: 0 5px;
`;

export {
  Container,
  HeaderContainer,
  BodyContainer,
  ProfileContainer,
  ProfileBox,
  TabMenuContainer,
  TabContent,
};
