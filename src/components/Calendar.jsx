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

function Calendar({ label }) {
  const [date, setDate] = useState("");

  return (
    <div className="calendar">
      {label && <StyledLabel>{label}</StyledLabel>}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "4px",
          border: "1px solid #cccccc",
          fontSize: "14px",
        }}
      />
    </div>
  );
}

export default Calendar;
