import styled from "styled-components";
import theme from "./theme/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 810px;
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid #f1f3f5;
  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const BodyContainer = styled.div`
  position: relative;
  width: 100%;
  height: 760px;
  padding: 10% 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  &::-webkit-scrollbar {
    display: none; /* 웹킷 기반 브라우저에서 스크롤바 숨기기 */
  }
`;

const ImageList = styled.div`
  display: flex;
  scroll-snap-type: x mandatory; /* 스크롤 스냅 설정 */
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  flex-shrink: 0; /* 이미지가 축소되지 않도록 설정 */
  scroll-snap-align: center; /* 스크롤 시 중앙 정렬 */
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "black" : "lightgray")};
  margin: 0 5px;
  cursor: pointer;
`;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const Tag = styled.div`
  color: gray;
  background-color: ${theme.color.lightgray};
  border-radius: 5px;
  padding: 3px 5px;
  font-size: 14px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  gap: 10px;

  .title {
    font-weight: 700;
    font-size: 18px;
  }
  .company {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: gray;
  }
  .summary {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #5f5f5f;
  }
  .applicant {
    display: flex;
    align-items: center;
    font-weight: 700;
  }
  .ceoInfo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    .ceo-company {
      display: flex;
      align-items: center;
      margin-left: auto;
      color: #5f5f5f;
      cursor: pointer;
    }
    .img-box {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5%;
  background-color: white;
  border-top: 1px solid ${theme.color.lightgray};
`;

export {
  Container,
  HeaderContainer,
  BodyContainer,
  ImageContainer,
  ImageList,
  Image,
  DotsContainer,
  Dot,
  TagWrap,
  Tag,
  Content,
  ButtonContainer,
};
