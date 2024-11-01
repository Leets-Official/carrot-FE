import {
  ApplyForm,
  FormContent,
  Content,
  BtnContent,
} from "../../styles/mypage/Apply.styles";
import Button from "../Button";
import { MYPAGE_APPLY_TAG } from "../../constants";

function ApplyContent({ content, onClick, onCancle }) {
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
        <Button onClick={onClick}>구인글 보기</Button>
        {/**추후, 채팅하기로 바뀔 가능성O */}
      </BtnContent>
    </ApplyForm>
  );
}

export default ApplyContent;
