import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

// 모듈의 초기 상태
const initialState = {
  signupEmail: "",
  signupEmailIsVerify:false,
  signupType:"NONE",
  signupName:"",
  signupPhone:"",
  // 사업자 경우
  signupCEO:{
    number:"",
    date:"",
    exponent:"",
    isVerify:false
  },
  signupLoc:"",
  currentStep: 0, // 현재 완료 단계 (1: 이메일 인증, 2: 회원가입 타입 선택, 3: 이름 및 전화번호 입력, 사업자 인증, 4: 주소 입력)
};

// 액션 타입 없이 createSlice를 사용하여 리듀서를 간결하게 작성
const signupSlice = createSlice({
  name: "signupInfo",
  initialState,
    reducers: {
        // 이메일 인증 완료
        VERIFY_EMAIL: (state,action) => {
            state.signupEmail = action.payload;
            state.signupEmailIsVerify = true;
            state.currentStep = 1; 
        },
        // 회원가입 타입 선택 (USER,CEO)
        SET_SIGNUP_TYPE: (state, action) => {
            state.signupType = action.payload.type;
            state.currentStep = 2;
        },
        // 이름 및 전화번호 입력(일반 유저&사업자 유저)
        SET_USER_INFO: (state, action) => {
            state.signupName = action.payload.name;
            state.signupPhone = action.payload.phone;
            state.currentStep = state.signupType==="USER"?3 :2
        },
        // 이름 및 전화번호 입력(사업자 유저)
        VERIFY_CEO: (state,action) => {
            state.signupCEO.number=action.payload.number;
            state.signupCEO.date=action.payload.date;
            state.signupCEO.exponent=action.payload.exponent;
            state.signupCEO.isVerify=true;
            state.currentStep=3;
        },
        // 주소 입력
        SET_ADDRESS: (state, action) => {
            state.signupLoc = action.payload; // 주소 저장
            state.currentStep = 4; // 회원가입 완료 단계로 설정
        },
        // 회원가입 단계 초기화
        RESET_SIGNUP: () => {
            return initialState; // 초기 상태로 리셋
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, () => {
            return initialState; // Redux Persist의 PURGE 액션에 대한 처리
        });
    },
});

// 액션 및 리듀서 내보내기
export const {
  VERIFY_EMAIL,
  SET_SIGNUP_TYPE,
  SET_USER_INFO,
  VERIFY_CEO,
  SET_ADDRESS,
  RESET_SIGNUP,
} = signupSlice.actions;

export default signupSlice.reducer;