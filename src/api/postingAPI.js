import { privateAxios } from "../utils/customAxios";

export const postJobPosting = async (accessToken, dispatch, formData) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`, // Bearer 토큰 설정
  };

  const { workLocation = "" } = formData;
  const [doName = "", siName = "", detailName = ""] = workLocation.split(" ");
  const { start = "09:00", end = "18:00" } = formData.workTime || {};

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const body = {
    postId: 0,
    userId: 1, 
    storeName: formData.storeName,
    workPlaceAddress: formData.workLocation, //주소 필드 해뒀음 
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
      workDays: formData.workDays.join(","), 
      isShortTermJob: formData.workPeriod === "단기",
      payType: formData.payType,
      isNumberPublic: formData.isNumberPublic,
      imageList: formData.imageList || [""], // 이미지 리스트
      imageUrlList: [""], // Swagger 요청 구조에 따라서 빈 리스트 추가
      lastUpdatedTime: new Date().toISOString(), 
    },
  };

  const response = { isSuccess: false, message: "" };

  try {
    const result = await privateAxios(accessToken, dispatch).post("/post", body, { headers });
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (error) {
    response.message = error.response?.data?.message || error.message;
    console.error("API 요청 실패:", error);
  }

  return response;
};