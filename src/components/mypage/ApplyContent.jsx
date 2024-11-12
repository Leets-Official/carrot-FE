import {
  ApplyForm,
  FormContent,
  Content,
  BtnContent,
} from "../../styles/mypage/Apply.styles";
import Button from "../Button";
import { MYPAGE_APPLY_TAG } from "../../constants";

function ApplyContent({ content, onClick }) {
  const applyStatus = MYPAGE_APPLY_TAG.filter((tag) => content.tag == tag[0]);

  return (
    <ApplyForm>
      <FormContent>
        <Content>
          <div className="apply-status">{applyStatus[0][1]}</div>
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
