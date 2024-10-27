import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Posting from "./pages/recruitment/Posting";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/posting" element={<Posting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
