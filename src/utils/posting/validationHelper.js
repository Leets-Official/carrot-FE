// utils/validationHelper.js
export const validateForm = (payload, formData) => {
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
        return false;
      }
    }
    return true;
  };  