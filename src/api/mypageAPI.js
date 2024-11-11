import { privateAxios } from "../utils/customAxios";

// 프로필 메인 페이지 API
export const normalProfileAPI = async (accessToken, dispatch) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  }; // gender, birthday(공통), / employeeName, employeeAddress, phoneNumber / ceoName, ceoPhoneNumber

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      "/api/v1/user-profiles/profile"
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message =
      err.status == 404
        ? "존재하지 않는 유저입니다."
        : err.status == 400
        ? "정의되지 않은 유저입니다."
        : err.message;
  }
  return response;
};

// (구직자) 본인이 지원한 목록 확인
export const appliedPostListAPI = async (accessToken, dispatch, id) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      `/api/v1/post/post/applied/${id}`
    );
    if (result.status == 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data.postList;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// (구인자) 본인이 작성한 구인글 확인
export const writtenPostListAPI = async (accessToken, dispatch, id) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      "/api/v1/post/user/posted",
      { params: { userId: id } }
    );
    if (result.status == 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data.postedPostList;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// 기본정보 수정 정보 받아오기 페이지 API (GET)
export const basicProfileInfoAPI = async (accessToken, dispatch) => {
  const response = {
    isSuccess: false,
    message: "",
    data: null,
  };

  try {
    const result = await privateAxios(accessToken, dispatch).get(
      "/api/v1/user-profiles/employee-main-profile"
    );
    if (result.status == 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.data = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// 경력 수정 API
// 자기소개 수정 API
export const modifyMySelfAPI = async (accessToken, dispatch, selfIntro) => {
  const body = {
    selfIntro: selfIntro,
  };

  const response = {
    isSuccess: false,
    message: "",
  };

  try {
    const result = await privateAxios(accessToken, dispatch).patch(
      "/api/v1/user-profiles/update-self-introduction",
      body
    );
    if (result.status == 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// 추가정보 수정 API
export const modifyExtraInfoAPI = async (accessToken, dispatch, info) => {
  const response = {
    isSuccess: false,
    message: "",
  };

  try {
    const result = await privateAxios(accessToken, dispatch).patch(
      "/api/v1/user-profiles/update-additional-info",
      info
    );
    if (result.status == 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// 나의 장점 수정 API
export const modifyStrengthInfoAPI = async (accessToken, dispatch, info) => {
  const response = {
    isSuccess: false,
    message: "",
  };

  try {
    const result = await privateAxios(accessToken, dispatch).patch(
      "/api/v1/user-profiles/update-strength",
      info
    );
    if (result.status == 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

/** 기본 정보 수정 API */
// 프로필 관련 API (업로드, 수정, 삭제)
// (업로드)
export const uploadProfileImageAPI = async (
  accessToken,
  dispatch,
  profileImage
) => {
  const response = {
    isSuccess: false,
    message: "",
    imageUrl: null,
  };

  let formData = new FormData();
  formData.append("image", profileImage);

  try {
    const result = await privateAxios(accessToken, dispatch).post(
      "/api/v1/user-profiles/upload-profile-image",
      formData
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.imageUrl = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message =
      err.status == 400
        ? "유효하지 않은 파일 형식입니다"
        : "파일 변환에 실패하였습니다";
  }
  return response;
};

// (수정)
export const updateProfileImageAPI = async (
  accessToken,
  dispatch,
  profileImage
) => {
  const response = {
    isSuccess: false,
    message: "",
    imageUrl: null,
  };

  let formData = new FormData();
  formData.append("image", profileImage);

  try {
    const result = await privateAxios(accessToken, dispatch).patch(
      "/api/v1/user-profiles/update-profile-image",
      formData
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
      response.imageUrl = result.data.data;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }
  return response;
};

// (삭제)
export const deleteProfileImageAPI = async (
  accessToken,
  dispatch,
  imageUrl
) => {
  const response = {
    isSuccess: false,
    message: "",
  };

  try {
    const result = await privateAxios(accessToken, dispatch).patch(
      "/api/v1/user-profiles/update-profile-image",
      { params: imageUrl }
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message =
      err.status == 500 ? "이미지 삭제에 실패하였습니다" : err.message;
  }
  return response;
};

// 프로필 기본 정보 수정 API
export const modifyBasicInfoAPI = async (accessToken, dispatch, body) => {
  const response = {
    isSuccess: false,
    message: "",
  };

  try {
    const result = await privateAxios(accessToken, dispatch).patch(
      "/api/v1/user-profiles/update-basic-info",
      body
    );
    if (result.status === 200) {
      response.isSuccess = true;
      response.message = result.data.message;
    }
  } catch (err) {
    response.isSuccess = false;
    response.message = err.message;
  }

  return response;
};
