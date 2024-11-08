import axios from "axios";

const ADDRESS = import.meta.env.VITE_API_ADDRESS;

// Axios without token
const createPublicAxios = () => {
  return axios.create({
    baseURL: `${ADDRESS}`,
  });
};
const publicAxios = createPublicAxios();

// 토큰 재발급 함수 작성..
// Axios with token
const createPrivateAxios = (accessToken, dispatch) => {
  const instance = axios.create({
    baseURL: `${ADDRESS}`,
    headers: {
      Authorization: accessToken,
    },
  });

  // [요청 설정] 모든 요청의 헤더에 토큰 넣어 보내기
  instance.interceptors.request.use(
    (config) => {
      // refresh 토큰 요청(토큰 재발급) vs 그 외 요청
      return config;
    },
    (error) => {
      // 요청 실패 시 에러 처리
      return Promise.reject(error);
    }
  );

  // [응답 설정]
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { config, response } = error;
      // 토큰 재발급 요청하기
      return Promise.reject(error);
    }
  );

  return instance;
};

const privateAxios = (accessToken, dispatch) =>
  createPrivateAxios(accessToken, dispatch);

export { publicAxios, privateAxios };
