import styled from "styled-components";

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

export { ApplyForm, FormContent, BtnContent, Content };
