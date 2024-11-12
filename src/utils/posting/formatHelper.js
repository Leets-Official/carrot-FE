export const parseAddress = (address) => {
    const [doName = "", siName = "", detailName = ""] = address.split(" ");
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
    return days.map((day) => dayMap[day]).join(", ");
  };  