import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LogoContainer,
  LogoCaptions,
  CaptionMain,
  CaptionSub,
  ButtonContainer,
  LoginButtons,
} from "../styles/Landing.styles";
import styled from "styled-components";
import theme from "../styles/theme/theme";
import Button from "../components/Button";
import Logo from "../assets/images/carrot.svg";

const Container = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 810px;
`;

function Landing() {
  const navigate = useNavigate();

  return (
    <Container>
      <LogoContainer>
        <img src={Logo} />
        <LogoCaptions>
          <CaptionMain>당신 근처의 당근알바</CaptionMain>
          <CaptionSub>
            누구나 필요한 사람을 찾고, <br />
            원하는 일자리를 구할 수 있어요.
          </CaptionSub>
        </LogoCaptions>
      </LogoContainer>
      <ButtonContainer>
        <Button
          color={theme.color.carrot}
          textcolor="white"
          size="24px"
          onClick={() => {
            navigate("/signup");
          }}
        >
          시작하기
        </Button>
        <LoginButtons>
          <span>이미 계정이 있나요?</span>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </button>
        </LoginButtons>
      </ButtonContainer>
    </Container>
  );
}

export default Landing;
