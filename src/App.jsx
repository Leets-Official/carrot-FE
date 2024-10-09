import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/register/Login";
import SignUp from "./pages/register/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/*" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
