import { SET_LOCAL_TOKEN } from "../store/localToken";
import { USER_LOGIN } from "../store/userInfo";
import { publicAxios } from "../utils/customAxios";

/*---- 로그인 ----*/
export const loginAPI = async (email, pwd, dispatch) => {
  // 서버로 보낼 데이터
  const body = {
    email: email, // 이메일
    password: pwd, // 비밀번호
  };
  console.log(body);
  //서버로부터 받아 사용할 데이터
  const response = {
    isSuccess: false, //API 성공 여부
    message: "", //API 메시지
    userType: "", // 유저 타입 (현재 X)
    userId: null, // 유저 아이디 (현재 X)
  };

  // 서버로 로그인 요청
  try {
    const result = await publicAxios.post("/api/v1/users/login", body);
    console.log(result);
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      dispatch(SET_LOCAL_TOKEN(result.headers["authorization"]));
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err;
  }
  return response;
};
