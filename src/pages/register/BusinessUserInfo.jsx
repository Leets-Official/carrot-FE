import React, { useState } from "react";
import * as UserInfoStyle from "../../styles/UserInfo.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SelectBox, SelectOptions, Option } from "../../components/SelectBox";
import Button from "../../components/Button";
import Input from "../../components/Input";
import theme from "../../styles/theme/theme";

function BusinessUserInfo() {
  const navigate = useNavigate();

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

  /*-------사업자 인증 함수-------*/
  const certifyBusiness = () => {
    // (추가) 사업자 인증 API
    setIsCEO(true); // (추가) redux user상태
    alert("사업자 인증이 완료되었습니다.");
    return true;
  };

  /*-----다음단계 이동가능 여부 확인 함수------*/
  const nextStep = () => {
    //  이름,전화번호/사업자 인증 여부(맨 마지막 인증 정보로)
    if (validateNickNameFormat()) {
      if (validatePhoneFormat()) {
        if (isCEO) {
          console.log(user, CEOInfo, isCEO);
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

  return (
    <UserInfoStyle.Container>
      <UserInfoStyle.HeaderContainer>
        <IconChevronLeft size={30} onClick={() => navigate(-1)} />
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
          <Input label="사업자 등록번호" border="grey">
            사업자등록번호 입력
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
                      onClick={() =>
                        setCEOInfo((prev) => ({
                          ...prev,
                          date: { ...prev.date, year },
                        }))
                      }
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
                      onClick={() =>
                        setCEOInfo((prev) => ({
                          ...prev,
                          date: { ...prev.date, month },
                        }))
                      }
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
                      onClick={() =>
                        setCEOInfo((prev) => ({
                          ...prev,
                          date: { ...prev.date, day },
                        }))
                      }
                    >
                      {day}
                    </Option>
                  ))}
                </SelectOptions>
              </SelectBox>
            </div>
          </div>
          <Input label="대표자명" border="grey">
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
