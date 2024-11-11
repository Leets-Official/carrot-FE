import React, { useState } from "react";
import { PageContainer, ContentContainer, FixedButtonContainer} from "../../styles/posting/PostingStyles";
import {InputField,Tag,Toggle,WeekdayPicker,WorkTimePicker,PayPicker,AddressInput,PhotoUpload,DescriptionInput,PhoneInput,Button} from "../../components";
import "../../styles/posting/Posting.css";
import { POSTING_UPMU_TAG } from "../../constants";
import { postJobPosting, updateJobPosting } from "../../api"; // 수정
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import getAccessToken from "../../utils/getAccessToken"; // 일반 함수로 가져오기

const Posting = () => {
  const state = useSelector((state) => state); // 최상단에서 상태 가져오기
  const accessToken = getAccessToken(state); // 상태를 함수로 전달
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  // 토글 클릭 시 하위 컴포넌트 활성화 시키도록 설정해둠
  const handleToggleClick = (value) => {
    handleChange("selectedOption", value);
    setIsOptionSelected(true); 
  };

  // 값의 길이에 대한 유효성 검증하여 제출을 막아둠
  const [validStates, setValidStates] = useState({
    title: true,
    description: true,
    applyNumber: true,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleValidityChange = (key, isValid) => {
    setValidStates((prev) => ({
      ...prev,
      [key]: isValid, 
    }));
  };
  
  const handlePhoneInputChange = ({ phone, noCalls }) => {
    handleChange("applyNumber", phone);
    handleChange("isNumberPublic", !noCalls);
  };

  const parseAddress = (address) => {
    const [doName = "", siName = "", detailName = ""] = address.split(" ");
    return { doName, siName, detailName };
  };

  const convertDays = (days) => {
    const dayMap = {
      월: "MONDAY",
      화: "TUESDAY",
      수: "WEDNESDAY",
      목: "THURSDAY",
      금: "FRIDAY",
      토: "SATURDAY",
      일: "SUNDAY",
    };
    return days.map((day) => dayMap[day]).join(", ");
  };
  const location = useLocation();
  const navigate = useNavigate();

  const mode = location.state?.mode || "create"; // default "create"
  const postId = location.state?.postId || null;
  const userId = useSelector((state) => state.userInfo.userId);
  const [formData, setFormData] = useState({
    title: "",
    workTags: [],
    workDays: [],
    workTime: { start: "09:00", end: "18:00" },
    pay: "",
    payType: "시급",
    workLocation: "",
    storeName: "",
    applyNumber: "",
    isNumberPublic: true,
    description: "",
    workPeriod: "1개월 이상" 
  });

  const createPayload = () => {
    const { doName, siName, detailName } = parseAddress(formData.workLocation);
    const workDays = convertDays(formData.workDays);
    const [startHour, startMinute] = formData.workTime.start.split(":").map(Number);
    const [endHour, endMinute] = formData.workTime.end.split(":").map(Number);
  
    return {
      postId: postId || 0, // 수정 시 기존 postId 사용
      userId,
      storeName: formData.storeName,
      workPlaceAddress: formData.workLocation,
      postData: {
        doName,
        siName,
        detailName,
        workType: formData.workTags[0] || "기타",
        title: formData.title,
        content: formData.description,
        pay: parseInt(formData.pay, 10),
        workStartHour: startHour,
        workStartMinute: startMinute,
        workEndHour: endHour,
        workEndTimeMinute: endMinute,
        isNegotiable: formData.isNegotiable || false,
        applyNumber: formData.applyNumber,
        workDays,
        isShortTermJob: formData.workPeriod === "단기",
        payType: formData.payType,
        isNumberPublic: formData.isNumberPublic,
        imageList: [""],
        imageUrlList: [""], // 빈 값 처리
      },
    };
  };

  const validateForm = (payload, formData) => {
    const requiredFields = {
      "제목": payload.postData.title,
      "하는 일": payload.postData.workType,
      "일하는 기간": formData.workPeriod,
      "일하는 요일": formData.workDays,
      "일하는 시간": formData.workTime?.start && formData.workTime?.end,
      "급여": formData.pay,
      "일하는 장소": formData.workLocation,
      "업체명": payload.storeName,
      "연락처": payload.postData.applyNumber,
    };

    for (const [label, value] of Object.entries(requiredFields)) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0) ||
        value === false
      ) {
        alert(`${label}을(를) 입력해주세요.`);
        return false; // 유효성 검사 실패
      }
    }
    return true; // 유효성 검사 성공
  };

  const handleSubmit = async () => {
    // 모든 입력 필드의 유효성 확인
    const allValid = Object.values(validStates).every((isValid) => isValid);
    if (!allValid) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return; // 유효성 검사 실패 시 즉시 중단
    }
  
    // Payload 생성
    const payload = createPayload();
    console.log("Form Data (사용자 입력):", formData);
    console.log("Payload (API로 전송되는 데이터):", payload);
    // 유효성 검사 실패 시 이후 코드 중단
    if (!validateForm(payload, formData)) {
      console.log("Validation failed. Aborting API call."); // 디버깅 로그
      return; // 이후 로직 실행 중단
    }
  
    try {
      // API 호출 로직
      if (mode === "create") {
        const response = await postJobPosting(accessToken, payload);
        if (response.isSuccess) {
          alert("게시글이 성공적으로 등록되었습니다.");
          navigate("/home");
        } else {
          alert(`등록 실패: ${response.message}`);
        }
      } else if (mode === "modify") {
        const response = await updateJobPosting(accessToken, postId, payload.postData);
        if (response.isSuccess) {
          alert("게시글이 성공적으로 수정되었습니다.");
          navigate("/home");
        } else {
          alert(`수정 실패: ${response.message}`);
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("제출 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  
  return (
    <PageContainer>
      <ContentContainer>
        <div className="header">어떤 알바를 구하고 계신가요?</div>
        <div className="toggle-section">
          <Toggle
            options={["업무 목적"]}
            selectedOption={formData.selectedOption}
            onChange={handleToggleClick} 
            styleType="card"
          />
        </div>

        {isOptionSelected && (
          <>
            <div className="form-section">
            <InputField
          label="제목"
          placeholder="공고 내용을 요약해주세요."
          onChange={(value) => handleChange("title", value)}
          onValidityChange={(isValid) => handleValidityChange("title", isValid)}
        />
            </div>

            <div className="form-section">
            <Tag
            label="하는 일"
            tags={POSTING_UPMU_TAG} 
            selectedTags={formData.workTags}
            setSelectedTags={(tags) => handleChange("workTags", tags)}
            maxSelectable={1}
            />
            </div>

            <div className="form-section">
            <Toggle
                label="일하는 기간"
                options={["1개월 이상"]}
                onChange={(value) => handleChange("workPeriod", value)}
                selectedOption={formData.workPeriod}
                styleType="tag"
              />
            </div>

            <div className="form-section">
            <WeekdayPicker
            label="요일 선택"
            onChange={(days) => handleChange("workDays", days)}
            />
            </div>

            <div className="form-section">
            <WorkTimePicker
            label="일하는 시간"
            onChange={(timeData) => {
            handleChange("workTime", { start: timeData.start, end: timeData.end }); 
            handleChange("isNegotiable", timeData.isNegotiable); 
            }}
            />
            </div>

            <div className="form-section">
            <PayPicker
            label="급여"
            onChange={(payData) => {
            handleChange("pay", payData.pay);
            handleChange("payType", payData.payType);
            }}
            />
            </div>

            <div className="form-section">
              <PhotoUpload label="사진" />
            </div>

            <div className="form-section">
            
            <DescriptionInput
  label="자세한 설명"
  onChange={(value) => handleChange("description", value)} 
  onValidityChange={(isValid) => handleValidityChange("description", isValid)}
/>

            </div>

            <div className="form-section">
              <div className="header">업체 정보</div>
              <InputField
                label="업체명"
                placeholder="예) 당근가게"
                onChange={(value) => handleChange("storeName", value)}
              />
              <AddressInput
                label="일하는 장소"
                value={formData.workLocation}
                onChange={(value) => handleChange("workLocation", value)}
              />
              <PhoneInput 
              label="연락처" 
              onChange={handlePhoneInputChange} // 부모 상태 변경 핸들러
  onValidityChange={(isValid) => handleValidityChange("applyNumber", isValid)}
              />

            </div>
          </>
        )}
      </ContentContainer>

      <FixedButtonContainer>
        <Button
          color="#ff8a3d"
          textColor="#ffffff"
          size="18px"
          onClick={handleSubmit}
        >
          {mode === "create" ? "등록" : "수정"}
        </Button>
      </FixedButtonContainer>
    </PageContainer>
  );
};

export default Posting;