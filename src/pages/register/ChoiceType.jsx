import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import * as ChoiceTypeStyle from "../../styles/UserInfo.styles";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const UserTypeBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 5%;
  gap: 10px;

  .title {
    font-size: 20px;
    font-weight: 700;
  }
  .caption {
    font-weight: 400;
  }

  &:hover {
    cursor: pointer;
    background-color: #f1f3f5;
  }
  &:active {
    background-color: #f1f3f5;
  }
`;

function ChoiceType() {
  const navigate = useNavigate();

  // redux에 타입 저장
  return (
    <ChoiceTypeStyle.Container>
      <ChoiceTypeStyle.HeaderContainer>
        <IconChevronLeft size={30} onClick={() => navigate(-1)} />
        <span>사용자 타입</span>
      </ChoiceTypeStyle.HeaderContainer>
      <ChoiceTypeStyle.BodyContainer>
        <ChoiceTypeStyle.BodyTitle>
          어떤 용도로 당근알바를 이용하시나요?
        </ChoiceTypeStyle.BodyTitle>
        <ChoiceTypeStyle.Form>
          <UserTypeBox onClick={() => navigate("/signup/info/basic")}>
            <div className="title">일반 유저(구직자)</div>
            <div className="caption">알바를 구하는 목적으로 이용합니다.</div>
          </UserTypeBox>
          <UserTypeBox onClick={() => navigate("/signup/info/business")}>
            <div className="title">사업자 유저(구인자)</div>
            <div className="caption">채용하는 목적으로 이용합니다.</div>
          </UserTypeBox>
        </ChoiceTypeStyle.Form>
      </ChoiceTypeStyle.BodyContainer>
    </ChoiceTypeStyle.Container>
  );
}

export default ChoiceType;
