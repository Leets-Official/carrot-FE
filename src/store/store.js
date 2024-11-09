import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./signupInfo";
import localTokenReducer from "./localToken";
import userInfoReducer from "./userInfo";
import localStorage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const localPersistConfig = {
  key: "local",
  storage: localStorage, // 로컬 스토리지에 저장
  whiteList: ["localToken", "userInfo", "signupInfo"],
};

// 리듀서 하나로 묶기
const localReducer = combineReducers({
  signupInfo: signupReducer, // 회원가입 상태 진행 중
  localToken: localTokenReducer, // 액세스 토큰
  userInfo: userInfoReducer, // 로그인 유저 정보
});

// persist로 감싸기
const persistedReducer = persistReducer(localPersistConfig, localReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ], // persist 관련 액션을 직렬화 체크에서 제외
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
