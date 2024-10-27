import React, { useState } from "react";
import styled from "styled-components";

// StyledLabel 정의
const StyledLabel = styled.label`
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;

// TagContainer 정의 (태그와 더보기 버튼을 함께 배치)
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding-right: 70px;

`;

// TagButton 정의
const TagButton = styled.button`
  background-color: ${({ selected }) => (selected ? "#000000" : "#ffffff")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#000000")};
  border: 1px solid ${({ selected }) => (selected ? "#000000" : "#cccccc")};
  border-radius: 50px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

// MoreButton 정의 (태그와 같은 줄에 배치)
const MoreButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px; /* 태그와의 간격 */
  padding: 0;

  &:hover {
    color: #333;
  }
`;

// Tag 컴포넌트 정의
const Tag = ({ label, tags = [], maxSelectable = 3 }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAll, setShowAll] = useState(false); // 더보기/접기 상태 관리

  // 태그 선택/해제 처리
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < maxSelectable) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // 더보기/접기 토글
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  // 보여줄 태그 목록 설정
  const displayedTags = showAll ? tags : tags.slice(0, 5);

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}

      <TagContainer>
        {displayedTags.map((tag, index) => (
          <TagButton
            key={index}
            selected={selectedTags.includes(tag)}
            onClick={() => handleTagClick(tag)}
            disabled={
              !selectedTags.includes(tag) &&
              selectedTags.length >= maxSelectable
            }
          >
            {tag}
          </TagButton>
        ))}

        {/* 5번째 태그 옆에 더보기/접기 버튼 */}
        {!showAll && tags.length > 5 && (
          <MoreButton onClick={toggleShowAll}>더보기 ▼</MoreButton>
        )}
        {showAll && (
          <MoreButton onClick={toggleShowAll}>접기 ▲</MoreButton>
        )}
      </TagContainer>
    </div>
  );
};

export default Tag;
