import React from "react";
import { IconCircleMinus } from "@tabler/icons-react";
import styled from "styled-components";

const WorkedBox = styled.div`
  width: 95%;
  display: flex;
  .content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .title {
      font-weight: 400;
    }
    .date {
      font-size: 14px;
      color: gray;
    }
  }
  svg {
    margin-left: auto;
  }
`;
const Worked = ({ data, onDelete }) => {
  return (
    <WorkedBox>
      <div className="content">
        <div className="title">{data.title}</div>
        <div className="date">
          {data.year} · {data.time}
        </div>
        <div className="script">{data.script}</div>
      </div>
      <IconCircleMinus size={24} color="gray" onClick={onDelete} />
    </WorkedBox>
  );
};

export default Worked;
