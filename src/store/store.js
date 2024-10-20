import { configureStore } from '@reduxjs/toolkit';
import signupReducer from './signupInfo'; // 리듀서 파일 경로를 지정

const store = configureStore({
  reducer: {
    signupInfo: signupReducer, // signupInfo라는 키로 리듀서 등록
  },
});

export default store;
