import React, { useState } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  font-family: "NanumSquareNeo", sans-serif;
`;
// 태그가 한 줄에 3개만 들어가도록 작성하고싶은데 방법을 잘 모르겠음
// 일단 padding-right 적용해서 구현
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding-right: 30px;

`;

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

const Tag = ({ label, tags = [], maxSelectable = 3 }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showAll, setShowAll] = useState(false); // 더보기/접기 상태 관리

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < maxSelectable) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

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
