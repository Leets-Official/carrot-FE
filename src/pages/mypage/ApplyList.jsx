import { useEffect, useState } from "react";
import { IconCircle, IconCircleCheckFilled } from "@tabler/icons-react";
import styled from "styled-components";
import theme from "../../styles/theme/theme";
import ApplyContent from "../../components/mypage/ApplyContent";
import { useNavigate } from "react-router-dom";
import { MYPAGE_APPLY_TAG } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import getAccessToken from "./../../utils/getAccessToken";
import { appliedPostListAPI } from "../../api/mypageAPI";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Tag = styled.button`
  outline: none;
  border: 1px solid ${theme.color.lightgray};
  border-radius: 20px;
  padding: 10px 15px;
  background-color: white;
  color: black;
  font-family: "NanumSquareNeo";

  &.active {
    border: 1px solid black;
    background-color: black;
    color: white;
  }
`;

/**DUMMY DATA (삭제 예정) */
const DATA = [
  {
    id: 12,
    status: "UNDONE",
    tag: "APPLY",
    title: "한국공학대전 무대, 조명, 전시부스 철거",
    company: "아트플랜",
    img: "https://cafe24.poxo.com/ec01/rainbowtree81/UVTjSep0dwP4/wX7AtHyXO6bEUL260IgzZWiHzbvHSCwWpbQLz54pYhGkVPg29PUXQnuw2Jhlv5+bbb00it4TQ==/_/web/product/big/rainbowtree81_1547.jpg",
  },
  {
    id: 11,
    status: "DONE",
    tag: "SUCCESS",
    title: "문화예술회관 하우스 어셔",
    company: "하우스",
    img: null,
  },
];

function ApplyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const userId = useSelector((state) => state.userInfo.userId);

  const [currentTag, setCurrentTag] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [filteredData, setFilteredData] = useState(DATA);

  const handleClickTag = (index) => {
    setCurrentTag(index);
    filterData(index, isChecked);
  };

  const handleRecruitingToggle = () => {
    setIsChecked(!isChecked);
    filterData(currentTag, !isChecked);
  };

  // 데이터 필터링 함수
  const filterData = (tagIndex, recruitingOnly) => {
    const arr = DATA.filter((data) => {
      let matchesTag = false;

      // 태그가 "전체"일 경우
      if (tagIndex === 0) {
        matchesTag = true;
      }
      // 태그가 "지원완료"일 경우
      else if (tagIndex === 1) {
        matchesTag =
          data.isAccepted === true && data.isApplicationClosed === false;
      }
      // 태그가 "채용O 완료"일 경우
      else if (tagIndex === 2) {
        matchesTag =
          data.isAccepted === true && data.isApplicationClosed === true;
      }
      // 태그가 "다음에(마감+채용X)"일 경우
      else if (tagIndex === 3) {
        matchesTag =
          data.isAccepted === false && data.isApplicationClosed === true;
      }

      // 구인중 필터링 (isChecked가 true일 경우 구인중인 데이터만 필터링)
      const matchesRecruiting = recruitingOnly
        ? data.isApplicationClosed === true
        : true;

      return matchesTag && matchesRecruiting;
    });
    setFilteredData(arr);
  };

  useEffect(() => {
    appliedPostListAPI(accessToken, dispatch).then((res) => {
      if (res.isSuccess) {
        setFilteredData(res.data);
      } else {
        alert(res.message);
      }
    });
  }, []);

  return (
    <Container>
      <TagContainer>
        {MYPAGE_APPLY_TAG.map((tag, index) => (
          <Tag
            className={index === currentTag ? "active" : ""}
            key={index}
            onClick={() => handleClickTag(index)}
          >
            {tag[1]}
          </Tag>
        ))}
      </TagContainer>
      <TagContainer>
        {!isChecked ? (
          <IconCircle
            size={28}
            color={theme.color.lightgray}
            onClick={handleRecruitingToggle}
          />
        ) : (
          <IconCircleCheckFilled
            size={28}
            color={theme.color.carrot}
            onClick={handleRecruitingToggle}
          />
        )}
        <div style={{ fontSize: "14px" }}>구인중인 공고만 보기</div>
      </TagContainer>
      {filteredData?.map((data) => (
        <ApplyContent
          key={data.postId}
          content={data}
          onClick={() => navigate(`/post/detail/${data.postId}`)}
        />
      ))}
    </Container>
  );
}

export default ApplyList;
