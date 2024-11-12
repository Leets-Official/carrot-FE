import axios from "axios";
import { privateAxios } from "../utils/customAxios";

/*---- 게시글 등록 ----*/
export const postJobPosting = async (accessToken, payload) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken).post("/api/v1/post", payload); // POST로 변경
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

/*---- 게시글 수정 ----*/
export const updateJobPosting = async (accessToken, postId, postData, userId) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const body = {
      postId:postId,
      userId:userId,
      storeName: "", // 수정 불가
      workPlaceAddress: "", // 수정 불가
      postData,
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

/*---- 게시글 데이터 호출 ----*/
export const getPostById = async (postId, accessToken) => {
  try {
    const response = await axios.get(`http://43.203.223.82:8080/api/v1/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
};