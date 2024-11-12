import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../../styles/mypage/MyPage.styles";
import styled from "styled-components";
import Applicant from "../../../components/mypage/Applicant";
import getAccessToken from "../../../utils/getAccessToken";
import { useDispatch } from "react-redux";
import { applicantListAPI } from "../../../api";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { state } = useLocation();
  const { postId } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    applicantListAPI(accessToken, dispatch, postId).then((res) => {
      if (res.isSuccess) {
        setData(res.data);
        console.log(res);
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
        <span>지원자 목록 보기</span>
      </HeaderContainer>
      <BodyContainer>
        <RecruitPost onClick={() => navigate(`/post/detail/${postId}`)}>
          {/**클릭 해당 공고로 이동 */}
          {state.content.imgUrl !== undefined && (
            <div className="post-img">
              <img src={state.content.img} />
            </div>
          )}
          <div>
            <div className="title">{state.content.title}</div>
            <div className="location">{state.content.detailAreaName}</div>
          </div>
        </RecruitPost>
        {data?.map((data) => {
          return <Applicant key={data.userId} data={data} />;
        })}
      </BodyContainer>
    </Container>
  );
}

export default ApplicantList;
