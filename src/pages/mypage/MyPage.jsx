import { useState, useEffect } from "react";
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
import { normalProfileAPI } from "../../api";
import getAccessToken from "./../../utils/getAccessToken";
import { useDispatch, useSelector } from "react-redux";

const TABS = [
  { name: "내 지원내역", content: <ApplyList />, type: [1, 0] },
  { name: "내 구인글 보기", content: <RecruitList />, type: [0, 1] },
];

function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const userType = useSelector((state) => state.userInfo.userType);
  const userIndex = userType === "EMPLOYEE" ? 0 : 1;
  const filteredTabs = TABS.filter((tab) => tab.type[userIndex] === 1);

  const [tabMenu] = useState(filteredTabs);
  const [currentTab, clickTab] = useState(0);
  const [data, setData] = useState(null);

  const selectTabHandler = (index) => {
    clickTab(index);
  };

  useEffect(() => {
    normalProfileAPI(accessToken, dispatch).then((res) => {
      if (res.isSuccess) {
        setData(res.data);
      } else {
        alert(res.message);
      }
    });
  }, []);

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
              {data?.profileImageUrl && <img src={data?.profileImageUrl} />}
            </div>
            <div className="captionBox">
              <span>
                {userType == "EMPLOYEE" ? data?.employeeName : data?.ceoName}
              </span>
              <span>
                {userType == "EMPLOYEE"
                  ? data?.employeeAddress
                  : data?.ceoAddress}
              </span>
            </div>
          </ProfileBox>
          <button onClick={() => navigate("/mypage/info")}>
            {userType == "EMPLOYEE" ? "내 지원서 관리" : "정보 수정하기"}
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
