import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import * as LocationStyle from "../../styles/UserInfo.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import Button from "../../components/Button";
import theme from "../../styles/theme/theme";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSignupRouter } from "../../hooks/useSignupRouter";
import { useDispatch, useSelector } from "react-redux";
import { SET_ADDRESS, RESET_SIGNUP } from "../../store/signupInfo";

const LocationForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 50px 0 30px 0;
  .location-label {
    font-weight: 700;
  }
  .location-input {
    border: 1px solid #d6d6d6;
    color: grey;
    border-radius: 5px;
    padding: 5px 100px 5px 10px;
  }
`;

const LocationBtn = styled.button`
  margin-left: auto;
  height: 30px;
  padding: 0 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: #ff8a3d;
  color: white;
  font-size: 14px;
  font-weight: 400;
  font-family: "NanumSquareNeo";
`;

const postCodeStyle = {
  position: "absolute",
  zIndex: 10,
  width: "360px",
  height: "480px",
};

function InitLocation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signupType, signupEmail, signupPwd, signupName, signupPhone } =
    useSelector((state) => state.signupInfo);
  const [locationData, setLocationData] = useState({
    primaryAddress: "",
    subAddress: "",
  }); // 주소 정보 데이터
  const [openPostcode, setOpenPostcode] = useState(false); // 주소 검색 모달창
  const handleOnComplete = (data) => {
    setLocationData({
      primaryAddress: data.address,
      subAddress: data.bname,
    }); // address(전체 주소), data.bname(동 주소)
    setOpenPostcode(false);
  };

  const handleSignupForm = () => {
    if (locationData.primaryAddress == "") {
      alert("주소는 필수입력사항입니다.");
    } else {
      dispatch(SET_ADDRESS(locationData.subAddress));
      // 회원가입 정보 ALL 제출(axios)
      alert("회원가입이 완료되었습니다");
      console.log(
        signupType,
        signupEmail,
        signupPwd,
        signupName,
        signupPhone,
        locationData.subAddress
      );
      // 로그인 이동
      dispatch(RESET_SIGNUP());
      navigate("/", { replace: true });
    }
  };

  useSignupRouter(4, navigate);

  return (
    <LocationStyle.Container>
      <LocationStyle.HeaderContainer>
        <IconChevronLeft
          size={30}
          onClick={() =>
            navigate(
              signupType == "USER"
                ? "/signup/info/basic"
                : "/signup/info/business",
              { replace: true }
            )
          }
        />
        <span>동네 설정하기</span>
      </LocationStyle.HeaderContainer>
      <LocationStyle.BodyContainer>
        <LocationStyle.BodyTitle>
          서비스 이용을 위한 자신의 동네를 설정해주세요.
          <br />
          동네 정보는 가입 이후에도 수정할 수 있어요 !
        </LocationStyle.BodyTitle>
        <LocationForm>
          <div className="location-label">주소</div>
          <div className="location-input">
            {locationData.primaryAddress !== ""
              ? locationData.primaryAddress
              : "주소를 검색해주세요."}
          </div>
          <LocationBtn onClick={() => setOpenPostcode(true)}>
            주소 검색
          </LocationBtn>
        </LocationForm>
        <Button
          color={theme.color.carrot}
          textcolor="white"
          size="18px"
          onClick={handleSignupForm}
        >
          회원가입 완료하기
        </Button>
      </LocationStyle.BodyContainer>
      {openPostcode && (
        <DaumPostcode
          onComplete={handleOnComplete}
          autoClose={false}
          style={postCodeStyle}
        />
      )}
    </LocationStyle.Container>
  );
}

export default InitLocation;
