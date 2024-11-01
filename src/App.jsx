import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme/theme";
import Landing from "./pages/Landing";
import Login from "./pages/register/Login";
import SignUpRoute from "./pages/register/SignUp";
import MyPageRoute from "./pages/mypage/MyPageRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/*" element={<SignUpRoute />} />
          <Route path="/mypage/*" element={<MyPageRoute />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
