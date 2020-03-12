import React, { FunctionComponent } from "react";

interface LineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  position: "fixed" | "absolute";
}

const Line: FunctionComponent<LineProps> = ({ x1, y1, x2, y2, position }) => (
  <svg width="100%" height="100%" className="line-wrapper" style={{ position }}>
    <defs>
      <marker
        id="arrow"
        markerWidth="10"
        markerHeight="10"
        refX="8"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#c0ffe9" />
      </marker>
    </defs>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className="line"
      stroke="black"
      markerEnd="url(#arrow)"
    />
  </svg>
);

export default Line;
