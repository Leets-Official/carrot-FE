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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  border-bottom: 1px solid #f1f3f5;

  span {
    font-size: 20px;
    font-weight: 700;
  }
`;

const BodyContainer = styled.div`
  width: 100%;
  padding: 10% 0;
`;

const BodyTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 10px;

  > .checkbox {
    display: flex;
    text-align: center;
    gap: 5px;
    margin-bottom: 10px;
  }

  > .opening-date-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    > .opening-date-box {
      display: flex;
      gap: 10px;
    }
  }
`;

export { Container, HeaderContainer, BodyContainer, BodyTitle, Form };
