import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useSignupRouter = (step, navigate) => {
  const { currentStep, signupType } = useSelector((state) => state.signupInfo);

  useEffect(() => {
    console.log(currentStep);

    // 현재 유저가 진행 완료한 단계가 step보다 높은 경우
    if (currentStep + 1 > step) {
      return; // 아무 처리도 하지 않음
    }

    // 현재 유저가 진행 완료한 단계가 step과 같은 경우
    if (currentStep + 1 === step) {
      return; // 아무 처리도 하지 않음
    }

    // 현재 유저가 진행 완료한 단계가 step보다 낮은 경우
    if (currentStep + 1 < step) {
      switch (currentStep) {
        case 0:
          navigate("/signup");
          break;
        case 1:
          navigate("/signup/info"); // 정보 입력 화면으로 이동
          break;
        case 2:
          navigate(
            signupType === "USER"
              ? "/signup/info/basic"
              : "/signup/info/business"
          ); // 사용자 유형에 따른 경로 이동
          break;
        case 3:
          navigate("/signup/info/location"); // 위치 설정 화면으로 이동
          break;
        default:
          break;
      }
    }
  }, [currentStep, signupType, step, navigate]);
};
