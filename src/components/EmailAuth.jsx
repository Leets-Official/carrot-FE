import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Form } from "../styles/Login.styles";
import theme from "../styles/theme/theme";

const EMAIL_VALIDITY = {
  INITIAL: -1,
  INVALID: 0,
  VALID: 1,
};

const REQUEST_STATUS = {
  NOT_REQUESTED: -1,
  FAILED: 0,
  PENDING: 1,
  SUCCESS: 2,
};

const EmailAuth = ({ onSuccess }) => {
  const [emailState, setEmailState] = useState({
    email: "",
    emailAuthCode: "",
    emailValid: EMAIL_VALIDITY.INITIAL, //Email 형식 확인 여부 (-1: 초기 설정 / 0: 형식 X / 1: 형식 O)
    emailRequest: REQUEST_STATUS.NOT_REQUESTED, // Email 인증 요청 여부(-1: 인증 미요청 / 0: 인증 실패 / 1: 인증 요청 api 대기 / 2: 인증 성공)
    emailAuth: REQUEST_STATUS.NOT_REQUESTED, //Email 인증 코드 일치 여부 (-1: 초기 설정 / 0: 인증 실패 / 1: 인증 확인 api 대기 / 2: 인증 성공)
  });

  /*-------이메일 관련 함수---------*/
  // 이메일 입력 핸들러
  const handleChangeEmail = (e) => {
    const input = e.target.value;
    setEmailState((prevState) => ({
      ...prevState,
      email: input,
      emailValid: validateEmail(input),
      emailRequest: REQUEST_STATUS.NOT_REQUESTED,
      emailAuth: REQUEST_STATUS.NOT_REQUESTED,
    }));
  };

  // 이메일 형식 검증 함수
  const validateEmail = (email) => {
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailTest.test(email)
      ? EMAIL_VALIDITY.VALID
      : EMAIL_VALIDITY.INVALID;
  };

  // 이메일 인증 요청
  const onClickRequest = () => {
    setEmailState((prevState) => ({
      ...prevState,
      emailRequest: REQUEST_STATUS.PENDING,
    }));

    // 요청 api
    if (true) {
      setEmailState((prevState) => ({
        ...prevState,
        emailRequest: REQUEST_STATUS.SUCCESS,
        emailAuth: REQUEST_STATUS.NOT_REQUESTED,
      }));
    } else {
      setEmailState((prevState) => ({
        ...prevState,
        emailRequest: REQUEST_STATUS.FAILED,
        emailAuth: REQUEST_STATUS.NOT_REQUESTED,
      }));
    }
  };

  // 이메일 인증 요청 이벤트 (처리 문구)
  const emailInfoText = () => {
    const { emailValid, emailRequest } = emailState;
    if (emailValid === EMAIL_VALIDITY.INVALID)
      return "올바르지 않은 이메일 형식입니다.";
    else if (
      emailValid === EMAIL_VALIDITY.VALID &&
      emailRequest === REQUEST_STATUS.NOT_REQUESTED
    )
      return "이메일 인증을 요청해주세요.";
    else if (emailRequest === REQUEST_STATUS.FAILED)
      return "인증 코드 발송을 실패했습니다.";
    else if (emailRequest === REQUEST_STATUS.PENDING)
      return "인증 코드를 발송 중입니다.";
    else if (emailRequest === REQUEST_STATUS.SUCCESS)
      return "인증 코드 발송이 완료되었습니다.";
    else return "";
  };

  // 인증 코드 일치 여부 확인 함수
  const checkEmailAuthCode = () => {
    setEmailState((prevState) => ({
      ...prevState,
      emailAuth: REQUEST_STATUS.PENDING,
    })); // 대기중

    if (emailState.emailAuthCode == 123) {
      setEmailState((prevState) => ({
        ...prevState,
        emailAuth: REQUEST_STATUS.SUCCESS,
      }));
      onSuccess();
    } else {
      setEmailState((prevState) => ({
        ...prevState,
        emailAuth: REQUEST_STATUS.FAILED,
      }));
    }
  };

  // Email 인증 코드 요청 영역 안내 문구
  const authInfoText = () => {
    const { emailAuth } = emailState;
    if (emailAuth == REQUEST_STATUS.NOT_REQUESTED)
      return "어떤 경우에도 타인에게 공유하지 마세요.";
    else if (emailAuth === REQUEST_STATUS.SUCCESS)
      return "이메일이 인증되었습니다.";
    else if (emailAuth === REQUEST_STATUS.PENDING)
      return "인증 코드를 확인 중입니다.";
    else if (emailAuth === REQUEST_STATUS.FAILED)
      return "잘못된 인증 코드 입니다.";
    else return "";
  };

  return (
    <Form>
      <Input
        color="white"
        border="grey"
        textcolor="black"
        size="20px"
        value={emailState.email}
        onChange={handleChangeEmail}
        disabled={
          emailState.emailRequest === REQUEST_STATUS.PENDING ||
          emailState.emailRequest === REQUEST_STATUS.SUCCESS
        }
      >
        ex. abc@gmail.com
      </Input>
      <div
        className="validEmailRequest"
        style={{
          visibility:
            emailState.emailValid === EMAIL_VALIDITY.INITIAL
              ? "hidden"
              : "visible",
          color:
            emailState.emailRequest === REQUEST_STATUS.SUCCESS ? "blue" : "red",
        }}
      >
        {emailInfoText()}
      </div>
      <Button
        color="white"
        border="silver"
        textcolor={
          emailState.emailValid !== EMAIL_VALIDITY.VALID ? "silver" : "black"
        }
        disabled={
          emailState.emailValid !== EMAIL_VALIDITY.VALID ||
          emailState.emailRequest === REQUEST_STATUS.PENDING
        }
        onClick={onClickRequest}
      >
        인증문자 받기
      </Button>
      {emailState.emailRequest === REQUEST_STATUS.SUCCESS && (
        <Form>
          <Input
            color="white"
            border="grey"
            textcolor="black"
            size="20px"
            value={emailState.emailAuthCode}
            onChange={(e) =>
              setEmailState((prevState) => ({
                ...prevState,
                emailAuthCode: e.target.value,
              }))
            }
          >
            인증번호 입력
          </Input>
          <div
            className="validEmailAuthCode"
            style={{
              color:
                emailState.emailAuth === REQUEST_STATUS.SUCCESS
                  ? "grey"
                  : "red",
            }}
          >
            {authInfoText()}
          </div>
          <Button
            color={
              emailState.emailAuthCode === "" ? "silver" : theme.color.carrot
            }
            textcolor={emailState.emailAuthCode === "" ? "gray" : "white"}
            onClick={checkEmailAuthCode}
          ></Button>
        </Form>
      )}
    </Form>
  );
};

export default EmailAuth;
