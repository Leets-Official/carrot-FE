import {
  duplicateEmailAPI,
  verifyCEOAPI,
  signupUserAPI,
  signupCEOAPI,
} from "./signupAPI";
import { loginAPI } from "./loginAPI";
import{ postJobPosting, updateJobPosting } from "./postingAPI";
import { postListAPI, searchPostListAPI } from "./homeAPI";

export {
  duplicateEmailAPI, // 이메일 인증 API
  verifyCEOAPI, // 사업자 인증 API
  signupUserAPI, // 일반유저 회원가입 API
  signupCEOAPI, // 사업자유저 회원가입 API
  loginAPI, // 로그인 API
  postJobPosting, //모집글 작성 API
  updateJobPosting, //모집글 수정 API
  postListAPI, // 알바리스트 불러오기(홈) API
  searchPostListAPI, // 알바리스트 불러오기 (검색) API
};
