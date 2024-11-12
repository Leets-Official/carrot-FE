import { privateAxios } from "../utils/customAxios";

// 지원하기 API
export const applyPostAPI = async (accessToken, dispatch, postId, userId) => {
  const response = {
    isSuccess: false,
    message: "",
  };
  const body = {
    postId: postId,
    userId: userId,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).post(
      "/api/v1/apply",
      body
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

// (사업자) 지원자리스트 확인 API
export const applicantListAPI = async (accessToken, dispatch, postId) => {
  const response = {
    isSuccess: false,
    message: "",
    data: [],
  };

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      `/api/v1/apply/post/${postId}/applicant`
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data.applicantList;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response.data;
  }

  return response;
};
// (사업자) 채용하기 API
// (사업자) 구인글 마감하기 API
