import { createSlice } from "@reduxjs/toolkit";

// 모듈의 초기 상태
const initialState = {
  userType: "REGISTER",
  userId: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    USER_LOGIN(state, action) {
      state.userType = action.payload.type;
      state.userId = action.payload.id;
    },
  },
});

export const { USER_LOGIN } = userInfoSlice.actions;

export default userInfoSlice.reducer;
