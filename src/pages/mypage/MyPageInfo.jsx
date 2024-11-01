import { useState } from "react";
import { IconChevronLeft, IconPencil, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  HeaderContainer,
  BodyContainer,
  DefaultInfo,
  CoverLetter,
  Section,
  WrapToggle,
  Tag,
} from "../../styles/mypage/MyPage.styles";
import { MYPAGE_MERIT_TAG, MYPAGE_EXTRA_INFO_TAG } from "../../constants";
import theme from "../../styles/theme/theme";
import Button from "../../components/Button";
import AddWorked from "../../components/mypage/AddWorked";
import TextArea from "../../components/TextArea";
import Worked from "../../components/mypage/Worked";

function MyPageInfo() {
  const navigate = useNavigate();
  const userType = "USER"; // "userType(USER,CEO)"은 useSelector를 통해 userInfo reducer에서 가져올 예정
  // 예시데이터 (변경예정)
  const [userData, setUserData] = useState({
    img: "https://pbs.twimg.com/profile_images/1715217368455213056/lrIZCNs5_400x400.jpg",
    name: "오수빈",
    phone: "01049412984",
    sex: "여성",
    year: 2002,
    location: "장현동",
    job: [
      {
        title: "타이틀임",
        script: "정확히하는일이 이럼",
        year: 2023,
        time: "3개월 이하",
      },
    ],
    self: "자기소개뭐라뭐라",
    extra: {
      비흡연자: 0,
      장기근무가능: 0,
      영어가능: 1,
      군필: 0,
      조리자격증: 1,
    },
    merit: {
      성실해요: 0,
      지각안해요: 1,
      위생에신경써요: 0,
      집이가까워요: 1,
      잠이없어요: 1,
    },
  });
  const [isOpenWorked, setIsOpenWorked] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState({
    // 각 Section에 대한 수정모드 on/off
    self: false,
    extra: false,
    merit: false,
  });
  const handleMode = (key) => {
    setIsModifyMode((pre) => ({
      ...pre,
      [key]: !pre[key],
    }));
  };

  /*----------1.기본정보 수정(ModifyInfo.jsx수정)------------*/
  /*---------2.경력사항 관련 함수(추가,삭제)----------*/
  const handleAddWorked = (newJob) => {
    setUserData((prev) => ({
      ...prev,
      job: [...prev.job, newJob], // 기존의 job 배열에 새 경력 추가
    }));
  };

  const handleDeleteWorked = (index) => {
    setUserData((prev) => ({
      ...prev,
      job: prev.job.filter((_, i) => i !== index), // 삭제할 인덱스를 제외한 새로운 배열 생성
    }));
  };

  /*------------ 3.추가사항,나의 장점[태그] on/off 토글 함수-------------*/
  const handleTag = (key, tag) => {
    setUserData((pre) => ({
      ...pre,
      [key]: {
        ...pre[key],
        [tag]: pre[key][tag] === 0 ? 1 : 0, // 0이면 1로, 1이면 0으로 토글
      },
    }));
  };

  /*-----------각 Section 수정 API----------- */
  // 경력사항 추가*삭제 API => AddWorked 컴포넌트
  // 자기 소개
  const modifySelf = (tag) => {
    handleMode(tag);
    // API 추가
  };
  // 추가사항 , 나의 장점
  const modifyTag = (tag) => {
    handleMode(tag);
    // API 추가
  };
  return (
    <Container>
      <HeaderContainer>
        <IconChevronLeft
          size={30}
          onClick={() => {
            navigate("/mypage");
          }}
        />
        <span>{userType === "USER" ? "내 지원서 관리" : "내 정보 관리"}</span>
      </HeaderContainer>
      <BodyContainer>
        <DefaultInfo>
          <div className="profileImgBox">
            {userData.img !== null && <img src={userData.img} />}
          </div>
          <div className="profileInfoBox">
            <div>{userData.name}</div>
            <div>
              {userData.sex} · {userData.year} · {userData.location}
            </div>
            <div>{userData.phone}</div>
          </div>
          <IconPencil
            color="gray"
            onClick={() =>
              navigate("/mypage/info/modify", {
                state: { data: userData },
              })
            }
          />
        </DefaultInfo>
        {userType === "USER" && (
          <CoverLetter>
            <Section>
              <div className="title">
                <span>경력</span>
                {!isModifyMode.job && (
                  <IconPlus
                    color="gray"
                    onClick={() => setIsOpenWorked(true)}
                  />
                )}
              </div>
              <div className="job">
                {userData.job.map((job, index) => (
                  <Worked
                    key={index}
                    data={job}
                    onDelete={() => handleDeleteWorked(index)} // 삭제 함수 전달
                  />
                ))}
              </div>
            </Section>
            <Section>
              <div className="title">
                <span>자기 소개</span>
                {!isModifyMode.self && (
                  <IconPencil color="gray" onClick={() => handleMode("self")} />
                )}
              </div>
              {isModifyMode.self ? (
                <>
                  <TextArea
                    value={userData.self}
                    onChange={(e) => {
                      setUserData((pre) => ({
                        ...pre,
                        self: e.target.value,
                      }));
                    }}
                  />
                  <Button
                    color={theme.color.carrot}
                    textcolor="white"
                    onClick={() => modifySelf("self")}
                  >
                    완료
                  </Button>
                </>
              ) : (
                <div className="self">{userData.self}</div>
              )}
            </Section>
            <Section>
              <div className="title">
                <span>추가 정보</span>
                {!isModifyMode.extra && (
                  <IconPencil
                    color="gray"
                    onClick={() => handleMode("extra")}
                  />
                )}
              </div>
              <WrapToggle>
                {MYPAGE_EXTRA_INFO_TAG.map((tag) => (
                  <Tag
                    key={tag}
                    color={userData.extra[tag] ? "#E3F2FD" : "transparent"}
                    textcolor={userData.extra[tag] ? "#2196F3" : "gray"}
                    onClick={
                      isModifyMode.extra
                        ? () => handleTag("extra", tag)
                        : undefined
                    }
                  >
                    {tag}
                  </Tag>
                ))}
              </WrapToggle>
              {isModifyMode.extra && ( // 버튼은 수정 모드일 때만 보이도록
                <Button
                  color={theme.color.carrot}
                  textcolor="white"
                  onClick={() => modifyTag("extra")}
                >
                  완료
                </Button>
              )}
            </Section>
            <Section>
              <div className="title">
                <span>나의 장점</span>
                {!isModifyMode.merit && (
                  <IconPencil
                    color="gray"
                    onClick={() => handleMode("merit")}
                  />
                )}
              </div>
              <WrapToggle>
                {MYPAGE_MERIT_TAG.map((tag) => (
                  <Tag
                    key={tag}
                    color={userData.merit[tag] ? "#E3F2FD" : "transparent"}
                    textcolor={userData.merit[tag] ? "#2196F3" : "gray"}
                    onClick={
                      isModifyMode.merit
                        ? () => handleTag("merit", tag)
                        : undefined
                    }
                  >
                    {tag}
                  </Tag>
                ))}
              </WrapToggle>
              {isModifyMode.merit && ( // 버튼은 수정 모드일 때만 보이도록
                <Button
                  color={theme.color.carrot}
                  textcolor="white"
                  onClick={() => modifyTag("merit")}
                >
                  완료
                </Button>
              )}
            </Section>
          </CoverLetter>
        )}
      </BodyContainer>
      {isOpenWorked && (
        <AddWorked
          onClose={() => setIsOpenWorked(false)}
          onAdd={handleAddWorked}
        />
      )}
    </Container>
  );
}

export default MyPageInfo;
