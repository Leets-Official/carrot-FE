import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import theme from "../styles/theme/theme";

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
  const navigate = useNavigate();
  // 게시글 삭제
  const deletePosts = () => {
    setIsMode((pre) => !pre);
    const result = confirm("해당 게시글을 삭제하시겠습니까?");

    if (result) {
      // 삭제 API - > 삭제 후, home페이지로 이동
    }
  };

  return (
    <>
      <Modal $display={isMode}>
        <Content>
          <ContentText>수정</ContentText>
          <ContentText onClick={deletePosts}>삭제</ContentText>
        </Content>
      </Modal>
    </>
  );
};

export { ButtonsModal };
