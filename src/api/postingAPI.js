import { privateAxios } from "../utils/customAxios";  

export const postJobPosting = async (accessToken, dispatch, formData) => {
    const { workLocation = "" } = formData;
    const [doName = "", siName = "", detailName = ""] = workLocation.split(" ");
    const { start = "09:00", end = "18:00" } = formData.workTime || {};

    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    const body = {
      postId: 0,
      userId: 1,
      storeName: formData.storeName,
      postData: {
        doName,
        siName,
        detailName,
        workType: Array.isArray(formData.workTags) && formData.workTags.length > 0 ? formData.workTags[0] : "기타",
        title: formData.title,
        content: formData.description,
        pay: parseInt(formData.pay, 10),
        workStartHour: startHour,
        workStartMinute: startMinute,
        workEndHour: endHour,
        workEndTimeMinute: endMinute,
        isNegotiable: formData.isNegotiable || false,
        applyNumber: formData.applyNumber,
        workDays: formData.workDays,
        isShortTermJob: formData.workPeriod === "단기",
        payType: formData.payType,
        isNumberPublic: formData.isNumberPublic,
        imageList: [""],
      },
    };
  
    const response = { isSuccess: false, message: "" };
  
    try {
      const result = await privateAxios(accessToken, dispatch).post("/post", body);
      if (result.status === 200) {
        response.isSuccess = true;
        response.message = result.data.message;
      }
    } catch (error) {
      response.message = error.message;
    }
  
    return response;
  };  