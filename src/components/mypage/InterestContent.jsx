import { useState } from "react";
import styled from "styled-components";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import theme from "../../styles/theme/theme";

const InterestForm = styled.div`
  width: 90%;
  padding: 20px 0;
  gap: 5px;

  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${theme.color.lightgray};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  .interest-title {
    font-weight: 800;
    margin-right: 5px;
  }
  .badge {
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #ececec;
    color: #313131;
  }
  .sub-text {
    color: gray;
    font-weight: 400;
    font-size: 14px;
  }
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-bottom: auto;
    margin-left: auto;
  }
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  margin-left: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function InterestContent({ content, onClick }) {
  const [isLiked, setIsLiked] = useState(content.isLiked);

  const handleLiked = () => {
    /*알바글 관심 상태 업데이트(누르기, 취소) API*/
    if (isLiked) {
      // 좋아요 취소
      setIsLiked(false);
    } else {
      // 좋아요 누르기
      setIsLiked(true);
    }
  };

  return (
    <InterestForm>
      <FlexBox>
        <Content onClick={onClick}>
          <div className="interest-title">{content.title}</div>
          <FlexBox>
            {content.status == "DONE" && (
              <div className="sub-text badge">마감</div>
            )}
            <div className="sub-text">
              {content.company} · {content.location}
            </div>
          </FlexBox>
        </Content>
        {isLiked ? (
          <IconHeartFilled color={theme.color.carrot} onClick={handleLiked} />
        ) : (
          <IconHeart color="gray" onClick={handleLiked} />
        )}
      </FlexBox>
      <FlexBox onClick={onClick}>
        <Content>
          <div className="sub-text">
            {content.pay[0]}
            {content.pay[1]}
          </div>
          <div className="sub-text">
            {content.date.day} | {content.date.time}
          </div>
          <div className="sub-text badge">후기 {content.review}</div>
        </Content>
        <ImgBox>{content.img != null && <img src={content.img} />}</ImgBox>
      </FlexBox>
    </InterestForm>
  );
}

export default InterestContent;
