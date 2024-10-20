import React from "react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
  BodyTitle,
} from "../../styles/Login.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import EmailAuth from "../../components/EmailAuth";

function Login() {
  const navigate = useNavigate();
  // 로그인 토큰 함수 API 연결시 추가예정.. onSucces로 함수 넘김

  return (
    <Container>
      <HeaderContainer>
        <IconChevronLeft size={30} onClick={() => navigate("/")} />
      </HeaderContainer>
      <BodyContainer>
        <BodyTitle>
          <span>
            안녕하세요! <br />
            이메일 계정으로 로그인해주세요.
          </span>
          <span>
            이메일 계정은 안전하게 보관되며 이웃들에게 공개되지 않아요.
          </span>
        </BodyTitle>
        <EmailAuth onSuccess={() => navigate("/home", { replace: true })} />
      </BodyContainer>
    </Container>
  );
}
export default Login;
