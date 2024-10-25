import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InterestContent from "../../components/mypage/InterestContent";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**DUMMY DATA (삭제 예정) */
const DATA = [
  {
    id: 12,
    status: "UNDONE",
    title: "한국공학대전 무대, 조명, 전시부스 철거",
    company: "아트플랜",
    location: "장곡동",
    img: "https://m.milkstore.co.kr/web/product/big/20200409/89e9f8075a947905d75020d602d1c92f.jpg",
    pay: ["시급", "10000"],
    date: { day: "월", time: "09:00~21:00" },
    review: 3,
    isLiked: true,
  },
  {
    id: 11,
    status: "DONE",
    title: "문화예술회관 하우스 어셔",
    company: "하우스",
    location: "산본동",
    img: null,
    pay: ["시급", "10000"],
    date: { day: "월", time: "09:00~21:00" },
    review: 3,
    isLiked: true,
  },
];

function InterestList() {
  const navigate = useNavigate();

  return (
    <Container>
      {DATA.map((data) => (
        <InterestContent
          key={data.id}
          content={data}
          onClick={() => {
            navigate("/post", { state: data.id });
          }}
        />
      ))}
    </Container>
  );
}

export default InterestList;
