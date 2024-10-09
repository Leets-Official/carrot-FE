import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Logo from "../assets/images/carrot.svg";

import "../styles/Landing.css";

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
      <div className="logo-container">
        <img src={Logo} />
        <div className="logo-captions">
          <div className="logo-caption caption-main">당신 근처의 당근알바</div>
          <div className="logo-caption caption-sub">
            누구나 필요한 사람을 찾고, <br />
            원하는 일자리를 구할 수 있어요.
          </div>
        </div>
      </div>
      <div className="button-container">
        <Button
          color="#ff8a3d"
          textcolor="white"
          size="24px"
          onClick={() => {
            navigate("./signup");
          }}
        >
          시작하기
        </Button>
        <div className="login-buttons">
          <span>이미 계정이 있나요?</span>
          <span
            onClick={() => {
              navigate("./login");
            }}
          >
            로그인
          </span>
        </div>
      </div>
    </Container>
  );
}

export default Landing;
