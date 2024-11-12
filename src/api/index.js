import {
  duplicateEmailAPI,
  verifyCEOAPI,
  signupUserAPI,
  signupCEOAPI,
} from "./signupAPI";
import { loginAPI } from "./loginAPI";
import {
  postJobPosting,
  updateJobPosting,
  getPostById,
  uploadPostImageAPI,
} from "./postingAPI";
import { postListAPI, searchPostListAPI } from "./homeAPI";

export {
  duplicateEmailAPI, // 이메일 인증 API
  verifyCEOAPI, // 사업자 인증 API
  signupUserAPI, // 일반유저 회원가입 API
  signupCEOAPI, // 사업자유저 회원가입 API
  loginAPI, // 로그인 API
  postJobPosting, //모집글 작성 API
  uploadPostImageAPI, // 모집글 작성 중 이미지 업로드 API
  updateJobPosting, //모집글 수정 API
  getPostById, // 모집글 수정시 postData 불러오기 API
  postListAPI, // 알바리스트 불러오기(홈) API
  searchPostListAPI, // 알바리스트 불러오기 (검색) API
};
