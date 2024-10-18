import React, { useState } from "react";
import * as UserInfoStyle from "../../styles/UserInfo.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import theme from "../../styles/theme/theme";

function UserInfo() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ nickname: "", phone: "" });
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

  // 전화번호 형식 확인
  const validatePhoneFormat = () => {
    let phoneRule = /^(010)[0-9]{3,4}[0-9]{4}$/;
    return phoneRule.test(user.phone);
  };

  // 필수 입력사항 체크 함수
  const checkInputFormat = () => {
    if (user.nickname !== "" && user.nickname.length >= 2) {
      if (user.phone !== "" && validatePhoneFormat(user.phone)) {
        // (추가) redux에 유저정보 저장
        navigate("/signup/info/location");
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
            이름을 입력해주세요.(2자이상)
          </Input>
          <Input label="전화번호" border="grey" onChange={onChangePhoneNumber}>
            휴대폰 번호(- 없이 숫자만 입력)
          </Input>
        </UserInfoStyle.Form>
        <Button color={theme.color.carrot} onClick={checkInputFormat}>
          다음으로
        </Button>
      </UserInfoStyle.BodyContainer>
    </UserInfoStyle.Container>
  );
}

export default UserInfo;
