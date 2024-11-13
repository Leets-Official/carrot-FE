export const createPayload = (
  formData,
  postId,
  userId,
  parseAddress,
  convertDays
) => {
  const { doName, siName, detailName } = parseAddress(formData.workLocation || "");
  const workDays = convertDays(formData.workDays || []);
  
  const [startHour, startMinute] = (formData.workTime?.start || "00:00")
    .split(":")
    .map(Number);
  const [endHour, endMinute] = (formData.workTime?.end || "00:00")
    .split(":")
    .map(Number);

  return {
    postId: postId || 0,
    userId: userId,
    storeName: formData.storeName || "", // 기본값 설정
    workPlaceAddress: formData.workLocation || NULL, // 기본값 설정
    postData: {
      doName: doName,
      siName: siName,
      detailName: detailName,
      workType: formData.workType?.[0] || "", 
      title: formData.title || "", // 기본값 설정
      content: formData.description || "", // 기본값 설정
      pay: parseInt(formData.pay, 10) || 0, // 기본값 설정
      workStartHour: startHour,
      workStartMinute: startMinute,
      workEndHour: endHour,
      workEndTimeMinute: endMinute,
      isNegotiable: formData.isNegotiable ?? false, // nullish 병합 연산자
      applyNumber: formData.applyNumber || "", // 기본값 설정
      workDays: workDays,
      isShortTermJob: formData.workPeriod === "단기",
      payType: formData.payType || "시급", // 기본값 설정
      isNumberPublic: formData.isNumberPublic ?? true, // 기본값 설정
      imageUrlList: formData.imageUrlList || [], // 기본값 설정
    },
  };
};