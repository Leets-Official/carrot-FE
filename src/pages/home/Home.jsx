import { useState } from "react";
import {
  IconUserCircle,
  IconPencilPlus,
  IconSearch,
} from "@tabler/icons-react";
import {
  Container,
  HeaderContainer,
  HeaderMenuContainer,
  BodyContainer,
} from "../../styles/Home.styles";
import PostCard from "../../components/home/PostCard";
import { useNavigate } from "react-router-dom";

const data = [
  {
    postId: 1,
    title: "GS25 오전알바 구함",
    storeName: "가천관",
    location: "태평동",
    payType: "주급",
    pay: 12000,
    postStatus: "recruiting",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4dSWank4KGUIYGGHOc1EMW3fV0slW13l4Tw&s",
    jobTags: ["편의점", "청소"], // 추가된 필드
  },
  {
    postId: 3,
    title: "GS25 오후알바 구함",
    storeName: "가천관",
    location: "태평동",
    payType: "주급",
    pay: 12000,
    postStatus: "recruiting",
    imageUrl:
      "https://blog.kakaocdn.net/dn/DHrrZ/btsHaddtONh/K80ioqQM9oo97C5vGD3sbk/img.png",
    jobTags: ["편의점", "청소"], // 추가된 필드
  },
  {
    postId: 7,
    title: "버섯농장",
    storeName: "농장",
    location: "태평동",
    payType: "주급",
    pay: 12000,
    postStatus: "done",
    imageUrl:
      "https://tvstore-phinf.pstatic.net/20210907_263/1631002069199vDKNA_JPEG/00033.jpg",
    jobTags: ["수확"], // 추가된 필드
  },
  {
    postId: 4,
    title: "하우스어셔",
    storeName: "가천관",
    location: "태평동",
    payType: "주급",
    pay: 12000,
    postStatus: "recruiting",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1688763174714245120/htmgYD32_400x400.jpg",
    jobTags: ["고객관리", "청소"], // 추가된 필드
  },
  {
    postId: 5,
    title: "엽기떡볶이",
    storeName: "가천관",
    location: "태평동",
    payType: "주급",
    pay: 12000,
    postStatus: "recruiting",
    imageUrl:
      "https://tvstore-phinf.pstatic.net/20211015_175/1634272769529b4C9q_JPEG/00031.jpg",
    jobTags: ["요리", "서빙"], // 추가된 필드
  },
];

function Home() {
  const userType = "CEO";
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderContainer>
        <HeaderMenuContainer>
          <span>당근알바</span>
          <div className="header-icons">
            <IconUserCircle onClick={() => navigate("/mypage")} />
            {userType === "CEO" && (
              <IconPencilPlus onClick={() => navigate("/posting")} />
            )}
          </div>
        </HeaderMenuContainer>
        <div className="search-bar" onClick={() => navigate("/home/search")}>
          <IconSearch color="grey" size={20} />
          <span>주변 알바 검색</span>
        </div>
      </HeaderContainer>
      <BodyContainer>
        {data.map((data) => {
          return (
            <PostCard
              key={data.postId}
              data={data}
              onClick={() => navigate(`/post/detail/${data.postId}`)}
            />
          );
        })}
      </BodyContainer>
    </Container>
  );
}

export default Home;
