import { privateAxios } from "../utils/customAxios";

/*---- 게시글 등록 ----*/
export const postJobPosting = async (accessToken, dispatch, body) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).post(
      "/api/v1/post",
      body
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err;
  }

  return response;
};

/*---- 게시글 수정 ----*/
export const updateJobPosting = async (
  accessToken,
  postId,
  postData,
  userId
) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const body = {
      postId: postId,
      userId: userId,
      storeName: "", // 수정 불가
      workPlaceAddress: "", // 수정 불가
      postData,
    };

    const result = await privateAxios(accessToken).patch(
      `/api/v1/post/${postId}`,
      body
    );

    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (err) {
    console.error("Error in updateJobPosting:", err);
    response.message = err.response?.data?.message || "Unknown error occurred.";
  }

  return response;
};

/*---- 게시글 데이터 호출 ----*/
export const getPostById = async (postId, accessToken) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };
  try {
    const result = await privateAxios(accessToken).get(`/api/v1/post/${postId}`);
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = "Post data fetched successfully.";
      response.data = result.data;
    }
  } catch (error) {
    console.error("Error fetching post data:", error);
    response.message =
      error.response?.data?.message || "Failed to fetch post data.";
  }
  return response;
};

/**------ 이미지 업로드 (개별) ------ */
export const uploadPostImageAPI = async (accessToken, dispatch, file) => {
  const response = {
    isSuccess: false,
    message: "",
    imageUrl: "",
  };

  let formData = new FormData();
  formData.append("image", file);

  try {
    const result = await privateAxios(accessToken, dispatch).post(
      `/api/v1/post/upload-post-image`,
      formData
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.imageUrl = result.data.data;
    }
  } catch (error) {
    response.message = error.response.data;
  }
  return response;
};
