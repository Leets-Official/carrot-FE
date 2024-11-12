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
  tags = [],
  maxSelectable,
  selectedTags,
  setSelectedTags,
  onTagsUpdate,
}) => {
  const [internalSelectedTags, setInternalSelectedTags] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [allTags, setAllTags] = useState(tags); // 전체 태그 관리

  useEffect(() => {
    onTagsUpdate && onTagsUpdate(allTags); // 태그 변경 시 상위로 업데이트
  }, [allTags, onTagsUpdate]);

  const handleTagClick = (tag) => {
    if (internalSelectedTags.includes(tag)) {
      setInternalSelectedTags(internalSelectedTags.filter((t) => t !== tag));
      setSelectedTags(internalSelectedTags.filter((t) => t !== tag));
    } else if (internalSelectedTags.length < maxSelectable) {
      setInternalSelectedTags([...internalSelectedTags, tag]);
      setSelectedTags([...internalSelectedTags, tag]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !allTags.includes(newTag)) {
      setAllTags([...allTags, newTag]);
      setNewTag("");
      setIsAddingTag(false);
    }
  };

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}
      <TagContainer>
        {allTags.slice(0, showAll ? allTags.length : 5).map((tag, index) => (
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
            {allTags.length > 5 && (
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
