import React, { useState } from "react";
import * as UserInfoStyle from "../../styles/UserInfo.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SelectBox, SelectOptions, Option } from "../../components/SelectBox";
import Button from "../../components/Button";
import Input from "../../components/Input";
import theme from "../../styles/theme/theme";
import { useSignupRouter } from "../../hooks/useSignupRouter";
import { verifyCEOAPI } from "../../api/signupAPI";
import { SET_USER_INFO, VERIFY_CEO } from "../../store/signupInfo";
import { useDispatch } from "react-redux";

function BusinessUserInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 일반유저정보(공통)
  const [user, setUser] = useState({ nickname: "", phone: "" });
  // 사업자 정보 초기 설정
  const [CEOInfo, setCEOInfo] = useState({
    number: "",
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    },
    exponent: "",
  });
  // (select option) 토클 관련 변수
  const [dateVisible, setDateVisible] = useState({
    yearVisible: false,
    monthVisible: false,
    dayVisible: false,
  });
  const [isCEO, setIsCEO] = useState(false); // ceo 인증

  // (select option) year,month,day 값 동적 설정
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, index) => currentYear - index);
  const months = Array.from({ length: 12 }, (_, index) => 12 - index);
  const days = Array.from({ length: 31 }, (_, index) => 31 - index);

  /*----- 공통 정보 입력 관련 함수-----*/
  // 닉네임 입력 함수
  const onChangeNickName = (e) => {
    const input = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      nickname: input,
    }));
  };

  // 전화번호 입력 함수
  const onChangePhoneNumber = (e) => {
    const input = e.target.value;
    setUser((prevState) => ({
      ...prevState,
      phone: input,
    }));
  };

  // 이름 확인
  const validateNickNameFormat = () => {
    if (user.nickname !== "" && user.nickname.length >= 2) return true;
    else return false;
  };
  // 전화번호 형식 확인
  const validatePhoneFormat = () => {
    let phoneRule = /^(010)[0-9]{3,4}[0-9]{4}$/;
    return phoneRule.test(user.phone);
  };

  /*-------사업자 인증 관련 함수-------*/
  const handleCEONumber = (e) => {
    let number = e.target.value;
    setCEOInfo((prevState) => ({
      ...prevState,
      number: number,
    }));
    setIsCEO(false); // 값 변경 시, 인증 초기화
  };

  const handleCEOName = (e) => {
    let name = e.target.value;
    setCEOInfo((prevState) => ({
      ...prevState,
      exponent: name, // 값 변경 시, 인증 초기화
    }));
  };
  const certifyBusiness = async () => {
    // 사업자 인증 API
    try {
      // 1192243829,김태래,2014-07-07
      const data = await verifyCEOAPI(CEOInfo);
      if (data.valid == "01") {
        // 👀 응답코드가 01인 경우에만 인증 (그 외 인증 X)
        setIsCEO(true);
        alert("사업자 인증이 완료되었습니다");
      } else {
        setIsCEO(false);
        alert("사업자 인증을 다시 진행해주세요.");
      }
    } catch (err) {
      console.log(err);
      setIsCEO(false);
    }
  };

  /*-----다음단계 이동가능 여부 확인 함수------*/
  const nextStep = () => {
    //  이름,전화번호/사업자 인증 여부(맨 마지막 인증 정보로)
    if (validateNickNameFormat()) {
      if (validatePhoneFormat()) {
        if (isCEO) {
          console.log(user, CEOInfo, isCEO);
          // 날짜 포맷 변환
          let fullDate = `${CEOInfo.date.year}${String(
            CEOInfo.date.month
          ).padStart(2, "0")}${String(CEOInfo.date.day).padStart(2, "0")}`;

          dispatch(SET_USER_INFO({ name: user.nickname, phone: user.phone }));
          dispatch(
            VERIFY_CEO({
              number: CEOInfo.number,
              date: fullDate,
              exponent: CEOInfo.exponent,
            })
          );
          navigate("/signup/info/location");
        } else {
          alert("사업자 인증을 진행해주세요.");
        }
      } else {
        alert("전화번호를 다시 입력해주세요.");
      }
    } else {
      alert("이름을 다시 입력해주세요.");
    }
  };

  useSignupRouter(3, navigate);

  return (
    <UserInfoStyle.Container>
      <UserInfoStyle.HeaderContainer>
        <IconChevronLeft size={30} onClick={() => navigate("/signup/info")} />
        <span>기본정보 입력</span>
      </UserInfoStyle.HeaderContainer>
      <UserInfoStyle.BodyContainer>
        <UserInfoStyle.BodyTitle>
          서비스 이용을 위한 기본정보를 입력해주세요.
        </UserInfoStyle.BodyTitle>
        <UserInfoStyle.Form>
          <Input label="이름" border="grey" onChange={onChangeNickName}>
            이름을 입력해주세요.
          </Input>
          <Input label="전화번호" border="grey" onChange={onChangePhoneNumber}>
            휴대폰 번호(- 없이 숫자만 입력)
          </Input>
        </UserInfoStyle.Form>
        <UserInfoStyle.Form>
          <Input
            label="사업자 등록번호"
            border="grey"
            value={CEOInfo.number}
            onChange={handleCEONumber}
          >
            사업자등록번호 입력(- 없이 숫자만 입력)
          </Input>
          <div className="opening-date-form">
            <span>개업일자</span>
            <div className="opening-date-box">
              <SelectBox
                onClick={() =>
                  setDateVisible((prevState) => ({
                    ...prevState,
                    yearVisible: !dateVisible.yearVisible,
                  }))
                }
              >
                <label>{CEOInfo.date.year}</label>
                <SelectOptions $visible={dateVisible.yearVisible}>
                  {years.map((year) => (
                    <Option
                      key={year}
                      onClick={() => {
                        setCEOInfo((prev) => ({
                          ...prev,
                          date: { ...prev.date, year },
                        }));
                        setIsCEO(false);
                      }}
                    >
                      {year}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
              <SelectBox
                onClick={() =>
                  setDateVisible((prevState) => ({
                    ...prevState,
                    monthVisible: !dateVisible.monthVisible,
                  }))
                }
              >
                <label>{CEOInfo.date.month}</label>
                <SelectOptions $visible={dateVisible.monthVisible}>
                  {months.map((month) => (
                    <Option
                      key={month}
                      onClick={() => {
                        setCEOInfo((prev) => ({
                          ...prev,
                          date: { ...prev.date, month },
                        }));
                        setIsCEO(false);
                      }}
                    >
                      {month}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
              <SelectBox
                onClick={() =>
                  setDateVisible((prevState) => ({
                    ...prevState,
                    dayVisible: !dateVisible.dayVisible,
                  }))
                }
              >
                <label>{CEOInfo.date.day}</label>
                <SelectOptions $visible={dateVisible.dayVisible}>
                  {days.map((day) => (
                    <Option
                      key={day}
                      onClick={() => {
                        setCEOInfo((prev) => ({
                          ...prev,
                          date: { ...prev.date, day },
                        }));
                        setIsCEO(false);
                      }}
                    >
                      {day}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
            </div>
          </div>
          <Input
            label="대표자명"
            border="grey"
            value={CEOInfo.exponent}
            onChange={handleCEOName}
          >
            대표자명
          </Input>
          <Button
            color={theme.color.carrot}
            textcolor="white"
            onClick={certifyBusiness}
          >
            사업자 인증
          </Button>
        </UserInfoStyle.Form>

        <Button color={theme.color.carrot} textcolor="white" onClick={nextStep}>
          다음으로
        </Button>
      </UserInfoStyle.BodyContainer>
    </UserInfoStyle.Container>
  );
}

export default BusinessUserInfo;
