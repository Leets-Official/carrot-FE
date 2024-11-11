import React, { useState } from "react";
import { PageContainer, ContentContainer, FixedButtonContainer} from "../../styles/posting/PostingStyles";
import {InputField,Tag,Toggle,WeekdayPicker,WorkTimePicker,PayPicker,AddressInput,PhotoUpload,DescriptionInput,PhoneInput,Button} from "../../components";
import "../../styles/posting/Posting.css";
import { POSTING_UPMU_TAG } from "../../constants";
import { postJobPosting } from "../../api";
import getAccessToken from "../../utils/getAccessToken";
import { useDispatch } from "react-redux";

const Posting = () => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  // 토글 클릭 시 하위 컴포넌트 활성화 시키도록 설정해둠
  const handleToggleClick = (value) => {
    handleChange("selectedOption", value);
    setIsOptionSelected(true); 
  };

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

  const createPayload = () => {
    const { doName, siName, detailName } = parseAddress(formData.workLocation);
    const workDays = convertDays(formData.workDays);
    const [startHour, startMinute] = formData.workTime.start.split(":").map(Number);
    const [endHour, endMinute] = formData.workTime.end.split(":").map(Number);
  
    return {
      postId: 0,
      userId: 1,
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
        lastUpdatedTime: new Date().toISOString(),
        
      },
    };
  };

  const validateForm = (payload, formData) => {
    const requiredFields = {
      "제목": payload.postData.title,
      "하는 일": payload.postData.workType,
      "일하는 기간": formData.workPeriod,
      "일하는 요일": formData.workDays,
      "일하는 시간": formData.workTime.start && formData.workTime.end,
      "급여": formData.pay,
      "일하는 장소": formData.workLocation,
      "업체명": payload.storeName,
      "연락처": payload.postData.applyNumber,
    };
  
    for (const [label, value] of Object.entries(requiredFields)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        alert(`${label}을(를) 입력해주세요.`);
        return false; // 유효성 검사 실패
      }
    }
    return true; // 유효성 검사 성공
  };
  
  const handleSubmit = () => {
    const allValid = Object.values(validStates).every((isValid) => isValid);
    if (!allValid) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }
    
    const payload = createPayload(); // payload 생성 로직 분리
    if (!validateForm(payload, formData)) return; // 유효성 검사 실패 시 중단
    console.log("Payload:", payload);
    // API 호출
    // axios.post('/api/posting', payload).then(...);
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
              onChange={handlePhoneInputChange} 
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
          다음
        </Button>
      </FixedButtonContainer>
    </PageContainer>
  );
};

export default Posting;