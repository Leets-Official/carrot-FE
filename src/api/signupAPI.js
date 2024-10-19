import axios from "axios";

export const verifyCEOAPI = async (req) => {
  let { number, date, exponent } = req;

  // 날짜 포맷 변환
  let fullDate = `${date.year}${String(date.month).padStart(2, "0")}${String(
    date.day
  ).padStart(2, "0")}`;

  // 요청 데이터 생성
  let form = {
    b_no: String(number), // 사업자등록번호 (10자리 숫자)
    start_dt: fullDate, // 개업일자 (YYYYMMDD)
    p_nm: String(exponent), // 대표자성명
    p_nm2: "",
    b_nm: "",
    corp_no: "",
    b_sector: "",
    b_type: "",
  };

  const url = `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${
    import.meta.env.VITE_CEO_API_KEY
  }`;

  try {
    const { data } = await axios.post(url, {
      businesses: [form],
    });

    return data.data[0];
  } catch (error) {
    console.error(
      "처리 요청 중 오류 발생:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
