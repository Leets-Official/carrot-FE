export const parseAddress = (address) => {
  const cityPattern = /[가-힣]+시|[가-힣]+구/; // 시, 구

  // '시도' 부분 추출
  const doName = address.split(" ")[0];

  // '시군구' 부분 추출 (시도 뒤에 오는 시나 구)
  const cityMatch = address.replace(doName, "").match(cityPattern);
  const siName = cityMatch ? cityMatch[0] : "";

  // 나머지는 '동/읍/면'
  const detailName = address.replace(doName, "").replace(siName, "").trim();
  return { doName, siName, detailName };
};

export const convertDays = (days) => {
  const dayMap = {
    월: "MONDAY",
    화: "TUESDAY",
    수: "WEDNESDAY",
    목: "THURSDAY",
    금: "FRIDAY",
    토: "SATURDAY",
    일: "SUNDAY",
  };
  return days.map((day) => dayMap[day]);
};
