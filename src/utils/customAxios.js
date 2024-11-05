import axios from "axios";

const ADDRESS = import.meta.env.VITE_API_ADDRESS;

// Axios without token
const createPublicAxios = () => {
  return axios.create({
    baseURL: `${ADDRESS}`,
  });
};
const publicAxios = createPublicAxios();

// Axios with token
const createPrivateAxios = (accessToken, dispatch) => {
  const instance = axios.create({
    baseURL: `${ADDRESS}`,
    headers: {
      Authorization: accessToken,
    },
  });

  // 리프레쉬 토큰 관련 코드 추가
  instance.interceptors.request.use((response) => {
    return response;
  });
};

const privateAxios = createPrivateAxios();

export { publicAxios, privateAxios };
