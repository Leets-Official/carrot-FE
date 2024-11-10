import { privateAxios } from "../utils/customAxios";

// (홈)알바 리스트
export const postListAPI = async (accessToken, dispatch) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      "/api/v1/post"
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data.shortPostDataList;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// (키워드 검색) 알바리스트
export const searchPostListAPI = async (accessToken, dispatch, keyword) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };
  try {
    const result = await privateAxios(accessToken, dispatch).get(
      `/api/v1/post/search/${keyword}`
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data.shortPostDataList;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }

  return response;
};
