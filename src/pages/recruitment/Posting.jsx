import React, { useState, useEffect } from "react";
import { PageContainer, ContentContainer, FixedButtonContainer } from "../../styles/posting/PostingStyles";
import { InputField, Tag, Toggle, WeekdayPicker, WorkTimePicker, PayPicker, AddressInput, PhotoUpload, DescriptionInput, PhoneInput, Button } from "../../components";
import "../../styles/posting/Posting.css";
import { POSTING_UPMU_TAG } from "../../constants";
import { postJobPosting, updateJobPosting, getPostById } from "../../api";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import getAccessToken from "../../utils/getAccessToken"; // 일반 함수로 가져와야 오류 안뜸!!
import { createPayload } from "../../utils/posting/payloadHelper"; // 분리된 payload 생성 함수
import { validateForm } from "../../utils/posting/validationHelper"; // 분리된 유효성 검증 함수
import { parseAddress, convertDays } from "../../utils/posting/formatHelper"; // 분리된 주소 및 요일 변환 함수

const Posting = () => {
  const accessToken = getAccessToken();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userInfo.userId);
  const { mode, postId } = location.state || { mode: "create", postId: null };

  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [validStates, setValidStates] = useState({
    title: true,
    description: true,
    applyNumber: true,
  });

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

  const handleToggleClick = (value) => {
    handleChange("selectedOption", value);
    setIsOptionSelected(true);
  };
  // 게시글 수정 useEffect
  useEffect(() => {
    if (mode === "modify" && postId) {
      fetchPostData(postId);
    }
  }, [mode, postId]);

  const fetchPostData = async (postId) => {
    try {
      const postData = await getPostById(postId, accessToken);
      populateFormData(postData); // 폼 데이터 초기화
    } catch (error) {
      alert("게시글 데이터를 불러오는 데 실패했습니다.");
    }
  };

  const populateFormData = (postData) => {
    const {
      title,
      workType,
      pay,
      payType,
      workStartHour,
      workStartMinute,
      workEndHour,
      workEndTimeMinute,
      isNegotiable,
      applyNumber,
      workDays,
      content,
      doName,
      siName,
      detailName,
    } = postData.postData;

    setFormData({
      ...formData,
      title,
      workTags: [workType],
      workDays,
      workTime: {
        start: `${workStartHour}:${workStartMinute.toString().padStart(2, "0")}`,
        end: `${workEndHour}:${workEndTimeMinute.toString().padStart(2, "0")}`,
      },
      pay,
      payType,
      isNegotiable,
      applyNumber,
      description: content,
      workLocation: `${doName} ${siName} ${detailName}`, // 주소 결합
    });
  };

  const handleSubmit = async () => {
    const allValid = Object.values(validStates).every((isValid) => isValid);
    if (!allValid) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }

    const payload = createPayload(formData, postId, userId, parseAddress, convertDays);
    console.log("Payload:", payload);

    if (!validateForm(payload, formData)) {
      console.log("Validation failed. Aborting API call.");
      return;
    }

    try {
      const response = mode === "create"
        ? await postJobPosting(accessToken, payload)
        : await updateJobPosting(accessToken, postId, payload.postData);

      if (response.isSuccess) {
        alert(mode === "create" ? "게시글이 성공적으로 등록되었습니다." : "게시글이 성공적으로 수정되었습니다.");
        navigate("/home");
      } else {
        alert(`${mode === "create" ? "등록" : "수정"} 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert("제출 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PageContainer>
      <ContentContainer>
        <div className="header">{mode === "modify" ? "게시글 수정" : "어떤 알바를 구하고 계신가요?"}</div>
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
          {mode === "create" ? "등록" : "수정"}
        </Button>
      </FixedButtonContainer>
    </PageContainer>
  );
};

export default Posting;