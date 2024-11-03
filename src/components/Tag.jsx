import React, { useState, useEffect } from "react";
import { 
  StyledLabel, 
  TagContainer, 
  TagButton, 
  MoreButton 
} from "../styles/TagStyles";

const Tag = ({ 
  label, 
  tags = [], 
  maxSelectable = 3, 
  selectedTags, 
  setSelectedTags 
}) => {
  const [internalSelectedTags, setInternalSelectedTags] = useState([]);
  const [showAll, setShowAll] = useState(false); 

  const effectiveSelectedTags = selectedTags ?? internalSelectedTags;
  const handleSetSelectedTags = setSelectedTags ?? setInternalSelectedTags;

  const handleTagClick = (tag) => {
    if (effectiveSelectedTags.includes(tag)) {
      handleSetSelectedTags(effectiveSelectedTags.filter((t) => t !== tag));
    } else if (effectiveSelectedTags.length < maxSelectable) {
      handleSetSelectedTags([...effectiveSelectedTags, tag]);
    }
  };

  const toggleShowAll = () => setShowAll(!showAll);

  const displayedTags = showAll ? tags : tags.slice(0, 5);

  return (
    <div>
      {label && <StyledLabel>{label}</StyledLabel>}
      <TagContainer>
        {displayedTags.map((tag, index) => (
          <TagButton
            key={index}
            selected={effectiveSelectedTags.includes(tag)}
            onClick={() => handleTagClick(tag)}
            disabled={
              !effectiveSelectedTags.includes(tag) &&
              effectiveSelectedTags.length >= maxSelectable
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