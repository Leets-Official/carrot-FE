import React, { useState } from "react";
import InputField from "../components/InputField";
import Tag from "../components/Tag";
import Toggle from "../components/Toggle";
import Calendar from "../components/Calendar";
import Button from "../components/Button";
import upmuTags from "../constants/upmuTag";
import eutTags from "../constants/eutTag";
import WeekdayPicker from "../components/WeekdayPicker"; // 요일 선택 컴포넌트 import
import "../styles/Landing.css";

function Landing() {
  const [selectedOption, setSelectedOption] = useState("업무 목적");
  const [periodOption, setPeriodOption] = useState(null);

  //업무 종류 선택 토글 핸들러
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setPeriodOption(null); // 옵션이 바뀔 때 기간 초기화
  };

  //업무 기간 선택 토글 핸들러
  const handlePeriodChange = (option) => {
    setPeriodOption(option);
  };

  return (
    <div className="landing">
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
            <Tag label="하는 일" 
            tags={upmuTags} 
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
          {/* 단기 또는 1개월 이상에 따른 조건부 렌더링 */}
          {periodOption === "단기" ? (
            <>
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
                <InputField label="사진 업로드" placeholder="사진 최대 10장" />
              </div>
              <div className="form-section">
                <InputField
                  label="자세한 설명"
                  placeholder="최대 2000자까지 작성 가능합니다."
                />
              </div>
            </>
          ) : periodOption === "1개월 이상" ? (
            <>
              <div className="form-section">
                <WeekdayPicker label="요일 선택" />
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
                <InputField label="사진 업로드" placeholder="사진 최대 10장" />
              </div>
              <div className="form-section">
                <InputField
                  label="자세한 설명"
                  placeholder="최대 2000자까지 작성 가능합니다."
                />
              </div>
            </>
          ) : null}
          <div className="form-section">
            <InputField label="업체 정보" placeholder="업체 정보를 입력하세요" />
          </div>
        </>
      ) : (
        <>
          <div className="form-section">
            <Tag label="하는 일" 
            tags={eutTags} 
            maxSelectable={3} 
            />
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
      
      <div className="form-section">
        <Button
          color="#ff8a3d"
          textColor="#ffffff"
          size="18px"
          onClick={() => alert("제출되었습니다!")}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

export default Landing;
