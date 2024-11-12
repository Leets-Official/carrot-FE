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
      response.data = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response.data;
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
    response.message = err.response.data;
  }

  return response;
};

// 알바 상세조회 API
export const postDetailAPI = async (accessToken, dispatch, id) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      `/api/v1/post/${id}`
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response.data;
  }
  return response;
};

// 사업자 정보 조회
export const postDetailCEOInfoAPI = async (accessToken, dispatch, ceoId) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      `/api/v1/user-profiles/ceo-info/${ceoId}`
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response.data;
  }
  return response;
};

// 상세 조회 글 삭제
export const deletePostAPI = async (accessToken, dispatch, postId) => {
  const response = {
    isSuccess: false,
    message: "",
  };

  try {
    const result = await privateAxios(accessToken, dispatch).delete(
      `/api/v1/post/${postId}`
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response.data;
  }
  return response;
};
