import React from "react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../styles/PostDetail.style";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 10px;

  .title {
    font-weight: 700;
    font-size: 18px;
  }
`;

const data = {
  number: "2208680034",
  company: "씨앤코스타",
  ceoName: "전현배",
};

function CeoInfo({ isClose }) {
  return (
    <Container>
      <HeaderContainer>
        <IconX onClick={isClose} />
        <span>사업자 정보</span>
      </HeaderContainer>
      <BodyContainer>
        <Content>
          <div className="title">대표자명</div>
          <div>{data.ceoName}</div>
        </Content>
        <Content>
          <div className="title">사업자등록번호</div>
          <div>{data.number}</div>
        </Content>
        <Content>
          <div className="title">업체명</div>
          <div>{data.company}</div>
        </Content>
      </BodyContainer>
    </Container>
  );
}

export default CeoInfo;
