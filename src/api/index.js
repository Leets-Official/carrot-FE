import {
  duplicateEmailAPI,
  verifyCEOAPI,
  signupUserAPI,
  signupCEOAPI,
} from "./signupAPI";
import { loginAPI } from "./loginAPI";
import { postListAPI, searchPostListAPI } from "./homeAPI";
import {
  normalProfileAPI,
  writtenPostListAPI,
  appliedPostListAPI,
  basicProfileInfoAPI,
  modifyMySelfAPI,
  modifyExtraInfoAPI,
  modifyStrengthInfoAPI,
  uploadProfileImageAPI,
  modifyBasicInfoAPI,
} from "./mypageAPI";

export {
  duplicateEmailAPI, // 이메일 인증 API
  verifyCEOAPI, // 사업자 인증 API
  signupUserAPI, // 일반유저 회원가입 API
  signupCEOAPI, // 사업자유저 회원가입 API
  loginAPI, // 로그인 API
  postListAPI, // 알바리스트 불러오기(홈) API
  searchPostListAPI, // 알바리스트 불러오기 (검색) API
  normalProfileAPI, // 마이페이지 메인 불러오기 API
  writtenPostListAPI, // (사업자) 마이페이지 구인글 불러오기 API
  appliedPostListAPI, // (구직자) 마이페이지 지원글 불러오기 API
  basicProfileInfoAPI, // 마이페이지 수정 글 불러오기 API
  modifyMySelfAPI, // 마이페이지 자기소개 수정 API
  modifyExtraInfoAPI, // 마이페이지 추가사항 수정 API
  modifyStrengthInfoAPI, // 마이페이지 나의 장점 API
  uploadProfileImageAPI, // 마이페이지 기본 정보 프로필 이미지 업로드 API
  modifyBasicInfoAPI, // 마이페이지 (이미지 제외) 기본정보 수정 API
};
