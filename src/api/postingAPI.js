import {privateAxios} from "../utils/customAxios";

/*---- 게시글 등록 ----*/
export const postJobPosting = async (payload) => {

  const endpoint = `/api/v1/post`;

  try {
    const result = await privateAxios.post(endpoint, payload);
    return {
      isSuccess: true,
      message: result.data.message,
      postId: result.data.postId,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.response?.data?.message || "API 요청 실패",
    };
  }
};

/*---- 게시글 수정 ----*/
export const updateJobPosting = async (payload) => {
  const endpoint = `api/v1/post/update`;

  try {
    const result = await privateAxios.post(endpoint, payload);
    return {
      isSuccess: true,
      message: result.data.message,
    };
  } catch (error) {
    return {
      isSuccess: false,
      message: error.response?.data?.message || "API 요청 실패",
    };
  }
};