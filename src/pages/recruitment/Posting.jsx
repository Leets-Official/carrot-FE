import React, { useState, useEffect } from "react";
import {
  PageContainer,
  ContentContainer,
  FixedButtonContainer,
} from "../../styles/posting/PostingStyles";
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
import  { POSTING_UPMU_TAG as INITIAL_TAGS }from "../../constants";
import { postJobPosting, updateJobPosting, getPostById } from "../../api";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getAccessToken from "../../utils/getAccessToken"; // 일반 함수로 가져와야 오류 안뜸!!
import { createPayload } from "../../utils/posting/payloadHelper"; // 분리된 payload 생성 함수
import { validateForm } from "../../utils/posting/validationHelper"; // 분리된 유효성 검증 함수
import { parseAddress, convertDays } from "../../utils/posting/formatHelper"; // 분리된 주소 및 요일 변환 함수

const Posting = () => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userInfo.userId);
  const { mode, postId } = location.state || { mode: "create", postId: null };

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
    workPeriod: "1개월 이상",
    imageUrlList: [],
    isNegotiable: false,
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
  const [allTags, setAllTags] = useState(INITIAL_TAGS);
  const handleTagsUpdate = (updatedTags) => {
    setAllTags(updatedTags); // 동적 태그 업데이트
  };

  // 게시글 수정 useEffect
  useEffect(() => {
    if (mode === "modify" && postId) {
      fetchPostData(postId);
    }
  }, [mode, postId]);

  const fetchPostData = async (postId) => {
    const response = await getPostById(postId, accessToken);
    console.log("Fetched post data:", response);
    if (response.isSuccess) {
      populateFormData(response.data);
    } else {
      alert(`데이터 호출 실패: ${response.message}`);
    }
  };  

  const populateFormData = (postData) => {
    if (!postData || !postData.data || !postData.data.postData) {
      console.error("Invalid postData structure:", JSON.stringify(postData, null, 2));
      alert("게시글 데이터를 불러오는 데 실패했습니다.");
      return; // 함수 실행 중단
    }
  
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
    } = postData.data.postData; // 올바른 경로로 수정
  
    setFormData({
      title: title || "",
      workTags: Array.isArray(workType) ? workType : [workType],
      workDays: (workDays || []).filter(Boolean), // undefined 제거
      workTime: {
        start: `${String(workStartHour || "09").padStart(2, "0")}:${String(workStartMinute || "00").padStart(2, "0")}`,
        end: `${String(workEndHour || "18").padStart(2, "0")}:${String(workEndTimeMinute || "00").padStart(2, "0")}`,
      },
      pay: pay || 0,
      payType: payType || "시급",
      isNegotiable: isNegotiable || false,
      applyNumber: applyNumber || "",
      description: content || "",
      workLocation: `${doName || ""} ${siName || ""} ${detailName || ""}`.trim(),
    });
  };
  
  const handleSubmit = async () => {
    const allValid = Object.values(validStates).every((isValid) => isValid);
    if (!allValid) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }
  
    const payload = createPayload(formData, postId, userId, parseAddress, convertDays);
  
  // 디버깅용 데이터 출력
  console.log("Payload before sending:", payload);
  console.log("Current Mode:", mode);

    if (!validateForm(payload, formData)) {
      alert("모든 필드를 올바르게 입력해주세요.");
      return;
    }
  
    try {
      const response = mode === "create"
      ? await postJobPosting(accessToken, dispatch, payload)
      : await updateJobPosting(accessToken, postId, payload.postData, userId);
  
      if (response.isSuccess) {
        alert(mode === "create" ? "게시글이 성공적으로 등록되었습니다." : "게시글이 성공적으로 수정되었습니다.");
        navigate("/home");
      } else {
        alert(`오류: ${response.message}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("제출 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  
  // const handleSubmit = () => {
  //   const allValid = Object.values(validStates).every((isValid) => isValid);
  //   if (!allValid) {
  //     alert("모든 필드를 올바르게 입력해주세요.");
  //     return;
  //   }
  //   const payload = createPayload(
  //     formData,
  //     postId,
  //     userId,
  //     parseAddress,
  //     convertDays
  //   );

  //   if (!validateForm(payload, formData)) {
  //     return;
  //   }

  //   try {
  //     if (mode !== "modify") {
  //       postJobPosting(accessToken, dispatch, payload).then((res) => {
  //         if (res.isSuccess) {
  //           alert("게시글이 성공적으로 등록되었습니다.");
  //           navigate("/home");
  //         } else {
  //           alert(res.message);
  //         }
  //       });
  //     } else {
  //       updateJobPosting(accessToken, postId, postData, userId).then((res) => {
  //         if (res.isSuccess) {
  //           alert("게시글이 성공적으로 수정되었습니다.");
  //           navigate("/home");
  //         } else {
  //           alert(res.message);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     alert("제출 과정에서 오류가 발생했습니다. 다시 시도해주세요.");
  //   }
  // };
  return (
    <PageContainer>
      <ContentContainer>
        <div className="header">
          {mode === "modify" ? "게시글 수정" : "어떤 알바를 구하고 계신가요?"}
        </div>
        <>
          <div className="form-section">
            <InputField
              label="제목"
              placeholder="공고 내용을 요약해주세요."
              value={formData.title}
              onChange={(value) => handleChange("title", value)}
              onValidityChange={(isValid) => handleValidityChange("title", isValid)}
            />
          </div>
          <div className="form-section">
          <Tag
  label="하는 일"
  tags={allTags} // 동적 태그 목록
  selectedTags={
    Array.isArray(formData.workType) ? formData.workType : formData.workType ? [formData.workType] : []
  } // 선택된 태그
  setSelectedTags={(tags) => {
    // console.log("Selected Tags:", tags); // 디버깅
    handleChange("workType", tags); // 선택된 태그 업데이트
  }}
  maxSelectable={1}
  onTagsUpdate={handleTagsUpdate} // 태그 목록 업데이트
/>

            </div>
            <div className="form-section">
              <Toggle
                label="일하는 기간"
                options={["1개월 이상"]}
                onChange={(value) => handleChange("workPeriod", value)}
                selectedOption={formData.workPeriod || "1개월 이상"} // 기본값 설정
                styleType="tag"
              />
            </div>
            <div className="form-section">
              <WeekdayPicker
                label="요일 선택"
                selectedDays={formData.workDays}
                onChange={(days) => handleChange("workDays", days)}
              />
            </div>
            <div className="form-section">
            <WorkTimePicker
              label="일하는 시간"
              startTime={formData.workTime?.start || "09:00"}
              endTime={formData.workTime?.end || "18:00"}
              negotiable={formData.isNegotiable}
              onChange={(timeData) => {
                handleChange("workTime", {
                  start: timeData.start,
                  end: timeData.end,
                });
                handleChange("isNegotiable", timeData.isNegotiable);
              }}
            />
            </div>
            <div className="form-section">
              <PayPicker
                label="급여"
                value={formData}
                onChange={(payData) => {
                  handleChange("pay", payData.pay);
                  handleChange("payType", payData.payType);
                }}
              />
            </div>
            <PhotoUpload
                label="사진"
                selectedPhotos={formData.imageUrlList}
                setSelectedPhotos={(photos) =>
                  handleChange("imageUrlList", photos)
                }
              />
            <div className="form-section">
              <DescriptionInput
                label="자세한 설명"
                value={formData.description}
                onChange={(value) => handleChange("description", value)}
                onValidityChange={(isValid) =>
                  handleValidityChange("description", isValid)
                }
              />
            </div>
            <div className="form-section">
              <div className="header">업체 정보</div>
              <InputField
                label="업체명"
                placeholder="예) 당근가게"
                value={formData.storeName}
                onChange={(value) => handleChange("storeName", value)}
              />
              <AddressInput
                label="일하는 장소"
                value={formData.workLocation}
                onChange={(value) => handleChange("workLocation", value)}
              />
              <PhoneInput
                label="연락처"
                value={{ phone: formData.applyNumber, noCalls: !formData.isNumberPublic }}
                onChange={handlePhoneInputChange}
                onValidityChange={(isValid) =>
                  handleValidityChange("applyNumber", isValid)
                }
              />
            </div>
        </>

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
