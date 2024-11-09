import { privateAxios } from "../utils/customAxios";  

export const postJobPosting = async (accessToken, dispatch, formData) => {
    const { doName, siName, detailName } = formData.workLocation;
    const [startHour, startMinute] = formData.workTime.start.split(":").map(Number);
    const [endHour, endMinute] = formData.workTime.end.split(":").map(Number);
    const workDays = formData.workDays.join(", ");

    const body = {
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
            isNegotiable: formData.isNegotiable || false,
            applyNumber: formData.applyNumber,
            workDays,
            isShortTermJob: formData.workPeriod === "단기",
            payType: formData.payType,
            isNumberPublic: formData.isNumberPublic,
            imageList: [""],  // 일단 이미지는 빈 배열로 냅둠
        },
    };

    const response = {
        isSuccess: false,
        message: "",
    };

    try {
        // 서버로 API 호출
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