import React, { useState } from "react";
import styled from "styled-components";
import { IconChevronLeft } from "@tabler/icons-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 810px;
  padding: 10px 0;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const BodyContainer = styled.div`
  width: 100%;
`;

const BodyTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  span:first-child {
    font-size: 40px;
    font-weight: 700;
  }
  span:last-child {
    font-size: 30px;
    font-weight: 400;
  }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  .validEmailRequest .validEmailAuthCode {
    font-size: 12px;
  }
`;

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); // 이메일 ID 셋팅
  const [emailAuthCode, setEmailAuthCode] = useState(""); //Email 인증 코드
  const [emailValid, setEmailValid] = useState(-1); //Email 형식 확인 여부 (-1: 초기 설정 / 0: 형식 X / 1: 형식 O)
  const [emailRequest, setEmailRequest] = useState(-1); //Email 인증 요청 여부 (-1: 인증 미요청 / 0: 인증 실패 / 1: 인증 요청 api 대기 / 2: 인증 성공)
  const [emailAuth, setEmailAuth] = useState(-1); //Email 인증 코드 일치 여부 (-1: 초기 설정 / 0: 인증 실패 / 1: 인증 확인 api 대기 / 2: 인증 성공)

  /*-------이메일 관련 함수---------*/
  const handleChangeEmail = (e) => {
    if (emailValid == -1) setEmailValid(0);
    const input = e.target.value;
    setEmail(input);
    setEmailValid(validatEmail(input)); // 이메일 형식 체크
    setEmailRequest(-1); // 이메일 변경 시 인증 요청 초기화
    setEmailAuth(-1); // 이메일 변경 시 인증 코드 일치 여부 초기화
  };

  //Email 형식 조건
  const validatEmail = (e) => {
    const emailtest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailtest.test(e) ? 1 : 0; // (0: 형식 X •인증 X, 1: 형식 O•인증 X)
  };

  //Email 인증 요청 이벤트
  const onClickRequest = () => {
    setEmailRequest(1); //인증 요청 api 대기 상태로 변환
    // 요청 api
    if (true) {
      //요청 성공
      setEmailRequest(2);
      setEmailAuth(-1);
    } else {
      setEmailRequest(0);
      setEmailAuth(-1);
    }
  };

  // 이메일 인증 요청 이벤트 (처리 문구)
  const emailInfoText = () => {
    if (emailValid === 0) return "올바르지 않은 이메일 형식입니다.";
    else if (emailValid === 1 && emailRequest === -1)
      return "이메일 인증을 요청해주세요.";
    else if (emailRequest === 0) return "인증 코드 발송을 실패했습니다.";
    else if (emailRequest === 1) return "인증 코드를 발송 중입니다.";
    else if (emailRequest === 2) return "인증 코드 발송이 완료되었습니다.";
    else return "";
  };

  // 이메일 인증 코드 입력 창
  const handleChangeEmailAuthCode = (e) => {
    setEmailAuthCode(e.target.value);
  };

  // 인증 코드 일치 여부 확인 함수
  const checkEmailAuthCode = () => {
    setEmailAuth(1); //api 연결 대기 상태
    if (emailAuthCode == 123) {
      setEmailAuth(2);
      // 로그인 api -> email 전송
      // 홈화면 이동
      navigate("../home", { replace: true });
    } else {
      setEmailAuth(0);
      // 로그인 실패
    }
  };

  //Email 인증 코드 요청 영역 안내 문구
  const authoInfoText = () => {
    if (emailAuth == -1) return "어떤 경우에도 타인에게 공유하지 마세요.";
    else if (emailAuth === 2) return "이메일이 인증되었습니다.";
    else if (emailAuth === 1) return "인증 코드를 확인 중입니다.";
    else if (emailAuth === 0) return "잘못된 인증 코드 입니다.";
    else return "";
  };

  return (
    <Container>
      <HeaderContainer>
        <IconChevronLeft size={24} onClick={() => navigate("/")} />
      </HeaderContainer>
      <BodyContainer>
        <BodyTitle>
          <span>
            안녕하세요! <br />
            이메일 계정으로 로그인해주세요.
          </span>
          <span>
            이메일 계정은 안전하게 보관되며 이웃들에게 공개되지 않아요.
          </span>
        </BodyTitle>
        <Form>
          <Input
            color="white"
            border="grey"
            textcolor="black"
            onChange={handleChangeEmail}
            disabled={emailRequest === 1 || 2}
          >
            ex. abc@gmail.com
          </Input>
          <div
            className="validEmailRequest"
            style={{
              visibility: emailValid == -1 ? "hidden" : "visible",
              color: emailRequest == 2 ? "blue" : "red",
            }}
          >
            {emailInfoText()}
          </div>
          <Button
            color="white"
            border="silver"
            textcolor={emailValid !== 1 ? "silver" : "black"}
            disabled={emailValid !== 1 || emailRequest === 1}
            onClick={onClickRequest}
          >
            인증문자 받기
          </Button>
        </Form>
        {emailRequest == 2 && (
          <Form>
            <Input
              color="white"
              border="grey"
              textcolor="black"
              onChange={handleChangeEmailAuthCode}
            >
              인증번호 입력
            </Input>
            <div
              className="validEmailAuthCode"
              style={{
                color: emailAuthCode == 2 ? "grey" : "red",
              }}
            >
              {authoInfoText()}
            </div>
            <Button
              color={emailAuthCode == "" ? "silver" : "#ff8a3d"}
              textcolor={emailAuthCode == "" ? "gray" : "white"}
              onClick={checkEmailAuthCode}
            >
              인증번호 확인
            </Button>
          </Form>
        )}
      </BodyContainer>
    </Container>
  );
}

export default Login;
