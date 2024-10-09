import styled from "styled-components";

/**
  상단 로고 스타일
*/
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 30px;

  img {
    width: 50%;
  }
`;

const LogoCaptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CaptionMain = styled.div`
  font-weight: 700;
  font-size: 32px;
`;

const CaptionSub = styled.div`
  font-size: 20px;
  text-align: center;
`;

/**
 * 하단 로그인 스타일
 */

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
  margin-bottom: 50px;
`;

const LoginButtons = styled.div`
  display: flex;
  gap: 16px;

  font-weight: 400;
  font-size: 20px;

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
    color: var(--color-carrot);
  }
`;

export {
  LogoContainer,
  LogoCaptions,
  CaptionMain,
  CaptionSub,
  ButtonContainer,
  LoginButtons,
};
