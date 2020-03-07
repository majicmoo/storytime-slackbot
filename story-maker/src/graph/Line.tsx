import React, { FunctionComponent } from "react";

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const Line: FunctionComponent<LineProps> = ({ x1, y1, x2, y2 }) => (
  <svg width="500" height="500" className="line-wrapper">
    <line x1={x1} y1={y1} x2={x2} y2={y2} className="line" stroke="black" />
  </svg>
);

export default Line;
