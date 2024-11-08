import React, { useState } from "react";
import styled from "styled-components";
import "../../styles/Posting.css";
import upmuTags from "../../constants/upmuTag";

import {InputField,Tag,Toggle,WeekdayPicker,WorkTimePicker,PayPicker,AddressInput,PhotoUpload,DescriptionInput,PhoneInput,Button,} from "../../components";

const PageContainer = styled.div`
  width: 440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 70px;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 440px;
  background-color: #fff;
  border-top: 1px solid #cccccc;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

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
    allTags: [...upmuTags],
    workPeriod: "1개월 이상",
    workDays: [],
    workTime: { start: "09:00", end: "18:00" },
    pay: "",
    workLocation: "",
    storeName: "",
    applyNumber: "", 
    isNumberPublic: true, 
    description: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handlePhoneInputChange = ({ phone, noCalls }) => {
    handleChange("applyNumber", phone); 
    handleChange("isNumberPublic", !noCalls); 
  };
  
// 태그를 업데이트하기 위한 함수
const handleTagsUpdate = (updatedTags) => {
  setFormData((prev) => ({
    ...prev,
    allTags: updatedTags,
  }));
};
const parseAddress = (address) => {
  const addressParts = address.split(" ");

  const doName = addressParts[0] || ""; 
  const siName = addressParts[1] || ""; 
  const detailName = addressParts[2] || ""; 

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

const handleSubmit = () => {
  const { doName, siName, detailName } = parseAddress(formData.workLocation);
  const workDays = convertDays(formData.workDays);
  const [startHour, startMinute] = formData.workTime.start.split(":").map(Number);
  const [endHour, endMinute] = formData.workTime.end.split(":").map(Number);

  const payload = {
    postId: 0, 
    userId: 1, 
    storeName: formData.storeName,
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
      isNegotiable: true, 
      applyNumber: formData.applyNumber,
      workDays,
      isShortTermJob: formData.workPeriod === "단기",
      payType: "주급", 
      isNumberPublic: formData.isNumberPublic,
      imageList: [""], 
    },
  };

  // 유효성 검사: content, imageList 제외한 필드 확인
  const requiredFields = {
    "제목": payload.postData.title,
    "하는 일": payload.postData.workType,
    "일하는 기간": formData.workPeriod,
    "요일 선택": formData.workDays,
    "일하는 시간": formData.workTime.start && formData.workTime.end,
    "급여": formData.pay,
    "일하는 장소": formData.workLocation,
    "업체명": payload.storeName,
    "연락처": payload.postData.applyNumber,
  };

  for (const [label, value] of Object.entries(requiredFields)) {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      alert(`${label}을(를) 입력해주세요.`);
      return;
    }
  }

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
              />
            </div>

            <div className="form-section">
              <Tag
                label="하는 일"
                tags={formData.allTags}
                selectedTags={formData.workTags}
                setSelectedTags={(tags) => handleChange("workTags", tags)}
                onTagsUpdate={handleTagsUpdate} 
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
                onChange={(time) => handleChange("workTime", time)}
              />
            </div>

            <div className="form-section">
            <PayPicker
            label="급여"
            onChange={(value) => handleChange("pay", value)} 
            />
            </div>

            <div className="form-section">
              <PhotoUpload label="사진" />
            </div>

            <div className="form-section">
              <DescriptionInput
                label="자세한 설명"
                onChange={(value) => handleChange("description", value)}
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