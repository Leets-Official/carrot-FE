import React, { useState } from "react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
  BodyTitle,
  Form,
} from "../../styles/Login.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";
import theme from "./../../styles/theme/theme";

function Login() {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  // 로그인 정보 일치 여부 확인
  const handleLogin = () => {
    const { email, password } = loginState;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    } else if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    // 로그인 API 호출
    console.log(email, password);
  };

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
        <Form>
          <Input
            color="white"
            border="grey"
            textcolor="black"
            size="18px"
            value={loginState.email}
            onChange={(e) =>
              setLoginState((pre) => ({ ...pre, email: e.target.value }))
            }
          >
            ex. abc@gmail.com
          </Input>
          <Input
            color="white"
            border="grey"
            textcolor="black"
            size="18px"
            type="password"
            value={loginState.password}
            onChange={(e) =>
              setLoginState((pre) => ({ ...pre, password: e.target.value }))
            }
          >
            비밀번호
          </Input>
          <Button
            color={theme.color.carrot}
            textcolor="white"
            onClick={handleLogin}
          >
            로그인하기
          </Button>
        </Form>
      </BodyContainer>
    </Container>
  );
}
export default Login;
