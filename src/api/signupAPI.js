import axios from "axios";
import { publicAxios } from "../utils/customAxios";
import { RESET_SIGNUP } from "../store/signupInfo";

/*-----회원가입단계 진행-----*/
// 이메일 중복 API
export const duplicateEmailAPI = async (email) => {
  const response = {
    isSuccess: true,
    message: "",
  };

  try {
    const result = await publicAxios.get(
      `/api/v1/users/check-email-duplicate`,
      { params: { email } }
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message =
      err.status == 400 ? "이미 사용중인 이메일입니다." : err.message;
  }
  return response;
};
// 이메일 인증 요청 API (보류)

// 이메일 인증코드 확인 API (보류)

// (사업자회원) 사업자 인증 API
export const verifyCEOAPI = async (req) => {
  let { number, date, exponent } = req;

  // 날짜 포맷 변환
  let fullDate = `${date.year}${String(date.month).padStart(2, "0")}${String(
    date.day
  ).padStart(2, "0")}`;

  // 요청 데이터 생성 (빈 값 ""은 요청형식에 따른 빈 값)
  let form = {
    b_no: String(number), // 사업자등록번호 (10자리 숫자)
    start_dt: fullDate, // 개업일자 (YYYYMMDD)
    p_nm: String(exponent), // 대표자성명
    p_nm2: "",
    b_nm: "",
    corp_no: "",
    b_sector: "",
    b_type: "",
    b_adr: "",
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

/*----회원가입 완료----*/
// (일반유저) 회원가입 API
export const signupUserAPI = async (
  email,
  pwd,
  phone,
  name,
  address,
  dispatch
) => {
  // 서버로 보낼 데이터
  const body = {
    email: email, // 이메일
    password: pwd, // 비밀번호
    phoneNumber: phone, // 전화번호
    employeeName: name, //이름(닉네임)
    employeeAddress: address, // 동네 정보
  };

  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };
  // 서버로 회원가입 요청
  try {
    const result = await publicAxios.post("/api/v1/users/employeeSignup", body);
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      dispatch(RESET_SIGNUP());
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// (사업자유저) 회원가입 API
export const signupCEOAPI = async (
  email,
  pwd,
  name,
  phone,
  ceoInfo,
  address,
  dispatch
) => {
  const body = {
    email: email,
    password: pwd,
    ceoPhoneNumber: phone,
    ceoName: name,
    ceoNumber: ceoInfo.number, // 사업자번호
    storeName: ceoInfo.exponent, // 대표자명
    openDate: ceoInfo.date, // 개업일자 YYYYMMDD
    ceoAddress: address,
  };
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
  };

  try {
    const result = await publicAxios.post("/api/v1/users/ceoSignup", body);
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      dispatch(RESET_SIGNUP());
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};
