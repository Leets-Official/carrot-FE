import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ApplyList from "./ApplyList";
import RecruitList from "./applicant/RecruitList";
import {
  Container,
  HeaderContainer,
  BodyContainer,
  ProfileContainer,
  ProfileBox,
  TabMenuContainer,
  TabContent,
} from "../../styles/mypage/MyPage.styles";

const TABS = [
  { name: "내 지원내역", content: <ApplyList />, type: [1, 0] },
  { name: "내 구인글 보기", content: <RecruitList />, type: [0, 1] },
];

function MyPage() {
  const navigate = useNavigate();

  const userType = "USER"; // "userType(USER,CEO)"은 useSelector를 통해 userInfo reducer에서 가져올 예정
  const userIndex = userType === "USER" ? 0 : 1;
  const filteredTabs = TABS.filter((tab) => tab.type[userIndex] === 1);

  const [tabMenu] = useState(filteredTabs);
  const [currentTab, clickTab] = useState(0);
  const [data, setData] = useState({
    img: "https://pbs.twimg.com/profile_images/1715217368455213056/lrIZCNs5_400x400.jpg",
    name: "오수빈",
    phone: "01049412984",
    sex: "여성",
    year: 2002,
    location: "장현동",
    self: "자기소개뭐라뭐라",
  });

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
              {data?.img && <img src={data.img} />}
            </div>
            <div className="captionBox">
              <span>{data.name}</span>
              <span>{data.location}</span>
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
