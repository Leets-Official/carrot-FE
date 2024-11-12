import { privateAxios } from "../utils/customAxios";

/*---- 게시글 등록 ----*/
export const postJobPosting = async (accessToken, payload) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken).patch("/api/v1/post", payload);
    
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response?.data?.message || err.message;
  
    if (err.response?.status === 401) {
      alert("인증이 필요합니다. 다시 로그인해주세요.");
    }
  
  }

  return response;
};

// /*---- 게시글 수정 ----*/
export const updateJobPosting = async (accessToken, postId, postData) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const body = {
      postId, 
      userId,
      storeName: "", // 수정 불가
      workPlaceAddress: "", // 수정 불가
      postData, // 수정 가능한 postData만 포함
    };

    const result = await privateAxios(accessToken).patch(`/api/v1/post/${postId}`, body);

    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response?.data?.message || err.message;
  }

  return response;
};