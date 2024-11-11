import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../styles/mypage/MyPage.styles";
import { IconLetterX, IconPhotoPlus } from "@tabler/icons-react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { SelectBox, SelectOptions, Option } from "../../components/SelectBox";
import theme from "../../styles/theme/theme";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import getAccessToken from "./../../utils/getAccessToken";
import { modifyBasicInfoAPI, uploadProfileImageAPI } from "../../api";

const ImgForm = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  .profile_circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${theme.color.lightgray};
  }
`;
const InfoInput = styled(Input)`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const SexSelectBox = styled(SelectBox)`
  width: 100%;
  border: 1px solid ${theme.color.lightgray};
`;
const SexSelectOptions = styled(SelectOptions)`
  border: 1px solid ${theme.color.lightgray};
`;
const SexOption = styled(Option)`
  border-bottom: 1px solid ${theme.color.lightgray};
`;

function ModifyInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const userType = useSelector((state) => state.userInfo.userType);

  const { state } = useLocation();
  const [form, setForm] = useState(state.data);
  const [image, setImage] = useState(null); // 이미지 데이터
  const [imageURL, setImageURL] = useState(state.data.img); // 이미지 데이터 URL 저장
  const [sexVisible, setSexVisible] = useState(false); // 성별 셀렉트

  /*--------------이미지 관련 함수--------------- */
  /* ---- 이미지 파일 관련 ----- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      uploadProfileImageAPI(accessToken, dispatch, file).then((res) => {
        if (res.isSuccess) {
          setImage(file);
          setImageURL(res.data); // 이미지 url
        } else {
          alert(res.message);
        }
      });
    }
  };
  /*----------이미지 제외 관련 함수----------- */
  const isValidName = (name) => /^[A-Za-z가-힣\s]*$/.test(name); // 영문자만 허용
  const isValidPhone = (phone) =>
    /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/.test(phone); // 숫자만 허용
  const isValidYear = (year) => /^\d{0,4}$/.test(year); // 0~4자리 숫자만 허용

  // 성별 제외한 입력 값
  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const MAX_YEAR = new Date().getFullYear() - 14;
  const MIN_YEAR = new Date().getFullYear() - 100;

  const modifyForm = () => {
    /**형식 검사하기 */
    const name = userType === "EMPLOYEE" ? form.employeeName : form.ceoName;
    const phone =
      userType === "EMPLOYEE" ? form.phoneNumber : form.ceoPhoneNumber;
    const year = Number(form.birthYear);
    // 이름
    if (!isValidName(name) || name === "")
      return alert("이름을 다시 입력해주세요.");
    // 폰 번호
    if (!isValidPhone(phone) || phone === "")
      return alert("전화번호를 다시 입력해주세요.");
    // 성별
    if (form.gender == null) return alert("성별을 입력해주세요.");
    // 년도
    if (!isValidYear(year) || year < MIN_YEAR || year > MAX_YEAR)
      return alert("년도를 다시입력해주세요.");

    const body = {
      gender: form.gender,
      birthYear: form.birthYear,
    };

    if (userType === "EMPLOYEE") {
      body.phoneNumber = form.phoneNumber; // EMPLOYEE의 경우
      body.employeeName = form.employeeName; // EMPLOYEE에 추가적인 정보
      body.employeeAddress = form.employeeAddress;
    } else if (userType === "CEO") {
      body.ceoPhoneNumber = form.ceoPhoneNumber; // CEO의 경우
      body.ceoName = form.ceoName; // CEO에 추가적인 정보
      body.ceoAddress = form.ceoAddress;
    }
    console.log(body);
    // 모두 적합할 경우 API 전송
    modifyBasicInfoAPI(accessToken, dispatch, body).then((res) => {
      if (res.isSuccess) {
        alert(res.message);
        navigate("/mypage/info");
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <IconLetterX
          size={30}
          onClick={() => {
            navigate("/mypage/info");
          }}
        />
        <span>기본정보</span>
      </HeaderContainer>
      <BodyContainer>
        <ImgForm>
          <label htmlFor="imageInput">
            <div
              className="profile_circle"
              style={{
                backgroundImage: `url(${imageURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              {imageURL ? null : (
                <IconPhotoPlus size={36} strokeWidth={1} color={"#E7E6EA"} />
              )}
            </div>
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </ImgForm>
        <InfoInput
          label="이름"
          name={userType === "EMPLOYEE" ? "employeeName" : "ceoName"}
          border={theme.color.lightgray}
          value={userType === "EMPLOYEE" ? form.employeeName : form.ceoName}
          onChange={handleForm}
        />
        <InfoInput
          label="연락처"
          name={userType === "EMPLOYEE" ? "phoneNumber" : "ceoPhoneNumber"}
          border={theme.color.lightgray}
          value={
            userType === "EMPLOYEE" ? form.phoneNumber : form.ceoPhoneNumber
          }
          onChange={handleForm}
        />
        <span>성별</span>
        <SexSelectBox onClick={() => setSexVisible((pre) => !pre)}>
          <label>
            {form.gender !== null
              ? form.gender == "FEMALE"
                ? "여성"
                : "남성"
              : "성별을 선택해주세요"}
          </label>
          <SexSelectOptions $visible={sexVisible}>
            {[
              ["FEMALE", "여성"],
              ["MALE", "남성"],
            ].map((type) => (
              <SexOption
                key={type}
                onClick={() => setForm((pre) => ({ ...pre, gender: type[0] }))}
              >
                {type[1]}
              </SexOption>
            ))}
          </SexSelectOptions>
        </SexSelectBox>
        <InfoInput
          label="태어난 연도"
          name="birthYear"
          border={theme.color.lightgray}
          value={form.birthYear === "" ? "" : form.birthYear}
          onChange={handleForm}
          type="number"
        />
        <Button
          color={theme.color.carrot}
          textcolor="white"
          onClick={modifyForm}
        >
          완료
        </Button>
      </BodyContainer>
    </Container>
  );
}

export default ModifyInfo;
