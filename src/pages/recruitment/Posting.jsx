import React, { useState } from "react";
import styled from "styled-components";
import InputField from "../../components/InputField";
import Tag from "../../components/Tag";
import Toggle from "../../components/Toggle";
import Calendar from "../../components/Calendar";
import Button from "../../components/Button";
import upmuTags from "../../constants/upmuTag";
import eutTags from "../../constants/eutTag";
import WorkTimePicker from "../../components/WorkTimepicker";
import WeekdayPicker from "../../components/WeekdayPicker";
import "../../styles/Posting.css";

const PageContainer = styled.div`
  width: 440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

// 스크롤 가능한 부분
const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 70px;
`;

// 다음 버튼 하단에 고정
const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 440px;
  background-color: #fff;
  border-top: 1px solid #cccccc;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

function Posting() {
  const [selectedOption, setSelectedOption] = useState("업무 목적");
  const [periodOption, setPeriodOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setPeriodOption(null); 
  };

  const handlePeriodChange = (option) => {
    setPeriodOption(option);
  };

  return (
    <PageContainer>
      <ContentContainer>
        <div className="header">어떤 목적으로 알바를 구하시나요?</div>

        <div className="toggle-section">
          <Toggle
            options={["업무 목적", "이웃 알바"]}
            onChange={handleOptionChange}
            selectedOption={selectedOption}
            styleType="card"
          />
        </div>

        <div className="form-section">
          <InputField
            label="제목"
            placeholder="공고 내용을 요약해주세요."
            textColor="#333"
            border="#cccccc"
            size="15px"
          />
        </div>

        {selectedOption === "업무 목적" ? (
          <>
            <div className="form-section">
              <Tag label="하는 일" tags={upmuTags} maxSelectable={3} />
            </div>

            <div className="form-section">
              <Toggle
                label="일하는 기간"
                options={["단기", "1개월 이상"]}
                onChange={handlePeriodChange}
                selectedOption={periodOption}
                styleType="tag"
              />
            </div>

            {periodOption === "단기" && (
              <>
                <div className="form-section">
                  <Calendar label="일하는 날짜" />
                </div>
                <div className="form-section">
                  <WorkTimePicker label="일하는 시간" />
                </div>
                <div className="form-section">
                  <Tag
                    label="급여"
                    tags={["시급", "일급", "주급", "월급"]}
                    maxSelectable={1}
                  />
                </div>
                <div className="form-section">
                  <InputField label="사진 업로드" placeholder="사진 최대 10장" />
                </div>
                <div className="form-section">
                  <InputField
                    label="자세한 설명"
                    placeholder="최대 2000자까지 작성 가능합니다."
                  />
                </div>
                <div className="form-section">
                  <InputField label="업체 정보" placeholder="업체 정보를 입력하세요" />
                </div>
              </>
            )}

            {periodOption === "1개월 이상" && (
              <>
                <div className="form-section">
                  <WeekdayPicker label="요일 선택" />
                </div>
                <div className="form-section">
                  <WorkTimePicker label="일하는 시간" />
                </div>
                <div className="form-section">
                  <Tag
                    label="급여"
                    tags={["시급", "일급", "주급", "월급"]}
                    maxSelectable={1}
                  />
                </div>
                <div className="form-section">
                  <InputField label="사진 업로드" placeholder="사진 최대 10장" />
                </div>
                <div className="form-section">
                  <InputField
                    label="자세한 설명"
                    placeholder="최대 2000자까지 작성 가능합니다."
                  />
                </div>
                <div className="form-section">
                  <InputField label="업체 정보" placeholder="업체 정보를 입력하세요" />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="form-section">
              <Tag label="하는 일" tags={eutTags} maxSelectable={3} />
            </div>
            <div className="form-section">
              <Calendar label="일하는 날짜" />
            </div>
            <div className="form-section">
              <InputField
                label="일하는 시간"
                placeholder="30분 단위로 선택하세요"
              />
            </div>
            <div className="form-section">
              <Tag
                label="급여"
                tags={["시급", "일급", "주급", "월급"]}
                maxSelectable={1}
              />
            </div>
            <div className="form-section">
              <InputField
                label="자세한 설명"
                placeholder="최대 2000자까지 작성 가능합니다."
              />
            </div>
            <div className="form-section">
              <InputField label="일하는 장소" placeholder="장소를 입력하세요" />
            </div>
            <div className="form-section">
              <InputField label="사진 업로드" placeholder="사진 최대 10장" />
            </div>
          </>
        )}
      </ContentContainer>

      <FixedButtonContainer>
        <Button
          color="#ff8a3d"
          textColor="#ffffff"
          size="18px"
          onClick={() => alert("제출되었습니다!")}
        >
          다음
        </Button>
      </FixedButtonContainer>
    </PageContainer>
  );
}

export default Posting;
