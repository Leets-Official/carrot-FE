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

function ApplyList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const userId = useSelector((state) => state.userInfo.userId);

  const [currentTag, setCurrentTag] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [allData, setAllData] = useState([]); // 원본 데이터

  // 태그에 맞는 공고만 보기 체크
  const handleClickTag = (index) => {
    setCurrentTag(index);
    filterData(index, isChecked); // 필터링 적용
  };

  // 구인중인 공고만 보기 체크
  const handleRecruitingToggle = () => {
    setIsChecked(!isChecked);
    filterData(currentTag, !isChecked); // 필터링 적용
  };

  // 데이터 필터링 함수
  const filterData = (tagIndex, recruitingOnly) => {
    if (allData.length === 0) return; // 초기 데이터를 가져오지 않으면 필터링 안함

    const arr = allData.filter((data) => {
      let matchesTag = false;

      // 태그가 "전체"일 경우
      if (tagIndex === 0) {
        matchesTag = true;
      }
      // 태그가 "지원완료"일 경우
      else if (tagIndex === 1) {
        matchesTag =
          data.isAccepted === false && data.isApplicationClosed === false;
      }
      // 태그가 "채용O 완료"일 경우
      else if (tagIndex === 2) {
        matchesTag = data.isAccepted === true;
      }
      // 태그가 "다음에(마감+채용X)"일 경우
      else if (tagIndex === 3) {
        matchesTag =
          data.isAccepted === false && data.isApplicationClosed === true;
      }

      // 구인중 필터링 (isChecked가 true일 경우 구인중인 데이터만 필터링)
      const matchesRecruiting = recruitingOnly
        ? data.isApplicationClosed === false
        : true;

      return matchesTag && matchesRecruiting;
    });

    setFilteredData(arr);
  };

  useEffect(() => {
    appliedPostListAPI(accessToken, dispatch, userId).then((res) => {
      if (res.isSuccess) {
        setAllData(res.data); // 원본 데이터를 저장
        setFilteredData(res.data); // 초기 로딩 시 필터링된 데이터는 원본 그대로
      } else {
        alert(res.message);
      }
    });
  }, [accessToken, dispatch, userId]);

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
