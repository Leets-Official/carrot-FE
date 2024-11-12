import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme/theme";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

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
    gap: 10px;
  }
  .img-content.exist {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .content-title {
    font-weight: 700;
    text-overflow: ellipsis;
  }
  .content-location {
    font-size: 14px;
    color: gray;
    text-overflow: ellipsis;
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

function RecruitContent({ content }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(content.isRecruiting);

  const viewingApplicants = () => {
    navigate(`/mypage/applicant/${content.id}`, {
      state: { content: content, id: content.id },
    });
  };

  const closeRecruit = () => {
    const result = confirm("해당 공고의 채용을 마감하시겠습니까?");
    if (result) {
      /*모집 마감 api*/
      alert("모집이 마감되었습니다");
      setStatus(false);
    } else {
      alert("취소되었습니다.");
    }
  };

  return (
    <RecruitForm>
      <Content>
        <div
          className={
            content?.imgUrl !== ""
              ? "content img-content exist"
              : "content img-content"
          }
        >
          {content?.imgUrl !== "" && <img src={content?.imgUrl} />}
        </div>
        <div className="content">
          <div className="content-title">{content?.title}</div>
          <div className="content-location">{content?.detailAreaName}</div>
        </div>
      </Content>
      <Content>
        {content?.isRecruiting ? (
          <>
            <Button
              color={theme.color.carrot}
              textcolor="white"
              onClick={viewingApplicants}
            >
              지원자 목록보기
            </Button>
            <Button onClick={closeRecruit}>모집 마감하기</Button>
          </>
        ) : (
          <div className="done-tag">모집 완료</div>
        )}
      </Content>
    </RecruitForm>
  );
}

export default RecruitContent;
