import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme/theme";
import { deletePostAPI } from "../api";
import getAccessToken from "../utils/getAccessToken";
import { useDispatch } from "react-redux";

const Modal = styled.div`
  display: ${(props) => !props.$display && "none"};
  z-index: 5;
  position: absolute;
  top: 60px;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #fafafa;
  box-shadow: 0 0.4rem 0.9rem 0 rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const ContentText = styled.button`
  font-size: 18px;
  font-weight: 400;
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  width: 100%;
  padding: 5px 0;
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.lightgray};
  }
`;

const ButtonsModal = ({ isMode, setIsMode, postId }) => {
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  //게시글 수정
  const modifyPosts = () => {
    if (confirm("해당 게시글을 수정하시겠습니까?")) {
      navigate("/posting", {
        state: {
          postId: postId,
          mode: "modify", // 수정 모드 전달
        },
      });
    }
  };  
  // 게시글 삭제
  const deletePosts = () => {
    setIsMode((pre) => !pre);
    const result = confirm("해당 게시글을 삭제하시겠습니까?");

    if (result) {
      deletePostAPI(accessToken, dispatch, postId).then((res) => {
        if (res.isSuccess) {
          alert("해당 구인글이 삭제되었습니다.");
          navigate("/home", { replace: true });
        } else {
          alert(res.message);
        }
      });
    }
  };

  return (
    <>
      <Modal $display={isMode}>
        <Content>
          <ContentText onClick={modifyPosts}>수정</ContentText>
          <ContentText onClick={deletePosts}>삭제</ContentText>
        </Content>
      </Modal>
    </>
  );
};

export { ButtonsModal };
