import React, { useState, useEffect } from "react";
import {
  StyledLabel,
  TagContainer,
  TagButton,
  MoreButton,
  AddTagButton,
  TagInputWrapper,
  TagInputField,
} from "../../styles/posting/TagStyles";

const Tag = ({
  label,
  tags = [], // 부모로부터 전달받은 전체 태그 목록
  selectedTags,
  setSelectedTags,
  maxSelectable = 1,
  onTagsUpdate,
}) => {
  const [internalSelectedTags, setInternalSelectedTags] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setInternalSelectedTags(Array.isArray(selectedTags) ? selectedTags : []);
  }, [selectedTags]);  

  const handleTagClick = (tag) => {
    const updatedSelectedTags = internalSelectedTags.includes(tag)
      ? internalSelectedTags.filter((t) => t !== tag)
      : [...internalSelectedTags, tag].slice(0, maxSelectable);
  
    setInternalSelectedTags(updatedSelectedTags); // 내부 상태 업데이트
    setSelectedTags(updatedSelectedTags); // 부모 상태 업데이트
  };  

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      onTagsUpdate(updatedTags); // 부모로 전체 태그 목록 업데이트
      setNewTag("");
      setIsAddingTag(false);
      // 추가된 태그를 자동 선택
      handleTagClick(newTag);
    }
  };

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}
      <TagContainer>
        {tags.slice(0, showAll ? tags.length : 5).map((tag, index) => (
          <TagButton
            key={index}
            selected={internalSelectedTags.includes(tag)}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </TagButton>
        ))}

        <div style={{ width: "100%" }}>
          {showAll && isAddingTag && (
            <TagInputWrapper>
              <TagInputField
                type="text"
                value={newTag}
                placeholder="새 태그 입력"
                onChange={(e) => setNewTag(e.target.value)}
              />
              <AddTagButton onClick={handleAddTag}>추가</AddTagButton>
            </TagInputWrapper>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
            }}
          >
            {tags.length > 5 && (
              <MoreButton onClick={toggleShowAll}>
                {showAll ? "접기 ▲" : "더보기 ▼"}
              </MoreButton>
            )}
            {showAll && !isAddingTag && (
              <AddTagButton onClick={() => setIsAddingTag(true)}>
                태그 추가하기
              </AddTagButton>
            )}
          </div>
        </div>
      </TagContainer>
    </div>
  );
};

export default Tag;
