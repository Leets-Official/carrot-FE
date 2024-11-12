import { useState, useEffect } from "react";
import styled from "styled-components";
import RecruitContent from "../../../components/mypage/RecruitContent";
import { writtenPostListAPI } from "../../../api";
import getAccessToken from "./../../../utils/getAccessToken";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function RecruitList() {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const userId = useSelector((state) => state.userInfo.userId);
  const [data, setData] = useState(null);

  useEffect(() => {
    writtenPostListAPI(accessToken, dispatch, userId).then((res) => {
      if (res.isSuccess) {
        setData(res.data);
      } else {
        alert(res.message);
      }
    });
  }, []);
  return (
    <Container>
      {data?.map((data) => (
        <RecruitContent key={data.postId} content={data} />
      ))}
    </Container>
  );
}

export default RecruitList;
