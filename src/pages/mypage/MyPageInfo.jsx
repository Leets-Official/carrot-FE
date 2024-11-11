import { useEffect, useState } from "react";
import { IconChevronLeft, IconPencil, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getAccessToken from "./../../utils/getAccessToken";
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
import {
  basicProfileInfoAPI,
  modifyExtraInfoAPI,
  modifyMySelfAPI,
  modifyStrengthInfoAPI,
} from "../../api";

function MyPageInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const userType = useSelector((state) => state.userInfo.userType);
  // 예시데이터 (변경예정)
  const [userData, setUserData] = useState(null);
  const [extraData, setExtraData] = useState({}); // 추가정보 태그
  const [strengthData, setStrengthData] = useState({}); // 나의 장점 태그

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
    if (key === "extra") {
      setExtraData((pre) => ({
        ...pre,
        [tag]: pre[tag] ? false : true,
      }));
    } else if (key === "merit") {
      setStrengthData((pre) => ({
        ...pre,
        [tag]: pre[tag] ? false : true,
      }));
    }
  };

  /*-----------각 Section 수정 API----------- */
  // 경력사항 추가*삭제 API => AddWorked 컴포넌트
  // 자기 소개
  const modifySelf = (tag) => {
    console.log(userData.selfIntro);
    modifyMySelfAPI(accessToken, dispatch, userData.selfIntro).then((res) => {
      if (!res.isSuccess) {
        alert(res.message);
      }
    });
    handleMode(tag);
    // API 추가
  };
  // 추가사항 , 나의 장점
  const modifyTag = (tag) => {
    if (tag === "extra") {
      modifyExtraInfoAPI(accessToken, dispatch, extraData).then((res) => {
        if (!res.isSuccess) {
          alert(res.message);
        }
      });
    } else if (tag === "merit") {
      modifyStrengthInfoAPI(accessToken, dispatch, strengthData).then((res) => {
        if (!res.isSuccess) {
          alert(res.message);
        }
      });
    }
    handleMode(tag);
  };

  /**----- 초기 데이터 세팅 ----- */
  // 받아온 데이터 중 태그(추가정보, 나의 장점만 별도 추출)
  function separateTags(data) {
    const extra = {};
    const strength = {};

    const extra_keys = Object.keys(MYPAGE_EXTRA_INFO_TAG);
    const strength_keys = Object.keys(MYPAGE_MERIT_TAG);

    Object.keys(data).forEach((key) => {
      if (extra_keys.includes(key)) {
        extra[key] = data[key];
      } else if (strength_keys.includes(key)) {
        strength[key] = data[key];
      }
    });

    return { extra, strength };
  }
  // 수정할 기본 정보 받아오기
  useEffect(() => {
    basicProfileInfoAPI(accessToken, dispatch).then((res) => {
      if (res.isSuccess) {
        setUserData(res.data);
        if (userType === "EMPLOYEE") {
          const { extra, strength } = separateTags(res.data);
          setExtraData(extra);
          setStrengthData(strength);
        }
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
            navigate("/mypage");
          }}
        />
        <span>
          {userType === "EMPLOYEE" ? "내 지원서 관리" : "내 정보 관리"}
        </span>
      </HeaderContainer>
      <BodyContainer>
        <DefaultInfo>
          <div className="profileImgBox">
            {userData?.profileImageUrl !== null && (
              <img src={userData?.profileImageUrl} />
            )}
          </div>
          <div className="profileInfoBox">
            <div>
              {userType === "EMPLOYEE"
                ? userData?.employeeName
                : userData?.ceoName}
            </div>
            <div>
              {userData?.gender === "MALE" ? "남성" : "여성"} ·{" "}
              {userData?.birthYear ? `${userData.birthYear} · ` : ""}
              {userType === "EMPLOYEE"
                ? userData?.employeeAddress
                : userData?.ceoAddress}
            </div>
            <div>
              {userType === "EMPLOYEE"
                ? userData?.phoneNumber
                : userData?.ceoPhoneNumber}
            </div>
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
        {userType === "EMPLOYEE" && (
          <CoverLetter>
            {/*<Section>
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
            </Section>*/}
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
                    value={userData?.selfIntro}
                    onChange={(e) => {
                      setUserData((pre) => ({
                        ...pre,
                        selfIntro: e.target.value,
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
                <div className="self">{userData?.selfIntro}</div>
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
                {Object.keys(extraData).map((tag) => (
                  <Tag
                    key={tag}
                    color={extraData[tag] ? "#E3F2FD" : "transparent"}
                    textcolor={extraData[tag] ? "#2196F3" : "gray"}
                    onClick={
                      isModifyMode.extra
                        ? () => handleTag("extra", tag)
                        : undefined
                    }
                  >
                    {MYPAGE_EXTRA_INFO_TAG[`${tag}`]}
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
                {Object.keys(strengthData).map((tag) => (
                  <Tag
                    key={tag}
                    color={strengthData[tag] ? "#E3F2FD" : "transparent"}
                    textcolor={strengthData[tag] ? "#2196F3" : "gray"}
                    onClick={
                      isModifyMode.merit
                        ? () => handleTag("merit", tag)
                        : undefined
                    }
                  >
                    {MYPAGE_MERIT_TAG[`${tag}`]}
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
