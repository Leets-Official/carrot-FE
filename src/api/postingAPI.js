import { privateAxios } from "../utils/customAxios";

/*---- 게시글 등록 ----*/
export const postJobPosting = async (payload) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios.get("/api/v1/post", {
      params: payload,
    });

    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (error) {
    response.isSuccess = false;
    response.message =
      error.response?.status === 404
        ? "존재하지 않는 유저입니다."
        : error.response?.status === 400
        ? "정의되지 않은 유저입니다."
        : error.response?.data?.message || error.message;
  }

  return response;
};

/*---- 게시글 수정 ----*/
export const updateJobPosting = async (payload) => {
  const response = {
    isSuccess: false,
    message: "",
  };

  try {
    const result = await privateAxios.patch("/{postId}", payload);

    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (error) {
    response.isSuccess = false;
    response.message =
      error.response?.data?.message || "API 요청 실패";
  }

  return response;
};