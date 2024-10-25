import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ApplyList from "./ApplyList";
import InterestList from "./InterestList";
import RecruitList from "./applicanat/RecruitList";
import {
  Container,
  HeaderContainer,
  BodyContainer,
  ProfileContainer,
  ProfileBox,
  TabMenuContainer,
  TabContent,
} from "../../styles/MyPage.styles";

const TABS = [
  { name: "내 지원내역", content: <ApplyList />, type: [1, 0] },
  { name: "관심 목록", content: <InterestList />, type: [1, 1] },
  { name: "내 구인글 보기", content: <RecruitList />, type: [0, 1] },
];

function MyPage() {
  const navigate = useNavigate();

  const userType = "CEO"; // "userType(USER,CEO)"은 useSelector를 통해 userInfo reducer에서 가져올 예정
  const userIndex = userType === "USER" ? 0 : 1;
  const filteredTabs = TABS.filter((tab) => tab.type[userIndex] === 1);

  const [tabMenu] = useState(filteredTabs);
  const [currentTab, clickTab] = useState(0);
  const name = "이름";
  const location = "장현동";

  const selectTabHandler = (index) => {
    clickTab(index);
  };

  return (
    <Container>
      <HeaderContainer>
        <IconChevronLeft
          size={30}
          onClick={() => {
            navigate("/home");
          }}
        />
        <span>당근알바 프로필</span>
      </HeaderContainer>
      <BodyContainer>
        <ProfileContainer>
          <ProfileBox>
            <div className="profileImgBox">
              <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcGbz7k%2FbtsD1mY2YBd%2FLkWiVVFa4fwyHiCkSW0Ru0%2Fimg.png" />{" "}
              {/**url 없다면 빈 박스이미지 */}
            </div>
            <div className="captionBox">
              <span>{name}</span>
              <span>{location}</span>
            </div>
          </ProfileBox>

          <button onClick={() => navigate("/mypage/info")}>
            {userType == "USER" ? "내 지원서 관리" : "정보 수정하기"}
          </button>
        </ProfileContainer>
        <TabMenuContainer>
          {tabMenu.map((tab, index) => {
            return (
              <button
                className={index === currentTab ? "tabBtn focused" : "tabBtn"}
                key={index}
                onClick={() => selectTabHandler(index)}
              >
                {tab.name}
              </button>
            );
          })}
        </TabMenuContainer>
        <TabContent>{tabMenu[currentTab].content}</TabContent>
      </BodyContainer>
    </Container>
  );
}

export default MyPage;
