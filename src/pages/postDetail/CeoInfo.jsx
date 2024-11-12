import React, { useEffect, useState } from "react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../styles/PostDetail.style";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";
import { postDetailCEOInfoAPI } from "../../api";
import getAccessToken from "./../../utils/getAccessToken";
import { useDispatch } from "react-redux";

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

const CEOHeaderContainer = styled(HeaderContainer)`
  grid-template-columns: 1fr auto 1fr;
`;

function CeoInfo({ ceoId, isClose }) {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const [ceoInfo, setCeoInfo] = useState(null);

  useEffect(() => {
    postDetailCEOInfoAPI(accessToken, dispatch, ceoId).then((res) => {
      if (res.isSuccess) {
        setCeoInfo(res.data);
      } else {
        alert(res.message);
      }
    });
  }, []);

  return (
    <Container>
      <CEOHeaderContainer>
        <IconX onClick={isClose} />
        <span>사업자 정보</span>
      </CEOHeaderContainer>
      <BodyContainer>
        <Content>
          <div className="title">대표자명</div>
          <div>{ceoInfo?.ceoName}</div>
        </Content>
        <Content>
          <div className="title">사업자등록번호</div>
          <div>{ceoInfo?.ceoNumber}</div>
        </Content>
        <Content>
          <div className="title">업체명</div>
          <div>{ceoInfo?.storeName}</div>
        </Content>
      </BodyContainer>
    </Container>
  );
}

export default CeoInfo;
