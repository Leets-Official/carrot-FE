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
        <div className="title">{data.workplace}</div>
        <div className="date">
          {data.workYear} · {data.workPeriod}
        </div>
        <div className="script">{data.workType}</div>
      </div>
      <IconCircleMinus
        size={24}
        color="gray"
        onClick={() => onDelete(data.careerId)}
      />
    </WorkedBox>
  );
};

export default Worked;
