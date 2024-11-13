import React, { useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import styled from "styled-components";
import theme from "../../styles/theme/theme";
import Button from "../Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import getAccessToken from "./../../utils/getAccessToken";
import { hireApplicantAPI } from "../../api";

const RecruitForm = styled.div`
  width: 90%;
  padding: 20px 0;

  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${theme.color.lightgray};
  gap: 10px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  .content {
    display: flex;
    flex-direction: column;
  }
  .img-content {
    width: 50px;
    height: 50px;
    background-color: lightgray;
    border-radius: 50%;
    margin-right: 10px;
  }
  .img-content.exist {
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .content-name {
    font-weight: 700;
    text-overflow: ellipsis;
  }
  .content-location {
    font-size: 14px;
    color: gray;
    text-overflow: ellipsis;
  }
  svg {
    margin-left: auto;
  }
  .done-tag {
    text-align: center;
    width: 100%;
    padding: 3% 0;
    border-radius: 10px;
    background: #d1d1d1;
    color: #2e2e2e;
  }
`;

function Applicant({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const { postId } = useParams();
  const [status, setStatus] = useState(data.isRecruited);

  // 채용하기
  const hireApplicant = () => {
    const result = confirm("해당 지원자를 채용하시겠습니까?");
    if (result) {
      hireApplicantAPI(accessToken, dispatch, postId, data.userId).then(
        (res) => {
          if (res.isSuccess) {
            alert("채용하였습니다.");
            setStatus(true);
          } else {
            alert(res.message);
          }
        }
      );
    } else {
      alert("취소되었습니다.");
    }
  };

  return (
    <RecruitForm>
      <Content>
        <div
          className={
            data.img !== null
              ? "content img-content exist"
              : "content img-content none"
          }
        >
          {data.img !== null && <img src={data.img} />}
        </div>
        <div className="content">
          <div className="content-name">{data.userNickname}</div>
          <div className="content-location">{data.detailAreaName}</div>
        </div>
        <IconChevronRight
          onClick={() => navigate(`/mypage/applicant/${postId}/${data.id}`)}
        />
      </Content>
      <Content>
        {!status ? (
          <>
            <Button color={theme.color.carrot} textcolor="white">
              응답하기
            </Button>
            <Button
              color={theme.color.carrot}
              textcolor="white"
              onClick={hireApplicant}
            >
              채용하기
            </Button>
          </>
        ) : (
          <div className="done-tag">채용 완료</div>
        )}
      </Content>
    </RecruitForm>
  );
}

export default Applicant;
