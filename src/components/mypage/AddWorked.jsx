import React, { useState } from "react";
import {
  Container,
  HeaderContainer,
  BodyContainer,
} from "../../styles/MyPage.styles";
import { IconX } from "@tabler/icons-react";
import Input from "../Input";
import Button from "../Button";
import styled from "styled-components";
import theme from "../../styles/theme/theme";
import { MYPAGE_WORKED_TIME } from "../../constants";
import TextArea from "../TextArea";
import WorkedSelect from "./WorkedSelect";

const AbContainer = styled(Container)`
  position: absolute;
  height: 810px;
  background-color: white;
`;

const AddButton = styled(Button)`
  margin-top: auto;
`;

function AddWorked({ onClose, onAdd }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, index) => currentYear - index);
  const [workedData, setWorkedData] = useState({
    title: "",
    script: "",
    year: currentYear,
    time: "3개월 이하",
  });
  const [visible, setVisible] = useState({
    year: false,
    time: false,
  });

  const addWorked = () => {
    // workedData empty value 값 체크
    const isEmpty = Object.values(workedData).some((value) =>
      typeof value === "string" ? value.trim() === "" : false
    );

    if (isEmpty) {
      alert("모든 사항을 입력해주세요.");
      return;
    }

    // 경력사항 추가 API
    onAdd(workedData);
    onClose();
  };

  return (
    <AbContainer>
      <HeaderContainer>
        <IconX size={30} onClick={onClose} />
        <span>경력사항 추가</span>
      </HeaderContainer>
      <BodyContainer>
        <Input
          label="일한 곳"
          value={workedData.title}
          placeholder="예) 당근가게 역삼점"
          border={theme.color.lightgray}
          onChange={(e) =>
            setWorkedData((pre) => ({ ...pre, title: e.target.value }))
          }
        />
        <TextArea
          label="했던 일"
          value={workedData.script}
          onChange={(e) =>
            setWorkedData((pre) => ({ ...pre, script: e.target.value }))
          }
        />

        {/* 일한 연도 선택 */}
        <WorkedSelect
          label="일한 연도"
          options={years}
          selectedValue={workedData.year}
          onSelect={(year) => setWorkedData((pre) => ({ ...pre, year }))}
          visible={visible.year}
          setVisible={(isVisible) =>
            setVisible((prev) => ({ ...prev, year: isVisible }))
          }
        />

        {/* 일한 기간 선택 */}
        <WorkedSelect
          label="일한 기간"
          options={MYPAGE_WORKED_TIME}
          selectedValue={workedData.time}
          onSelect={(time) => setWorkedData((pre) => ({ ...pre, time }))}
          visible={visible.time}
          setVisible={(isVisible) =>
            setVisible((prev) => ({ ...prev, time: isVisible }))
          }
        />
      </BodyContainer>
      <AddButton
        color={theme.color.carrot}
        textcolor="white"
        onClick={addWorked}
      >
        추가하기
      </AddButton>
    </AbContainer>
  );
}

export default AddWorked;
