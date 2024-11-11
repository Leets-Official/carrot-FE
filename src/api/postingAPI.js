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
      response.data = result.data.data; // 필요에 따라 데이터 할당
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.response?.data?.message || err.message;
  
    if (err.response?.status === 401) {
      alert("인증이 필요합니다. 다시 로그인해주세요.");
      // 여기서 로그아웃 및 재로그인 프로세스를 트리거할 수 있음
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
      postId, // 백엔드에서 postId가 필요하지 않다고 명시했으나, 요청 형식에 포함
      userId: 0, // 사용하지 않음
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