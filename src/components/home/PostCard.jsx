import styled from "styled-components";
import theme from "../../styles/theme/theme";

const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid ${theme.color.lightgray};
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 700;
  }
  .sub-title {
    color: grey;
    font-size: 14px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  color: grey;
  .content-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .pay {
      font-weight: 400;
    }
    .time {
      font-size: 14px;
    }
  }
  .img-box {
    margin-left: auto;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
/**
 * data : postId, title, storeName, location, payType, pay, postStatus, imgUrl
 */
function PostCard({ data, onClick }) {
  return (
    <CardBox onClick={onClick}>
      <Title>
        <div className="title">{data.title}</div>
        <div className="sub-title">
          {data.storeName}ㆍ{data.location}
        </div>
      </Title>
      <Content>
        <div className="content-box">
          <div className="pay">
            {data.payType} {data.pay}원
          </div>
          <div className="time">{/**추가 예정 */}</div>
        </div>
        <div className="img-box">
          {data.imageUrl !== "" && <img src={data.imageUrl} />}
        </div>
      </Content>
    </CardBox>
  );
}

export default PostCard;
