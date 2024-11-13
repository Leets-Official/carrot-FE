export const validateForm = (payload, formData) => {
  const requiredFields = {
    "제목": payload.postData.title,
    "하는 일": payload.postData.workType,
    "일하는 요일": formData.workDays,
    "일하는 시간": formData.workTime?.start && formData.workTime?.end,
    "급여": formData.pay,
    "일하는 장소": formData.workLocation,
    "업체명": payload.storeName,
    "연락처": payload.postData.applyNumber,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) =>
      value === undefined || 
      value === null || 
      (typeof value === "string" && value.trim() === "") || 
      (Array.isArray(value) && value.length === 0) || 
      value === false
    )
    .map(([label]) => label);

  if (missingFields.length > 0) {
    alert(`다음 항목을 입력해주세요: ${missingFields.join(", ")}`);
    return false; // 유효성 검증 실패
  }

  return true; // 유효성 검증 성공
};