import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/register/Login";
import SignUpRoute from "./pages/register/SignUp";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/*" element={<SignUpRoute />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
