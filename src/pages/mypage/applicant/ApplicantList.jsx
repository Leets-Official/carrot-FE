import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../../styles/mypage/MyPage.styles";
import styled from "styled-components";
import Applicant from "../../../components/mypage/Applicant";

/**지원자리스트 dummy data */
const DATA = [
  { id: 1, img: null, name: "졸려", location: "능곡동", status: "APPLY" },
  {
    id: 2,
    img: "https://i.pinimg.com/236x/94/6d/19/946d191e97c6745825bddad72cccb92d.jpg",
    name: "졸려2",
    location: "장현동",
    status: "COMPLETE",
  },
];

const RecruitPost = styled.div`
  width: 90%;
  display: flex;
  gap: 10px;
  .post-img {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .title {
    font-weight: 700;
  }
  .location {
    font-size: 14px;
    color: gray;
  }
`;

function ApplicantList() {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderContainer>
        <IconChevronLeft
          size={30}
          onClick={() => {
            navigate("/mypage");
          }}
        />
        <span>지원자 목록 보기</span>
      </HeaderContainer>
      <BodyContainer>
        <RecruitPost>
          {/**클릭 해당 공고로 이동 */}
          {state.content.img !== null && (
            <div className="post-img">
              <img src={state.content.img} />
            </div>
          )}
          <div>
            <div className="title">{state.content.title}</div>
            <div className="location">{state.content.location}</div>
          </div>
        </RecruitPost>
        {DATA.map((data) => {
          return <Applicant key={data.id} data={data} />;
        })}
      </BodyContainer>
    </Container>
  );
}

export default ApplicantList;
