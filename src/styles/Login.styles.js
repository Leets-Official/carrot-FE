import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 440px;
  height: 810px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
`;

const BodyContainer = styled.div`
  width: 100%;
  padding: 10% 0;
`;

const BodyTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  span:first-child {
    font-size: 30px;
    font-weight: 700;
  }
  span:last-child {
    font-size: 20px;
    font-weight: 400;
  }
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  .validEmailRequest .validEmailAuthCode {
    font-size: 12px;
  }
`;

export { Container, HeaderContainer, BodyContainer, BodyTitle, Form };
