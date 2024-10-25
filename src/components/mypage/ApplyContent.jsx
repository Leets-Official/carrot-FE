import styled from "styled-components";
import Button from "../Button";
import { MYPAGE_APPLY_TAG } from "../../constants";

const ApplyForm = styled.div`
  width: 90%;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const BtnContent = styled.div`
  display: flex;
  gap: 10px;
  > button {
    flex: 1;
  }
`;
const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;

  font-size: 14px;
  text-overflow: ellipsis;

  .apply-status {
    font-weight: 700;
  }
  .apply-img-box {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 10px;
    &.hidden {
      display: none;
    }
    > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .apply-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .apply-content-company {
    font-size: 12px;
    color: gray;
  }
`;

function ApplyContent({ content, onClick, onCancle }) {
  const applyStatus = MYPAGE_APPLY_TAG.filter((tag) => content.tag == tag[0]);
  const cancleApply = () => {
    /**(수정)지원취소 API */
    onCancle(content.id);
    alert("지원을 취소하였습니다.");
  };
  return (
    <ApplyForm>
      <FormContent>
        <Content>
          <div className="apply-status">{applyStatus[0][1]}</div>
        </Content>
        <Content>
          <div
            className={
              content.img != null ? "apply-img-box" : "apply-img-box hidden"
            }
          >
            {content.img != null ? (
              <img src="https://cafe24.poxo.com/ec01/rainbowtree81/UVTjSep0dwP4/wX7AtHyXO6bEUL260IgzZWiHzbvHSCwWpbQLz54pYhGkVPg29PUXQnuw2Jhlv5+bbb00it4TQ==/_/web/product/big/rainbowtree81_1547.jpg" />
            ) : null}
          </div>
          <div className="apply-content">
            <div className="apply-content-title">{content.title}</div>
            <div className="apply-content-company">{content.company}</div>
          </div>
        </Content>
      </FormContent>
      <BtnContent>
        {content.tag == "APPLY" && (
          <Button onClick={cancleApply}>지원 취소</Button>
        )}{" "}
        {/**지원 중인 상태에서만 지원취소 버튼 보이기 */}
        <Button onClick={onClick}>구인글 보기</Button>
        {/**추후, 채팅하기로 바뀔 가능성O */}
      </BtnContent>
    </ApplyForm>
  );
}

export default ApplyContent;
