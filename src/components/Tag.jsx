import React, { useState } from "react";
import { 
  StyledLabel, 
  TagContainer, 
  TagButton, 
  MoreButton 
} from "../styles/TagStyles";

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