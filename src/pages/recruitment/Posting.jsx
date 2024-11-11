import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postJobPosting, updateJobPosting } from "../../api"; // 수정 및 포스팅 API
import getAccessToken from "../../utils/getAccessToken";
import { PageContainer, ContentContainer, FixedButtonContainer } from "../../styles/posting/PostingStyles";
import {
  InputField,
  Tag,
  Toggle,
  WeekdayPicker,
  WorkTimePicker,
  PayPicker,
  AddressInput,
  PhotoUpload,
  DescriptionInput,
  PhoneInput,
  Button,
} from "../../components";
import "../../styles/posting/Posting.css";
import { POSTING_UPMU_TAG } from "../../constants";

const Posting = () => {
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const handleToggleClick = (value) => {
    setIsOptionSelected(true);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { mode, postData } = location.state || {};

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
    workPeriod: "1개월 이상",
    imageList: [],
    imageUrlList: [],
  });

  //전달된 데이터로 formData 초기화 해줌
  useEffect(() => {
    if (mode === "modify" && postData) {
      setFormData({
        title: postData.title,
        workTags: [postData.workType],
        workDays: postData.workDays.split(","),
        workTime: {
          start: `${postData.workStartHour}:${postData.workStartMinute}`,
          end: `${postData.workEndHour}:${postData.workEndTimeMinute}`,
        },
        pay: postData.pay,
        payType: postData.payType,
        workLocation: `${postData.doName} ${postData.siName} ${postData.detailName}`,
        storeName: postData.storeName,
        applyNumber: postData.applyNumber,
        isNumberPublic: postData.isNumberPublic,
        description: postData.content,
        workPeriod: postData.isShortTermJob ? "단기" : "장기",
        imageList: postData.imageList || [],
        imageUrlList: postData.imageUrlList || [],
      });
    }
  }, [postData, mode]); 

  const [validStates, setValidStates] = useState({
    title: true,
    description: true,
    applyNumber: true,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleValidityChange = (key, isValid) => {
    setValidStates((prev) => ({ ...prev, [key]: isValid }));
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
    return days.map((day) => dayMap[day] || day).join(",");
  };

  const createPayload = () => {
    const workDays = convertDays(formData.workDays);
    const { doName, siName, detailName } = parseAddress(formData.workLocation);
    const [startHour, startMinute] = formData.workTime.start.split(":").map(Number);
    const [endHour, endMinute] = formData.workTime.end.split(":").map(Number);

    return {
      postId: mode === "modify" ? postData.postId : 0,
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
        imageList: formData.imageList,
        imageUrlList: formData.imageUrlList,
        lastUpdatedTime: new Date().toISOString(),
      },
    };
  };

  const accessToken = getAccessToken();

  const handleSubmit = async () => {
    if (!Object.values(validStates).every(Boolean)) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }
  
    const payload = createPayload();
  
    console.log("Form Data (사용자 입력):", formData);
    console.log("Payload (API로 전송되는 데이터):", payload);
  
    try {
      const response = 
        mode === "modify" 
        ? await updateJobPosting(payload) 
        : await postJobPosting(payload);

      if (response.isSuccess) {
        alert(mode === "modify" ? "게시글이 성공적으로 수정되었습니다." : "게시글이 성공적으로 등록되었습니다.");
        navigate(`/post/detail/${response.data.postId}`);
      } else {
        alert("게시글 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("서버와의 통신 중 문제가 발생했습니다.");
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
          {mode === "modify" ? "수정하기" : "등록하기"}
        </Button>
      </FixedButtonContainer>
    </PageContainer>
  );
};

export default Posting;