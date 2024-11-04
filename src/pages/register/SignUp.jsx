import React from "react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
  BodyTitle,
} from "../../styles/Login.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate, Routes, Route } from "react-router-dom";
import ChoiceType from "./ChoiceType";
import UserInfo from "./UserInfo";
import BusinessUserInfo from "./BusinessUserInfo";
import InitLocation from "./InitLocation";
import { useDispatch } from "react-redux";
import { VERIFY_EMAIL } from "../../store/signupInfo";
import EmailAuth from "../../components/EmailAuth";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = (email, password) => {
    dispatch(VERIFY_EMAIL({ email: email, password: password }));
    navigate("/signup/info");
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
            이메일 계정으로 회원가입해주세요.
          </span>
          <span>
            이메일 계정은 안전하게 보관되며 이웃들에게 공개되지 않아요.
          </span>
        </BodyTitle>

        <EmailAuth onSuccess={handleSuccess} />
      </BodyContainer>
    </Container>
  );
}

function SignUpRoute() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/info" element={<ChoiceType />} />
      <Route path="/info/business" element={<BusinessUserInfo />} />
      <Route path="/info/basic" element={<UserInfo />} />
      <Route path="/info/location" element={<InitLocation />} />
    </Routes>
  );
}

export default SignUpRoute;
