import { createSlice } from "@reduxjs/toolkit";

// 모듈의 초기 상태
const initialState = {
  accessToken: null,
};

const localTokenSlice = createSlice({
  name: "localToken",
  initialState,
  reducers: {
    SET_LOCAL_TOKEN(state, action) {
      state.accessToken = action.payload;
    },
    DELETE_LOCAL_TOKEN: (state) => {
      state.accessToken = null;
    },
  },
});

export const { SET_LOCAL_TOKEN, DELETE_LOCAL_TOKEN } = localTokenSlice.actions;

export default localTokenSlice.reducer;
