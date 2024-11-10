import { useState, useEffect } from "react";
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
import theme from "../../styles/theme/theme";
import PostCard from "../../components/home/PostCard";
import { useNavigate } from "react-router-dom";
import { postListAPI } from "./../../api/homeAPI";
import getAccessToken from "./../../utils/getAccessToken";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";

const data = [
  [
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
    },
  ],
];

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = getAccessToken(); // 토큰 가져오기
  const userType = useSelector((state) => state.userInfo.userType); // 유저타입가져오기
  const [posts, setPosts] = useState([]); // 알바리스트 데이터
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postListAPI(accessToken, dispatch).then((res) => {
      if (res.isSuccess) {
        if (res.data == null) setPosts([]);
        else setPosts(res.data);
      }
    });
    setLoading(false);
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <HeaderMenuContainer>
          <span>당근알바</span>
          <div className="header-icons">
            <IconUserCircle onClick={() => navigate("/mypage")} />
            {userType === "CEO" && (
              <IconPencilPlus onClick={() => navigate("/post")} />
            )}
          </div>
        </HeaderMenuContainer>
        <div className="search-bar" onClick={() => navigate("/home/search")}>
          <IconSearch color="grey" size={20} />
          <span>주변 알바 검색</span>
        </div>
      </HeaderContainer>
      <BodyContainer>
        {loading ? (
          <BeatLoader
            color={theme.color.carrot}
            loading={loading}
            size={20}
            margin={10}
          />
        ) : posts.length === 0 ? (
          <div>구인 중인 알바 정보가 없습니다</div>
        ) : (
          posts.map((data) => (
            <PostCard
              key={data.postId}
              data={data}
              onClick={() => navigate(`/post/detail/${data.postId}`)}
            />
          ))
        )}
      </BodyContainer>
    </Container>
  );
}

export default Home;
