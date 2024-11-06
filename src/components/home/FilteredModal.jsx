import React, { useState } from "react";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
  max-height: 80%;
  overflow-y: auto;
  position: relative;

  svg {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const TagButton = styled.button`
  background: ${({ selected }) => (selected ? "#3db8ff" : "#f0f0f0")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Button = styled.button`
  padding: 3% 5%;
  border: none;
  border-radius: 10px;
`;

const FilterModal = ({ tags, selectedTags, setSelectedTags, onClose }) => {
  const handleToggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <ModalContainer>
      <ModalContent>
        <IconX onClick={onClose} />
        <h3>하는 일 선택</h3>
        <div>
          {tags.map((tag) => (
            <TagButton
              key={tag}
              selected={selectedTags.includes(tag)}
              onClick={() => handleToggleTag(tag)}
            >
              {tag}
            </TagButton>
          ))}
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button onClick={onClose}>적용</Button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};

export default FilterModal;
