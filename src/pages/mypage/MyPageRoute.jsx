import { Routes, Route } from "react-router-dom";
import MyPage from "./MyPage";
import MyPageInfo from "./MyPageInfo";
import ApplicantList from "./applicanat/ApplicantList";
import CoverLetter from "./applicanat/CoverLetter";
function MyPageRoute() {
  return (
    <Routes>
      <Route path="/" element={<MyPage />} />
      <Route path="/info" element={<MyPageInfo />} />
      <Route path="/applicant/:postId" element={<ApplicantList />} />
      <Route path="/applicant/:postId/:id" element={<CoverLetter />} />
    </Routes>
  );
}

export default MyPageRoute;
