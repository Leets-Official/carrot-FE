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
    emailDuplicate: REQUEST_STATUS.NOT_REQUESTED, // Email 중복 사용 여부 (-1: 인증 미요청 / 0: 인증 실패 / 1: 인증 요청 api 대기 / 2: 인증 성공)
    emailRequest: REQUEST_STATUS.NOT_REQUESTED, // Email 인증 요청 여부(-1: 인증 미요청 / 0: 인증 실패 / 1: 인증 요청 api 대기 / 2: 인증 성공)
    emailAuth: REQUEST_STATUS.NOT_REQUESTED, //Email 인증 코드 일치 여부 (-1: 초기 설정 / 0: 인증 실패 / 1: 인증 확인 api 대기 / 2: 인증 성공)
  });
  const [passwordState, setPasswordState] = useState({
    password: "",
    passwordValid: EMAIL_VALIDITY.INITIAL,
  });

  /*-------이메일 관련 함수---------*/
  // 이메일 입력 핸들러
  const handleChangeEmail = (e) => {
    const input = e.target.value;
    setEmailState((prevState) => ({
      ...prevState,
      email: input,
      emailValid: validateEmail(input),
      emailDuplicate: REQUEST_STATUS.NOT_REQUESTED,
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

  // 이메일 중복 여부 확인 함수
  const checkEmailDuplicate = () => {
    // 이메일 중복 확인 API
    setEmailState((pre) => ({
      ...pre,
      emailDuplicate: REQUEST_STATUS.PENDING,
    }));
    // ex
    if (emailState.email === "aaa@gmail.com") {
      setEmailState((pre) => ({
        ...pre,
        emailDuplicate: REQUEST_STATUS.FAILED,
      }));
    } else {
      setEmailState((pre) => ({
        ...pre,
        emailDuplicate: REQUEST_STATUS.SUCCESS,
      }));
    }
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
    const { emailValid, emailRequest, emailDuplicate } = emailState;
    if (emailValid === EMAIL_VALIDITY.INVALID)
      return "올바르지 않은 이메일 형식입니다.";
    else if (emailDuplicate === REQUEST_STATUS.FAILED) {
      return "이 이메일은 이미 사용 중입니다.";
    } else if (
      emailValid === EMAIL_VALIDITY.VALID &&
      emailDuplicate === REQUEST_STATUS.NOT_REQUESTED
    ) {
      return "이메일 중복확인을 진행해주세요.";
    } else if (
      emailValid === EMAIL_VALIDITY.VALID &&
      emailDuplicate === REQUEST_STATUS.SUCCESS &&
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

  /*---------비밀번호 함수----------*/
  // 비밀번호 형식 검증
  const validatePassword = (password) => {
    // 비밀번호 형식 검증: 최소 8자 이상 / 숫자, 영문, 특수문자 각 1개 이상 포함
    const pwReg = /^(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;
    return pwReg.test(password) ? EMAIL_VALIDITY.VALID : EMAIL_VALIDITY.INVALID;
  };

  const handleChangePassword = (e) => {
    const input = e.target.value;
    setPasswordState((pre) => ({
      ...pre,
      password: input,
      passwordValid: validatePassword(input),
    }));
  };

  /*---다음 단계로---*/
  const handleSignup = () => {
    console.log(emailState.email, passwordState.password);
    onSuccess(emailState.email, passwordState.password);
  };

  return (
    <Form>
      <div className="emailInput">
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
        <Button onClick={checkEmailDuplicate}>중복확인</Button>
      </div>
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
          emailState.emailValid !== EMAIL_VALIDITY.VALID ||
          emailState.emailDuplicate !== REQUEST_STATUS.SUCCESS
            ? "silver"
            : "black"
        }
        disabled={
          emailState.emailValid !== EMAIL_VALIDITY.VALID ||
          emailState.emailRequest === REQUEST_STATUS.PENDING ||
          emailState.emailDuplicate !== REQUEST_STATUS.SUCCESS
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
            size="18px"
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
          >
            인증하기
          </Button>
        </Form>
      )}
      {emailState.emailAuth === REQUEST_STATUS.SUCCESS && (
        <Form>
          <Input
            color="white"
            border="grey"
            textcolor="black"
            size="18px"
            type="password"
            value={passwordState.password}
            onChange={handleChangePassword}
          >
            비밀번호(영문,숫자,특수문자 포함해 8자 이상)
          </Input>
          <Button
            color={
              passwordState.passwordValid === EMAIL_VALIDITY.VALID
                ? theme.color.carrot
                : "silver"
            }
            textcolor={
              passwordState.passwordValid === EMAIL_VALIDITY.VALID
                ? "white"
                : "gray"
            }
            disabled={passwordState.passwordValid !== EMAIL_VALIDITY.VALID}
            onClick={handleSignup}
          >
            다음으로
          </Button>
        </Form>
      )}
    </Form>
  );
};

export default EmailAuth;
