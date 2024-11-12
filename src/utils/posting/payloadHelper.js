export const createPayload = (formData, postId, userId, parseAddress, convertDays) => {
    const { doName, siName, detailName } = parseAddress(formData.workLocation);
    const workDays = convertDays(formData.workDays);
    const [startHour, startMinute] = formData.workTime.start.split(":").map(Number);
    const [endHour, endMinute] = formData.workTime.end.split(":").map(Number);
  
    return {
      postId: postId || 0,
      userId,
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
        imageUrlList: [""],
      },
    };
  };  