import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../styles/Home.styles";
import { IconChevronLeft } from "@tabler/icons-react";
import styled from "styled-components";
import Input from "../../components/Input";
import theme from "../../styles/theme/theme";

const SearchHeaderContainer = styled(HeaderContainer)`
  flex-direction: row;
  align-items: center;
`;

function SearchHome() {
  const navigate = useNavigate();
  const [searchKeyWord, setSearchKeyWord] = useState("");

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyWord(keyword);
  };

  // 엔터 키를 눌렀을 때 검색 처리하는 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("검색어:", searchKeyWord);
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
      </BodyContainer>
    </Container>
  );
}

export default SearchHome;
