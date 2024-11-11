import { useState, useEffect } from "react";
import styled from "styled-components";
import RecruitContent from "../../../components/mypage/RecruitContent";
import { writtenPostListAPI } from "../../../api";
import getAccessToken from "./../../../utils/getAccessToken";
import { useSelector, useDispatch } from "react-redux";

/**DUMMY DATA (삭제 예정) */
const DATA = [
  {
    id: 12,
    status: "UNDONE",
    title: "한국공학대전 무대, 조명, 전시부스 철거",
    company: "아트플랜",
    location: "장곡동",
    img: "https://m.milkstore.co.kr/web/product/big/20200409/89e9f8075a947905d75020d602d1c92f.jpg",
  },
  {
    id: 11,
    status: "DONE",
    title: "문화예술회관 하우스 어셔",
    company: "하우스",
    location: "산본동",
    img: null,
  },
];

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RecruitList() {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const userId = useSelector((state) => state.userInfo.userId);
  const [data, setData] = useState(null);

  useEffect(() => {
    writtenPostListAPI(accessToken, dispatch, userId).then((res) => {
      if (res.isSuccess) {
        setData(res.data);
      } else {
        alert(res.message + "여기");
      }
    });
  }, []);
  return (
    <Container>
      {data?.map((data) => (
        <RecruitContent key={data.postId} content={data} />
      ))}
    </Container>
  );
}

export default RecruitList;
