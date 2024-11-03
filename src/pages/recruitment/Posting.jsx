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
import PayPicker from "../../components/PayPicker";
import AddressInput from "../../components/AddressInput";
import PhotoUpload from "../../components/PhotoUpload";
import DescriptionInput from "../../components/DescriptionInput";
import PhoneInput from "../../components/PhoneInput";
import WorkDayPicker from "../../components/WorkDayPicker";
import WorkTimeChoice from "../../components/WorkTimeChoice";
import "../../styles/Posting.css";

const PageContainer = styled.div`
  width: 440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 70px;
`;

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

const Posting = () => {
  const [workLocation, setWorkLocation] = useState("");
  const [selectedOption, setSelectedOption] = useState("업무 목적");
  const [periodOption, setPeriodOption] = useState(null);

  const [upmuTagsSelected, setUpmuTagsSelected] = useState([]);
  const [eutTagsSelected, setEutTagsSelected] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setPeriodOption(null);

    // 다른 옵션 선택 시 선택된 태그 초기화
    if (option === "업무 목적") {
      setEutTagsSelected([]); // 이웃 알바 태그 초기화
    } else {
      setUpmuTagsSelected([]); // 업무 목적 태그 초기화
    }
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
            size="14px"
          />
        </div>

        {selectedOption === "업무 목적" ? (
          <>
            <div className="form-section">
              <Tag
                label="하는 일"
                tags={upmuTags}
                selectedTags={upmuTagsSelected}
                setSelectedTags={setUpmuTagsSelected}
                maxSelectable={3}
              />
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
                  <PayPicker label="급여" />
                </div>
                <div className="form-section">
                  <PhotoUpload label="사진" />
                </div>
                <div className="form-section">
                  <DescriptionInput label="자세한 설명" />
                </div>
                <div className="form-section">
                  <div className="header">업체 정보</div>
                  <InputField label="업체명" placeholder="예) 당근가게" />
                  <AddressInput
                    label="일하는 장소"
                    value={workLocation}
                    onChange={setWorkLocation}
                  />
                  <PhoneInput label="연락처" />
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
                  <PayPicker label="급여" />
                </div>
                <div className="form-section">
                  <PhotoUpload label="사진" />
                </div>
                <div className="form-section">
                  <DescriptionInput label="자세한 설명" />
                </div>
                <div className="form-section">
                  <div className="header">업체 정보</div>
                  <InputField label="업체명" placeholder="예) 당근가게" />
                  <AddressInput
                    label="일하는 장소"
                    value={workLocation}
                    onChange={setWorkLocation}
                  />
                  <PhoneInput label="연락처" />
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="form-section">
              <Tag
                label="하는 일"
                tags={eutTags}
                selectedTags={eutTagsSelected}
                setSelectedTags={setEutTagsSelected}
                maxSelectable={3}
              />
            </div>
            <div className="form-section">
              <WorkDayPicker label="일하는 날짜"/>
            </div>
            <div className="form-section">
              <WorkTimeChoice label="일하는 시간"/>
            </div>
            <div className="form-section">
              <PayPicker 
                label="급여" 
                options={["시급", "건당", "월급"]} 
              />
            </div>
            <div className="form-section">
              <DescriptionInput label="자세한 설명" />
            </div>
            <div className="form-section">
              <AddressInput
                label="일하는 장소"
                value={workLocation}
                onChange={setWorkLocation}
              />
            </div>
            <div className="form-section">
              <PhotoUpload label="사진" />
            </div>
          </>
        )}
      </ContentContainer>

      <FixedButtonContainer>
        <Button
          color="#ff8a3d"
          textColor="#ffffff"
          size="18px"
          onClick={() => alert("미리보기 화면으로 이동 예정")}
        >
          다음
        </Button>
      </FixedButtonContainer>
    </PageContainer>
  );
};

export default Posting;