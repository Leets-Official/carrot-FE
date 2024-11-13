import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../styles/Home.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import styled from "styled-components";
import Input from "../../components/Input";
import PostCard from "../../components/home/PostCard";
import theme from "../../styles/theme/theme";
import { BeatLoader } from "react-spinners";
import getAccessToken from "./../../utils/getAccessToken";
import { searchPostListAPI } from "../../api";

const SearchHeaderContainer = styled(HeaderContainer)`
  flex-direction: row;
  align-items: center;
`;

function SearchHome() {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]); // 검색된 알바리스트
  const [searchKeyWord, setSearchKeyWord] = useState(""); // 검색 키워드
  const [loading, setLoading] = useState(false); // 데이터 불러오기 전 로딩 이미지

  // 검색 키워드 처리 함수
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyWord(keyword);
  };

  // 엔터 키를 눌렀을 때 검색 처리하는 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      searchPostListAPI(accessToken, dispatch, searchKeyWord).then((res) => {
        if (res.isSuccess) {
          setPosts(res.data);
        } else {
          alert(res.message);
        }
        setLoading(false);
      });
    }
  };

  return (
    <Container>
      <SearchHeaderContainer>
        <IconChevronLeft
          size={30}
          onClick={() => {
            navigate("/home");
          }}
        />
        <Input
          color={theme.color.lightgray}
          textcolor="grey"
          value={searchKeyWord}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        >
          검색하기
        </Input>
      </SearchHeaderContainer>
      <BodyContainer>
        {/**검색된 데이터를 PostCard를 통해 보여줌 */}
        {loading ? (
          <BeatLoader
            color={theme.color.carrot}
            loading={loading}
            size={20}
            margin={10}
          />
        ) : posts.length === 0 ? (
          <div>검색된 알바 정보가 없습니다</div>
        ) : (
          posts.map((data) => {
            return (
              <PostCard
                key={data.postId}
                data={data}
                onClick={() => navigate(`/post/detail/${data.postId}`)}
              />
            );
          })
        )}
      </BodyContainer>
    </Container>
  );
}

export default SearchHome;
