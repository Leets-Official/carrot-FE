import {
  ApplyForm,
  FormContent,
  Content,
  BtnContent,
} from "../../styles/mypage/Apply.styles";
import Button from "../Button";
import { MYPAGE_APPLY_TAG } from "../../constants";

function ApplyContent({ content, onClick }) {
  const viewStatus = () => {
    if (!content.isAccepted && !content.isApplicationClosed) {
      return MYPAGE_APPLY_TAG[1][1];
    } else if (content.isAccepted) {
      return MYPAGE_APPLY_TAG[2][1];
    } else {
      return MYPAGE_APPLY_TAG[3][1];
    }
  };

  return (
    <ApplyForm>
      <FormContent>
        <Content>
          <div className="apply-status">{viewStatus()}</div>
        </Content>
        <Content>
          <div
            className={
              content?.imgUrl !== null
                ? "apply-img-box"
                : "apply-img-box hidden"
            }
          >
            {content?.imgUrl != null ? <img src={content.imgUrl} /> : null}
          </div>
          <div className="apply-content">
            <div className="apply-content-title">{content.title}</div>
            <div className="apply-content-company">{content.storeName}</div>
          </div>
        </Content>
      </FormContent>
      <BtnContent>
        <Button onClick={onClick}>구인글 보기</Button>
        {/**추후, 채팅하기로 바뀔 가능성O */}
      </BtnContent>
    </ApplyForm>
  );
}

export default ApplyContent;
